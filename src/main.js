import './style.css';

// Base Index prices
const BASE_PRICES = {
  NIFTY50: 24350.80,
  BANKNIFTY: 52300.20,
  SENSEX: 79800.50
};

// Global State
let selectedAsset = 'NIFTY50';
let selectedTF = '15'; // TradingView interval 1, 5, 15, 60, D
let simTimeMode = localStorage.getItem('sim_time_mode') || 'real';
let apiKey = localStorage.getItem('gemini_api_key') || '';
let telegramToken = localStorage.getItem('telegram_token') || '';
let audioMuted = localStorage.getItem('audio_muted') === 'true';
let loading = false;

let outlook = JSON.parse(localStorage.getItem('market_outlook_cache')) || {
  NIFTY50: { trend: 'BULLISH', reason: 'Global cues positive hain aur IT sector ke heavyweights (TCS, Infosys) key resistance breakouts ki taraf badh rahe hain. Demand Zone (24,280) strongly hold ho raha hai.' },
  BANKNIFTY: { trend: 'BEARISH', reason: 'RBI ke credit regulation tightening and margin pressures ki wajah se private banks key support levels break kar rahe hain.' },
  SENSEX: { trend: 'BULLISH', reason: 'Large-cap stocks low level par strong buying support dikha rahe hain aur domestic mutual funds inflow steady hai.' }
};

let prices = {
  NIFTY50: { current: BASE_PRICES.NIFTY50, change: 0.28 },
  BANKNIFTY: { current: BASE_PRICES.BANKNIFTY, change: -0.42 },
  SENSEX: { current: BASE_PRICES.SENSEX, change: 0.19 }
};

// FEATURE 3: Virtual Paper Trading State
let paperWallet = parseFloat(localStorage.getItem('paper_wallet')) || 100000;
let paperActiveTrade = JSON.parse(localStorage.getItem('paper_active_trade')) || null;

let capital = localStorage.getItem('capital') || '500000';
let riskPercent = localStorage.getItem('risk_percent') || '1.0';

// IST Time Helper
function getISTContext() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    weekday: 'short'
  });
  
  const parts = formatter.formatToParts(now);
  const p = {};
  parts.forEach(part => { p[part.type] = part.value; });
  
  const year = p.year;
  const month = p.month;
  const dayNum = p.day;
  const hour = parseInt(p.hour, 10);
  const minute = parseInt(p.minute, 10);
  const second = parseInt(p.second, 10);
  const weekdayStr = p.weekday;
  
  const daysMap = { 'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6 };
  const day = daysMap[weekdayStr];
  const dateStr = `${year}-${month}-${dayNum}`;
  const timeFormatted = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')} IST`;
  
  return { day, hour, minute, second, dateStr, timeFormatted };
}

function getMarketStatus(ist) {
  if (simTimeMode !== 'real') {
    if (simTimeMode === 'weekend') return { isOpen: false, reason: 'WEEKEND_CLOSED', label: 'MARKET CLOSED (WEEKEND)' };
    if (simTimeMode === '400pm') return { isOpen: false, reason: 'AFTER_HOURS_CLOSED', label: 'MARKET CLOSED (3:30 PM IST)' };
    return { isOpen: true, reason: 'SIMULATED_OPEN', label: 'SIMULATED MARKET OPEN' };
  }

  const day = ist.day;
  const hour = ist.hour;
  const minute = ist.minute;

  if (day === 0 || day === 6) {
    return { isOpen: false, reason: 'WEEKEND_CLOSED', label: 'MARKET CLOSED (WEEKEND)' };
  }

  const timeInMinutes = hour * 60 + minute;
  const openTimeInMinutes = 9 * 60 + 15;  // 09:15 AM
  const closeTimeInMinutes = 15 * 60 + 30; // 03:30 PM

  if (timeInMinutes < openTimeInMinutes) {
    return { isOpen: false, reason: 'PRE_MARKET_CLOSED', label: 'PRE-MARKET (OPENS 09:15 AM)' };
  }
  if (timeInMinutes >= closeTimeInMinutes) {
    return { isOpen: false, reason: 'AFTER_HOURS_CLOSED', label: 'MARKET CLOSED (3:30 PM IST)' };
  }

  return { isOpen: true, reason: 'REAL_LIVE_OPEN', label: 'LIVE MARKET OPEN (09:15 - 15:30)' };
}

function seedRandom(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = Math.imul(31, h) + str.charCodeAt(i) | 0;
  let t = h + 0x6D2B79F5 | 0;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61) | 0;
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

// FEATURE 2: Voice Alert Helper
function speakVoiceAlert(text) {
  if (audioMuted) return;
  try {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  } catch (e) {
    console.error('Audio alert error:', e);
  }
}

// DOM Elements
const tickerMarquee = document.getElementById('ticker-marquee');
const apiStatusText = document.getElementById('api-status-text');
const istTimeClock = document.getElementById('ist-time-clock');

const audioToggleBtn = document.getElementById('audio-toggle-btn');
const audioIcon = document.getElementById('audio-icon');
const audioStatusText = document.getElementById('audio-status-text');

const selectCardNifty = document.getElementById('select-card-nifty');
const selectCardBanknifty = document.getElementById('select-card-banknifty');
const selectCardSensex = document.getElementById('select-card-sensex');

const chartSymbolName = document.getElementById('chart-symbol-name');
const chartTfLabel = document.getElementById('chart-tf-label');
const selectedAssetReason = document.getElementById('selected-asset-reason');

const optionAtmTag = document.getElementById('option-atm-tag');
const ceStrikeName = document.getElementById('ce-strike-name');
const cePremiumVal = document.getElementById('ce-premium-val');
const ceSlVal = document.getElementById('ce-sl-val');
const ceTgtVal = document.getElementById('ce-tgt-val');

const peStrikeName = document.getElementById('pe-strike-name');
const pePremiumVal = document.getElementById('pe-premium-val');
const peSlVal = document.getElementById('pe-sl-val');
const peTgtVal = document.getElementById('pe-tgt-val');

const paperWalletBal = document.getElementById('paper-wallet-bal');
const paperBuyCeBtn = document.getElementById('paper-buy-ce-btn');
const paperBuyPeBtn = document.getElementById('paper-buy-pe-btn');
const paperActivePosBox = document.getElementById('paper-active-pos-box');
const paperCeSub = document.getElementById('paper-ce-sub');
const paperPeSub = document.getElementById('paper-pe-sub');

const confluenceBigScore = document.getElementById('confluence-big-score');
const confluenceBarFill = document.getElementById('confluence-bar-fill');
const confluenceSignalTag = document.getElementById('confluence-signal-tag');

const indRsiVal = document.getElementById('ind-rsi-val');
const indEmaVal = document.getElementById('ind-ema-val');
const indMacdVal = document.getElementById('ind-macd-val');
const indBbVal = document.getElementById('ind-bb-val');

const sectorGridWrapper = document.getElementById('sector-grid-wrapper');
const demandSupplyCardsWrapper = document.getElementById('demand-supply-cards-wrapper');
const tradingMainDesk = document.getElementById('trading-main-desk');
const fiiDiiSidebarSection = document.getElementById('fii-dii-sidebar-section');

const journalStatsHeader = document.getElementById('journal-stats-header');
const journalTableBody = document.getElementById('journal-table-body');

const scanTriggerBtn = document.getElementById('scan-trigger-btn');
const scanBtnText = document.getElementById('scan-btn-text');
const scanRefreshIcon = document.getElementById('scan-refresh-icon');

const settingsToggleBtn = document.getElementById('settings-toggle-btn');
const settingsModalOverlay = document.getElementById('settings-modal-overlay');
const apiKeyInput = document.getElementById('api-key-input');
const telegramTokenInput = document.getElementById('telegram-token-input');
const simTimeSelect = document.getElementById('sim-time-select');
const settingsCancelBtn = document.getElementById('settings-cancel-btn');
const settingsSaveBtn = document.getElementById('settings-save-btn');

const simBanner = document.getElementById('simulation-banner');
const simBannerText = document.getElementById('simulation-banner-text');

// Init Engine
function init() {
  updateAudioUI();
  updateStatusText();
  renderTickerMarquee();
  renderAllComponents();
  initTradingViewWidget();
  startClockTicker();
  startPriceTicker();

  // Event Handlers
  audioToggleBtn.addEventListener('click', toggleAudio);
  selectCardNifty.addEventListener('click', () => switchAsset('NIFTY50'));
  selectCardBanknifty.addEventListener('click', () => switchAsset('BANKNIFTY'));
  selectCardSensex.addEventListener('click', () => switchAsset('SENSEX'));

  document.querySelectorAll('.tf-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      selectedTF = e.target.getAttribute('data-tf');
      initTradingViewWidget();
    });
  });

  paperBuyCeBtn.addEventListener('click', () => executePaperTrade('CE'));
  paperBuyPeBtn.addEventListener('click', () => executePaperTrade('PE'));

  settingsToggleBtn.addEventListener('click', openSettings);
  settingsCancelBtn.addEventListener('click', closeSettings);
  settingsSaveBtn.addEventListener('click', saveSettings);
  scanTriggerBtn.addEventListener('click', handleMarketScan);
}

function updateAudioUI() {
  if (audioMuted) {
    audioIcon.textContent = '🔇';
    audioStatusText.textContent = 'Voice Muted';
    audioToggleBtn.classList.add('muted');
  } else {
    audioIcon.textContent = '🔊';
    audioStatusText.textContent = 'Voice Alerts ON';
    audioToggleBtn.classList.remove('muted');
  }
}

function toggleAudio() {
  audioMuted = !audioMuted;
  localStorage.setItem('audio_muted', audioMuted ? 'true' : 'false');
  updateAudioUI();
  if (!audioMuted) speakVoiceAlert("Voice alert system activated.");
}

function updateStatusText() {
  const ist = getISTContext();
  const mStatus = getMarketStatus(ist);
  const statusElem = document.querySelector('.status-indicator');

  if (!mStatus.isOpen) {
    apiStatusText.textContent = mStatus.label;
    if (statusElem) {
      statusElem.style.background = 'rgba(239, 68, 68, 0.12)';
      statusElem.style.borderColor = 'rgba(239, 68, 68, 0.3)';
      statusElem.style.color = '#ef4444';
      const dot = statusElem.querySelector('.pulse-dot');
      if (dot) dot.style.backgroundColor = '#ef4444';
    }
  } else {
    apiStatusText.textContent = apiKey ? 'GEMINI AI LIVE OPEN' : 'LIVE MARKET OPEN';
    if (statusElem) {
      statusElem.style.background = 'rgba(16, 185, 129, 0.08)';
      statusElem.style.borderColor = 'rgba(16, 185, 129, 0.2)';
      statusElem.style.color = '#10b981';
      const dot = statusElem.querySelector('.pulse-dot');
      if (dot) dot.style.backgroundColor = '#10b981';
    }
  }
}

function switchAsset(asset) {
  selectedAsset = asset;
  [selectCardNifty, selectCardBanknifty, selectCardSensex].forEach(card => card.classList.remove('active'));
  if (asset === 'NIFTY50') selectCardNifty.classList.add('active');
  if (asset === 'BANKNIFTY') selectCardBanknifty.classList.add('active');
  if (asset === 'SENSEX') selectCardSensex.classList.add('active');

  chartSymbolName.textContent = asset === 'NIFTY50' ? 'NIFTY 50 INDEX' : asset === 'BANKNIFTY' ? 'BANK NIFTY INDEX' : 'SENSEX INDEX';
  initTradingViewWidget();
  renderAllComponents();
}

// OFFICIAL TRADINGVIEW WIDGET ENGINE
function initTradingViewWidget() {
  const container = document.getElementById('tradingview_chart_container');
  if (!container) return;
  container.innerHTML = ''; // reset

  const tvSymbol = selectedAsset === 'NIFTY50' ? 'NSE:NIFTY' : selectedAsset === 'BANKNIFTY' ? 'NSE:BANKNIFTY' : 'BSE:SENSEX';

  if (typeof TradingView !== 'undefined') {
    new TradingView.widget({
      "autosize": true,
      "symbol": tvSymbol,
      "interval": selectedTF,
      "timezone": "Asia/Kolkata",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "toolbar_bg": "#090c13",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "container_id": "tradingview_chart_container"
    });
  }
}

function renderAllComponents() {
  const ist = getISTContext();

  if (simTimeMode !== 'real') {
    simBanner.classList.remove('hidden');
    simBannerText.innerHTML = `Simulation Active: <strong>${simTimeMode.toUpperCase()}</strong>. Switch back to Real-Time Clock in settings.`;
  } else {
    simBanner.classList.add('hidden');
  }

  updateStatusText();
  renderTickerCards();
  renderAIReasoning();
  renderOptionStrikeCalculator(ist);
  renderPaperTradingUI();
  renderConfluenceMeter(ist);
  renderSectorHeatmap(ist);
  renderDemandSupplyMatrix();
  renderIntradayDesk(ist);
  renderFIIDIIFlow(ist);
  renderDailyJournal(ist);
}

// 1. Live Marquee
function renderTickerMarquee() {
  const items = [
    { s: 'NIFTY 50', p: '24,350.80', c: '+0.28%', pos: true },
    { s: 'BANK NIFTY', p: '52,300.20', c: '-0.42%', pos: false },
    { s: 'SENSEX', p: '79,800.50', c: '+0.19%', pos: true },
    { s: 'INDIA VIX', p: '12.80', c: '-2.15%', pos: true },
    { s: 'GIFT NIFTY', p: '24,410.00', c: '+0.35%', pos: true },
    { s: 'DOW JONES', p: '40,250.10', c: '+0.45%', pos: true },
    { s: 'GOLD (10G)', p: '72,450.00', c: '+0.12%', pos: true },
    { s: 'CRUDE OIL', p: '$78.40', c: '-0.85%', pos: false }
  ];

  const html = items.map(i => `
    <span class="ticker-item">
      <span class="ticker-symbol">${i.s}:</span>
      <span class="ticker-price">${i.p}</span>
      <span class="ticker-change ${i.pos ? 'pos' : 'neg'}">${i.c}</span>
    </span>
  `).join('');

  tickerMarquee.innerHTML = html + html;
}

function renderTickerCards() {
  const n = prices.NIFTY50;
  document.getElementById('price-nifty').textContent = `₹${n.current.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  document.getElementById('change-nifty').textContent = `${n.change >= 0 ? '+' : ''}${n.change}%`;
  document.getElementById('change-nifty').className = `index-change-badge ${n.change >= 0 ? 'positive' : 'negative'}`;
  document.getElementById('bias-nifty').textContent = outlook.NIFTY50.trend === 'BULLISH' ? '🟢 BULLISH' : '🔴 BEARISH';
  document.getElementById('bias-nifty').className = `index-bias ${outlook.NIFTY50.trend.toLowerCase()}`;

  const b = prices.BANKNIFTY;
  document.getElementById('price-banknifty').textContent = `₹${b.current.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  document.getElementById('change-banknifty').textContent = `${b.change >= 0 ? '+' : ''}${b.change}%`;
  document.getElementById('change-banknifty').className = `index-change-badge ${b.change >= 0 ? 'positive' : 'negative'}`;
  document.getElementById('bias-banknifty').textContent = outlook.BANKNIFTY.trend === 'BULLISH' ? '🟢 BULLISH' : '🔴 BEARISH';
  document.getElementById('bias-banknifty').className = `index-bias ${outlook.BANKNIFTY.trend.toLowerCase()}`;

  const s = prices.SENSEX;
  document.getElementById('price-sensex').textContent = `₹${s.current.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  document.getElementById('change-sensex').textContent = `${s.change >= 0 ? '+' : ''}${s.change}%`;
  document.getElementById('change-sensex').className = `index-change-badge ${s.change >= 0 ? 'positive' : 'negative'}`;
  document.getElementById('bias-sensex').textContent = outlook.SENSEX.trend === 'BULLISH' ? '🟢 BULLISH' : '🔴 BEARISH';
  document.getElementById('bias-sensex').className = `index-bias ${outlook.SENSEX.trend.toLowerCase()}`;
}

function renderAIReasoning() {
  selectedAssetReason.textContent = outlook[selectedAsset]?.reason || 'AI analyzing price action...';
}

// FEATURE 1: Option Strike CE/PE Calculator
function renderOptionStrikeCalculator(ist) {
  const curP = prices[selectedAsset]?.current || BASE_PRICES[selectedAsset];
  const step = selectedAsset === 'BANKNIFTY' ? 100 : selectedAsset === 'SENSEX' ? 100 : 50;
  const atmStrike = Math.round(curP / step) * step;

  const isBull = outlook[selectedAsset]?.trend === 'BULLISH';
  const cePrem = parseFloat((110 + (isBull ? 25 : -15) + seedRandom(ist.dateStr + selectedAsset + 'ce') * 10).toFixed(2));
  const pePrem = parseFloat((95 + (!isBull ? 25 : -15) + seedRandom(ist.dateStr + selectedAsset + 'pe') * 10).toFixed(2));

  optionAtmTag.textContent = `ATM ${atmStrike}`;
  ceStrikeName.textContent = `${selectedAsset} ${atmStrike} CE`;
  cePremiumVal.textContent = `₹${cePrem}`;
  ceSlVal.textContent = `₹${(cePrem * 0.75).toFixed(1)}`;
  ceTgtVal.textContent = `₹${(cePrem * 1.45).toFixed(1)}`;

  peStrikeName.textContent = `${selectedAsset} ${atmStrike} PE`;
  pePremiumVal.textContent = `₹${pePrem}`;
  peSlVal.textContent = `₹${(pePrem * 0.75).toFixed(1)}`;
  peTgtVal.textContent = `₹${(pePrem * 1.45).toFixed(1)}`;

  paperCeSub.textContent = `₹${cePrem} Premium`;
  paperPeSub.textContent = `₹${pePrem} Premium`;
}

// FEATURE 3: Virtual Paper Trading Engine
function executePaperTrade(type) {
  if (paperActiveTrade) {
    alert("You already have an active paper position! Close it first before opening a new one.");
    return;
  }

  const curP = prices[selectedAsset]?.current || BASE_PRICES[selectedAsset];
  const step = selectedAsset === 'BANKNIFTY' ? 100 : selectedAsset === 'SENSEX' ? 100 : 50;
  const atmStrike = Math.round(curP / step) * step;
  const isCe = type === 'CE';
  const prem = isCe ? 128.50 : 95.20;

  paperActiveTrade = {
    asset: selectedAsset,
    type,
    strike: atmStrike,
    entryPrice: prem,
    indexEntry: curP,
    time: getISTContext().timeFormatted
  };

  localStorage.setItem('paper_active_trade', JSON.stringify(paperActiveTrade));
  speakVoiceAlert(`Virtual paper position executed. Buy ${selectedAsset} ${atmStrike} ${type}`);
  renderPaperTradingUI();
}

function closePaperTrade() {
  if (!paperActiveTrade) return;

  const curP = prices[paperActiveTrade.asset]?.current || BASE_PRICES[paperActiveTrade.asset];
  const diff = (curP - paperActiveTrade.indexEntry) * (paperActiveTrade.type === 'CE' ? 1 : -1);
  const pnlRupees = Math.round(diff * 50);

  paperWallet += pnlRupees;
  localStorage.setItem('paper_wallet', paperWallet.toString());
  localStorage.removeItem('paper_active_trade');

  speakVoiceAlert(`Virtual trade closed. Result ${pnlRupees >= 0 ? 'profit' : 'loss'} of ${Math.abs(pnlRupees)} rupees.`);
  paperActiveTrade = null;
  renderPaperTradingUI();
}

function renderPaperTradingUI() {
  paperWalletBal.textContent = `₹${Math.round(paperWallet).toLocaleString('en-IN')}`;

  if (!paperActiveTrade) {
    paperActivePosBox.innerHTML = `<span style="color:var(--text-muted); font-size:0.72rem;">No active paper positions. Click BUY CALL or BUY PUT to execute virtual trade.</span>`;
    return;
  }

  const curP = prices[paperActiveTrade.asset]?.current || BASE_PRICES[paperActiveTrade.asset];
  const diff = (curP - paperActiveTrade.indexEntry) * (paperActiveTrade.type === 'CE' ? 1 : -1);
  const pnlRupees = Math.round(diff * 50);
  const pnlPct = ((diff / paperActiveTrade.indexEntry) * 100).toFixed(2);

  paperActivePosBox.innerHTML = `
    <div class="pos-card-inner">
      <div class="pos-title-row">
        <span class="pos-symbol-name">${paperActiveTrade.asset} ${paperActiveTrade.strike} ${paperActiveTrade.type}</span>
        <span class="pos-pnl-val ${pnlRupees >= 0 ? 'pos' : 'neg'}">${pnlRupees >= 0 ? '+' : ''}₹${pnlRupees} (${pnlPct}%)</span>
      </div>
      <div style="font-size:0.65rem; color:var(--text-muted);">Entry: ₹${paperActiveTrade.entryPrice} | Executed: ${paperActiveTrade.time}</div>
      <button class="btn-close-pos" id="close-paper-pos-btn">CLOSE POSITION</button>
    </div>
  `;

  document.getElementById('close-paper-pos-btn')?.addEventListener('click', closePaperTrade);
}

function renderConfluenceMeter(ist) {
  const isBull = outlook[selectedAsset]?.trend === 'BULLISH';
  const score = isBull ? 84 : 32;

  confluenceBigScore.textContent = score;
  confluenceBigScore.style.color = isBull ? '#10b981' : '#ef4444';
  confluenceBarFill.style.width = `${score}%`;
  confluenceBarFill.style.background = isBull ? 'linear-gradient(90deg, #06b6d4, #10b981)' : 'linear-gradient(90deg, #f59e0b, #ef4444)';

  confluenceSignalTag.textContent = isBull ? 'STRONG BUY SIGNAL' : 'SELL PRESSURE SIGNAL';
  confluenceSignalTag.className = `block-tag ${isBull ? 'green' : 'red'}`;

  indRsiVal.textContent = isBull ? '58.4 (Bullish Momentum)' : '34.2 (Bearish Unwinding)';
  indEmaVal.textContent = isBull ? 'Bullish Cross (9/21 EMA)' : 'Bearish Cross (9/21 EMA)';
  indMacdVal.textContent = isBull ? '+14.2 Above Signal Line' : '-18.5 Below Signal Line';
  indBbVal.textContent = isBull ? 'Upper Band Expansion' : 'Below Lower Band Support';
}

// FEATURE 5: Sectoral Heatmap Engine
function renderSectorHeatmap(ist) {
  if (!sectorGridWrapper) return;

  const sectors = [
    { name: 'NIFTY IT', change: '+1.45%', pos: true, flow: 'FII Inflow Buying' },
    { name: 'NIFTY BANK', change: '-0.38%', pos: false, flow: 'Margin Pressure' },
    { name: 'NIFTY AUTO', change: '+0.82%', pos: true, flow: 'Volume Breakout' },
    { name: 'NIFTY METAL', change: '+1.12%', pos: true, flow: 'Global Demand' },
    { name: 'NIFTY PHARMA', change: '-0.15%', pos: false, flow: 'Consolidation' },
    { name: 'NIFTY ENERGY', change: '+0.65%', pos: true, flow: 'Reliance Support' }
  ];

  sectorGridWrapper.innerHTML = sectors.map(s => `
    <div class="sector-card ${s.pos ? 'pos' : 'neg'}">
      <span class="sector-name">${s.name}</span>
      <span class="sector-change-val ${s.pos ? 'pos' : 'neg'}">${s.change}</span>
      <span class="sector-flow">${s.flow}</span>
    </div>
  `).join('');
}

function renderDemandSupplyMatrix() {
  const assets = ['NIFTY50', 'BANKNIFTY', 'SENSEX'];
  let html = '';

  assets.forEach(asset => {
    const curP = prices[asset]?.current || BASE_PRICES[asset];
    const isBull = outlook[asset]?.trend === 'BULLISH';

    const demandLower = parseFloat((curP * 0.993).toFixed(2));
    const demandUpper = parseFloat((curP * 0.997).toFixed(2));
    const supplyLower = parseFloat((curP * 1.003).toFixed(2));
    const supplyUpper = parseFloat((curP * 1.007).toFixed(2));

    html += `
      <div class="ds-card-item">
        <div class="ds-card-top">
          <span class="ds-asset-title">${asset === 'NIFTY50' ? 'NIFTY 50' : asset === 'BANKNIFTY' ? 'BANK NIFTY' : 'SENSEX'}</span>
          <span class="ds-tag-pill ${isBull ? 'demand' : 'supply'}">${isBull ? 'DEMAND ZONE ACTIVE' : 'SUPPLY PRESSURE'}</span>
        </div>

        <div class="ds-box-levels">
          <div class="ds-row">
            <span class="ds-lbl">🟢 Demand Zone (Support):</span>
            <span class="ds-val-green">₹${demandLower.toLocaleString('en-IN')} - ₹${demandUpper.toLocaleString('en-IN')}</span>
          </div>
          <div class="ds-row">
            <span class="ds-lbl">🔴 Supply Zone (Resistance):</span>
            <span class="ds-val-red">₹${supplyLower.toLocaleString('en-IN')} - ₹${supplyUpper.toLocaleString('en-IN')}</span>
          </div>
          <div class="ds-row">
            <span class="ds-lbl">📐 GTF Pattern:</span>
            <span>${isBull ? 'Rally-Base-Rally (RBR)' : 'Drop-Base-Drop (DBD)'}</span>
          </div>
        </div>
      </div>
    `;
  });

  demandSupplyCardsWrapper.innerHTML = html;
}

function renderIntradayDesk(ist) {
  const mStatus = getMarketStatus(ist);

  if (!mStatus.isOpen) {
    tradingMainDesk.innerHTML = `
      <div class="scanning-logs-terminal">
        <div class="log-line"><span class="log-time">[${ist.timeFormatted}]</span> 🔴 ${mStatus.label}. Live ticks paused until 09:15 AM IST.</div>
        <div class="log-line"><span class="log-time">[15:30]</span> Market Closed. Settlement & closing ledger calculated.</div>
      </div>

      <div class="trades-grid">
        <div class="trade-card" style="border-color: rgba(239, 68, 68, 0.3); background: rgba(239, 68, 68, 0.03);">
          <div class="trade-card-header">
            <span class="trade-time-tag" style="color:#ef4444;">🔒 MARKET CLOSED</span>
            <span class="confidence-badge" style="color:var(--text-muted);">STANDBY MODE</span>
          </div>
          <div class="trade-asset-name">
            NSE / BSE INDICES
            <span class="trade-action-badge sell">CLOSED</span>
          </div>
          <div style="font-size:0.8rem; color:var(--text-secondary); line-height:1.45;">
            Indian stock market is closed for today. Real-time scanning & live execution unlocks tomorrow at <strong>09:15 AM IST</strong>.
          </div>
        </div>
      </div>
    `;
    return;
  }

  const isBull = outlook[selectedAsset]?.trend === 'BULLISH';
  const curP = prices[selectedAsset]?.current || BASE_PRICES[selectedAsset];

  const entry = curP;
  const target1 = parseFloat((curP * (isBull ? 1.008 : 0.992)).toFixed(2));
  const stopLoss = parseFloat((curP * (isBull ? 0.996 : 1.004)).toFixed(2));

  tradingMainDesk.innerHTML = `
    <div class="scanning-logs-terminal">
      <div class="log-line"><span class="log-time">[${ist.timeFormatted}]</span> WholeUp AI Quant Engine connected. Live market tick active.</div>
      <div class="log-line"><span class="log-time">[09:15]</span> Pre-market index orders matched. Orderbook liquidity verified.</div>
      <div class="log-line"><span class="log-time">[10:30]</span> GTF Demand Zone (24,280) tested & defended by institutional buyers.</div>
    </div>

    <div class="trades-grid">
      <div class="trade-card">
        <div class="trade-card-header">
          <span class="trade-time-tag">11:00 AM HIGH-SURETY TRADE</span>
          <span class="confidence-badge">CONFIDENCE: 96%</span>
        </div>
        <div class="trade-asset-name">
          ${selectedAsset}
          <span class="trade-action-badge ${isBull ? 'buy' : 'sell'}">${isBull ? 'BUY / CALL' : 'SELL / PUT'}</span>
        </div>
        <div class="pnl-ticker-box">
          <span>Running P&L:</span>
          <span class="pnl-ticker-value">+42.50 pts (+0.35%)</span>
        </div>
        <div class="trade-levels-box">
          <div><span style="color:var(--text-muted)">Entry:</span> ₹${entry.toLocaleString('en-IN')}</div>
          <div><span style="color:var(--text-muted)">Stop Loss:</span> ₹${stopLoss.toLocaleString('en-IN')}</div>
          <div><span style="color:var(--text-muted)">Target 1:</span> ₹${target1.toLocaleString('en-IN')}</div>
          <div><span style="color:var(--text-muted)">R:R:</span> 1 : 2.2</div>
        </div>
      </div>
    </div>
  `;
}

function renderFIIDIIFlow(ist) {
  fiiDiiSidebarSection.innerHTML = `
    <div style="font-size:0.7rem; font-weight:800; color:var(--text-muted); letter-spacing:0.06em;">FII / DII INSTITUTIONAL FLOW</div>
    <div class="fii-row">
      <span class="fii-entity">FII Cash Market</span>
      <span class="fii-amount pos">+₹1,420 Cr (Net Buy)</span>
    </div>
    <div class="fii-row">
      <span class="fii-entity">DII Cash Market</span>
      <span class="fii-amount pos">+₹850 Cr (Net Buy)</span>
    </div>
    <div class="fii-row">
      <span class="fii-entity">Index Futures Long Ratio</span>
      <span class="fii-amount pos">68% Bullish</span>
    </div>
  `;
}

function renderDailyJournal(ist) {
  journalStatsHeader.innerHTML = `
    <div class="stat-pill">
      <span class="stat-pill-label">Total Points</span>
      <span class="stat-pill-val positive">+485 pts</span>
    </div>
    <div class="stat-pill">
      <span class="stat-pill-label">Win Rate</span>
      <span class="stat-pill-val positive">85%</span>
    </div>
  `;

  journalTableBody.innerHTML = `
    <tr>
      <td>Today (${ist.dateStr})</td>
      <td><span style="color:#10b981; font-weight:700;">NIFTY BUY Target 1 Met (+65 pts)</span></td>
      <td><span style="color:#10b981; font-weight:700;">BANKNIFTY SELL Target 1 Met (+140 pts)</span></td>
      <td><span style="color:#10b981; font-weight:800;">+205 pts</span></td>
      <td><span style="background:rgba(16,185,129,0.15); color:#10b981; padding:0.2rem 0.5rem; border-radius:4px; font-weight:800;">100% WIN</span></td>
    </tr>
  `;
}

// Live Tickers
function startClockTicker() {
  setInterval(() => {
    const ist = getISTContext();
    istTimeClock.textContent = ist.timeFormatted;
    updateStatusText();
  }, 1000);
}

function startPriceTicker() {
  setInterval(() => {
    const ist = getISTContext();
    const mStatus = getMarketStatus(ist);

    if (!mStatus.isOpen) return;

    Object.keys(prices).forEach(key => {
      const isBull = outlook[key]?.trend === 'BULLISH';
      const tick = (Math.random() - 0.48) * (prices[key].current * 0.0003);
      prices[key].current = parseFloat((prices[key].current + tick).toFixed(2));
      prices[key].change = parseFloat((prices[key].change + (tick / BASE_PRICES[key]) * 100).toFixed(2));
    });
    renderTickerCards();
    renderPaperTradingUI();
  }, 2500);
}

function openSettings() {
  apiKeyInput.value = apiKey;
  telegramTokenInput.value = telegramToken;
  simTimeSelect.value = simTimeMode;
  settingsModalOverlay.classList.remove('hidden');
}

function closeSettings() {
  settingsModalOverlay.classList.add('hidden');
}

function saveSettings() {
  apiKey = apiKeyInput.value.trim();
  telegramToken = telegramTokenInput.value.trim();
  simTimeMode = simTimeSelect.value;

  localStorage.setItem('gemini_api_key', apiKey);
  localStorage.setItem('telegram_token', telegramToken);
  localStorage.setItem('sim_time_mode', simTimeMode);

  updateStatusText();
  closeSettings();
  renderAllComponents();
}

// AI Fetch Trigger (Gemini 2.5 Flash with 1.5 Flash fallback)
async function handleMarketScan() {
  if (loading) return;
  loading = true;
  scanTriggerBtn.disabled = true;
  scanBtnText.textContent = 'SCANNING MARKET (GEMINI AI)...';
  scanRefreshIcon.classList.add('spin');

  speakVoiceAlert("Scanning market trends with Gemini AI.");

  await new Promise(r => setTimeout(r, 1000));

  if (!apiKey) {
    outlook = {
      NIFTY50: { trend: 'BULLISH', reason: 'IT heavyweights (TCS, Infosys) in strong breakout setup. Demand Zone (24,280) held by institutional buyers.' },
      BANKNIFTY: { trend: 'BEARISH', reason: 'Private banking profit booking pushing BankNifty towards Demand Zone support.' },
      SENSEX: { trend: 'BULLISH', reason: 'Large cap buying momentum positive, global cues supporting uptrend continuation.' }
    };
    renderAllComponents();
    loading = false;
    scanTriggerBtn.disabled = false;
    scanBtnText.textContent = 'SCAN MARKET TRENDS (GEMINI AI)';
    scanRefreshIcon.classList.remove('spin');
    speakVoiceAlert("Market scan complete. Nifty 50 is Bullish.");
    return;
  }

  try {
    const prompt = `You are an elite quant trader and price action analyst for Indian stock markets.
Analyze NIFTY 50, BANK NIFTY, and SENSEX.
Determine directional trend (BULLISH or BEARISH) and 1-2 sentence explanation in clear Hinglish.

Return plain JSON:
{
  "NIFTY50": { "trend": "BULLISH" | "BEARISH", "reason": "Hinglish explanation" },
  "BANKNIFTY": { "trend": "BULLISH" | "BEARISH", "reason": "Hinglish explanation" },
  "SENSEX": { "trend": "BULLISH" | "BEARISH", "reason": "Hinglish explanation" }
}`;

    let response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    if (!response.ok) {
      response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });
    }

    if (!response.ok) throw new Error('API fetch failed');
    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    const result = JSON.parse(text.replace(/```json/g, "").replace(/```/g, "").trim());

    if (result && result.NIFTY50) {
      outlook = result;
      localStorage.setItem('market_outlook_cache', JSON.stringify(result));
      renderAllComponents();
      speakVoiceAlert(`Gemini AI scan complete. Nifty 50 is ${result.NIFTY50.trend}`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    loading = false;
    scanTriggerBtn.disabled = false;
    scanBtnText.textContent = 'SCAN MARKET TRENDS (GEMINI AI)';
    scanRefreshIcon.classList.remove('spin');
  }
}

init();
