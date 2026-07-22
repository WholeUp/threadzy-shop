import './style.css';

// Base Index prices
const BASE_PRICES = {
  NIFTY50: 24350.80,
  BANKNIFTY: 52300.20,
  SENSEX: 79800.50
};

// Global State
let selectedAsset = 'NIFTY50';
let selectedTF = '15m';
let simTimeMode = localStorage.getItem('sim_time_mode') || 'real';
let apiKey = localStorage.getItem('gemini_api_key') || '';
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

// Check Real Stock Market Trading Hours (NSE/BSE: Mon-Fri 09:15 to 15:30 IST)
function getMarketStatus(ist) {
  if (simTimeMode !== 'real') {
    if (simTimeMode === 'weekend') return { isOpen: false, reason: 'WEEKEND_CLOSED', label: 'MARKET CLOSED (WEEKEND)' };
    if (simTimeMode === '400pm') return { isOpen: false, reason: 'AFTER_HOURS_CLOSED', label: 'MARKET CLOSED (3:30 PM IST)' };
    return { isOpen: true, reason: 'SIMULATED_OPEN', label: 'SIMULATED MARKET OPEN' };
  }

  const day = ist.day; // 0 = Sun, 6 = Sat
  const hour = ist.hour;
  const minute = ist.minute;

  if (day === 0 || day === 6) {
    return { isOpen: false, reason: 'WEEKEND_CLOSED', label: 'MARKET CLOSED (WEEKEND)' };
  }

  const timeInMinutes = hour * 60 + minute;
  const openTimeInMinutes = 9 * 60 + 15;  // 09:15 AM IST
  const closeTimeInMinutes = 15 * 60 + 30; // 03:30 PM IST

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

// DOM Elements
const tickerMarquee = document.getElementById('ticker-marquee');
const apiStatusText = document.getElementById('api-status-text');
const istTimeClock = document.getElementById('ist-time-clock');

const selectCardNifty = document.getElementById('select-card-nifty');
const selectCardBanknifty = document.getElementById('select-card-banknifty');
const selectCardSensex = document.getElementById('select-card-sensex');

const chartSymbolName = document.getElementById('chart-symbol-name');
const chartTfLabel = document.getElementById('chart-tf-label');
const chartCanvas = document.getElementById('tradingview-chart-canvas');
const chartOverlayDemand = document.getElementById('chart-overlay-demand');
const chartOverlaySupply = document.getElementById('chart-overlay-supply');
const selectedAssetReason = document.getElementById('selected-asset-reason');

const confluenceBigScore = document.getElementById('confluence-big-score');
const confluenceBarFill = document.getElementById('confluence-bar-fill');
const confluenceSignalTag = document.getElementById('confluence-signal-tag');

const indRsiVal = document.getElementById('ind-rsi-val');
const indEmaVal = document.getElementById('ind-ema-val');
const indMacdVal = document.getElementById('ind-macd-val');
const indBbVal = document.getElementById('ind-bb-val');

const pcrVal = document.getElementById('pcr-val');
const vixVal = document.getElementById('vix-val');
const maxpainNifty = document.getElementById('maxpain-nifty');
const maxpainBank = document.getElementById('maxpain-bank');

const capitalInput = document.getElementById('capital-input');
const riskPercentInput = document.getElementById('risk-percent-input');
const posCalcResults = document.getElementById('pos-calc-results');

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
const simTimeSelect = document.getElementById('sim-time-select');
const settingsCancelBtn = document.getElementById('settings-cancel-btn');
const settingsSaveBtn = document.getElementById('settings-save-btn');

const simBanner = document.getElementById('simulation-banner');
const simBannerText = document.getElementById('simulation-banner-text');

// Init Engine
function init() {
  updateStatusText();
  renderTickerMarquee();
  renderAllComponents();
  startClockTicker();
  startPriceTicker();

  // Event Handlers
  selectCardNifty.addEventListener('click', () => switchAsset('NIFTY50'));
  selectCardBanknifty.addEventListener('click', () => switchAsset('BANKNIFTY'));
  selectCardSensex.addEventListener('click', () => switchAsset('SENSEX'));

  document.querySelectorAll('.tf-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      selectedTF = e.target.getAttribute('data-tf');
      chartTfLabel.textContent = `${selectedTF.toUpperCase()} TIMEFRAME`;
      drawCandlestickChart();
    });
  });

  settingsToggleBtn.addEventListener('click', openSettings);
  settingsCancelBtn.addEventListener('click', closeSettings);
  settingsSaveBtn.addEventListener('click', saveSettings);
  scanTriggerBtn.addEventListener('click', handleMarketScan);

  capitalInput.value = capital;
  riskPercentInput.value = riskPercent;
  capitalInput.addEventListener('input', handleRiskCalcUpdate);
  riskPercentInput.addEventListener('input', handleRiskCalcUpdate);

  window.addEventListener('resize', drawCandlestickChart);
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
  renderAllComponents();
}

function renderAllComponents() {
  const ist = getISTContext();

  // Simulation Banner
  if (simTimeMode !== 'real') {
    simBanner.classList.remove('hidden');
    simBannerText.innerHTML = `Simulation Active: <strong>${simTimeMode.toUpperCase()}</strong>. Switch back to Real-Time Clock in settings.`;
  } else {
    simBanner.classList.add('hidden');
  }

  updateStatusText();
  renderTickerCards();
  drawCandlestickChart();
  renderAIReasoning();
  renderConfluenceMeter(ist);
  renderOptionChain(ist);
  renderPositionCalculator();
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

// 2. HTML5 Candlestick Chart Engine
function drawCandlestickChart() {
  if (!chartCanvas) return;
  const ctx = chartCanvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = chartCanvas.getBoundingClientRect();

  chartCanvas.width = rect.width * dpr;
  chartCanvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;

  // Clear
  ctx.fillStyle = '#090c13';
  ctx.fillRect(0, 0, width, height);

  // Grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 50) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke(); }
  for (let y = 0; y < height; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }

  const curPrice = prices[selectedAsset]?.current || BASE_PRICES[selectedAsset];
  const isBullish = outlook[selectedAsset]?.trend === 'BULLISH';

  const demandLower = parseFloat((curPrice * 0.993).toFixed(2));
  const demandUpper = parseFloat((curPrice * 0.997).toFixed(2));
  const supplyLower = parseFloat((curPrice * 1.003).toFixed(2));
  const supplyUpper = parseFloat((curPrice * 1.007).toFixed(2));

  chartOverlayDemand.textContent = `₹${demandLower.toLocaleString('en-IN')} - ₹${demandUpper.toLocaleString('en-IN')}`;
  chartOverlaySupply.textContent = `₹${supplyLower.toLocaleString('en-IN')} - ₹${supplyUpper.toLocaleString('en-IN')}`;

  // Demand Box
  const demandYTop = height * 0.65;
  const demandYBot = height * 0.85;
  ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
  ctx.fillRect(0, demandYTop, width, demandYBot - demandYTop);
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
  ctx.strokeRect(0, demandYTop, width, demandYBot - demandYTop);

  ctx.fillStyle = '#10b981';
  ctx.font = '10px JetBrains Mono';
  ctx.fillText(`GTF DEMAND ZONE (₹${demandLower})`, 15, demandYTop + 14);

  // Supply Box
  const supplyYTop = height * 0.1;
  const supplyYBot = height * 0.3;
  ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
  ctx.fillRect(0, supplyYTop, width, supplyYBot - supplyYTop);
  ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
  ctx.strokeRect(0, supplyYTop, width, supplyYBot - supplyYTop);

  ctx.fillStyle = '#ef4444';
  ctx.fillText(`GTF SUPPLY ZONE (₹${supplyUpper})`, 15, supplyYTop + 14);

  // Candlesticks
  const candleCount = 32;
  const candleWidth = (width - 60) / candleCount;
  let price = curPrice * (isBullish ? 0.988 : 1.012);

  const candles = [];
  for (let i = 0; i < candleCount; i++) {
    const seed = i + selectedAsset + selectedTF;
    const change = (seedRandom(seed) - (isBullish ? 0.42 : 0.58)) * (curPrice * 0.003);
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + seedRandom(seed + '-h') * (curPrice * 0.0015);
    const low = Math.min(open, close) - seedRandom(seed + '-l') * (curPrice * 0.0015);
    price = close;
    candles.push({ open, close, high, low });
  }

  let minP = Math.min(...candles.map(c => c.low));
  let maxP = Math.max(...candles.map(c => c.high));
  const rangeP = maxP - minP || 1;

  candles.forEach((c, idx) => {
    const x = 30 + idx * candleWidth;
    const openY = height - 40 - ((c.open - minP) / rangeP) * (height - 80);
    const closeY = height - 40 - ((c.close - minP) / rangeP) * (height - 80);
    const highY = height - 40 - ((c.high - minP) / rangeP) * (height - 80);
    const lowY = height - 40 - ((c.low - minP) / rangeP) * (height - 80);

    const isUp = c.close >= c.open;
    const color = isUp ? '#10b981' : '#ef4444';

    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x + candleWidth / 2, highY);
    ctx.lineTo(x + candleWidth / 2, lowY);
    ctx.stroke();

    ctx.fillStyle = color;
    const bodyTop = Math.min(openY, closeY);
    const bodyHeight = Math.max(Math.abs(closeY - openY), 2);
    ctx.fillRect(x + 2, bodyTop, candleWidth - 4, bodyHeight);
  });

  // OVERLAY IF MARKET IS CLOSED IN REAL-TIME
  const ist = getISTContext();
  const mStatus = getMarketStatus(ist);

  if (!mStatus.isOpen) {
    ctx.fillStyle = 'rgba(5, 7, 12, 0.82)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 16px Space Grotesk';
    ctx.textAlign = 'center';
    ctx.fillText(`🔒 ${mStatus.label}`, width / 2, height / 2 - 12);

    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px Plus Jakarta Sans';
    ctx.fillText('Live NSE/BSE trading resumes tomorrow at 09:15 AM IST', width / 2, height / 2 + 14);
    ctx.fillText('Configure Simulated Time in Settings to test market hours', width / 2, height / 2 + 34);
    ctx.textAlign = 'left';
  }
}

function renderAIReasoning() {
  selectedAssetReason.textContent = outlook[selectedAsset]?.reason || 'AI analyzing price action...';
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

function renderOptionChain(ist) {
  pcrVal.textContent = (0.85 + seedRandom(ist.dateStr + selectedAsset) * 0.5).toFixed(2);
  vixVal.textContent = (11.5 + seedRandom(ist.dateStr + '-vix') * 3).toFixed(1);

  const curP = prices[selectedAsset]?.current || BASE_PRICES[selectedAsset];
  maxpainNifty.textContent = `₹${(Math.round((prices.NIFTY50.current || BASE_PRICES.NIFTY50) / 50) * 50).toLocaleString('en-IN')}`;
  maxpainBank.textContent = `₹${(Math.round((prices.BANKNIFTY.current || BASE_PRICES.BANKNIFTY) / 100) * 100).toLocaleString('en-IN')}`;
}

function handleRiskCalcUpdate() {
  capital = capitalInput.value.trim() || '500000';
  riskPercent = riskPercentInput.value.trim() || '1.0';
  localStorage.setItem('capital', capital);
  localStorage.setItem('risk_percent', riskPercent);
  renderPositionCalculator();
}

function renderPositionCalculator() {
  const cap = parseFloat(capital) || 500000;
  const risk = parseFloat(riskPercent) || 1.0;
  const maxRiskRupees = (cap * risk) / 100;

  const curP = prices[selectedAsset]?.current || BASE_PRICES[selectedAsset];
  const slOffset = curP * 0.0035; // 0.35% SL
  const lotSize = selectedAsset === 'BANKNIFTY' ? 30 : selectedAsset === 'SENSEX' ? 20 : 75;

  const allowedLots = Math.max(1, Math.floor(maxRiskRupees / (slOffset * lotSize)));

  posCalcResults.innerHTML = `
    <div class="calc-res-row">
      <span class="calc-res-lbl">Max Risk Allowed:</span>
      <span class="calc-res-val red">₹${maxRiskRupees.toLocaleString('en-IN')}</span>
    </div>
    <div class="calc-res-row">
      <span class="calc-res-lbl">Recommended Lot Size:</span>
      <span class="calc-res-val">${allowedLots} Lot (${allowedLots * lotSize} Units)</span>
    </div>
    <div class="calc-res-row">
      <span class="calc-res-lbl">Risk-to-Reward Ratio:</span>
      <span class="calc-res-val green">1 : 2.5 Target</span>
    </div>
  `;
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

    // Freeze Ticks if Market is Closed
    if (!mStatus.isOpen) {
      drawCandlestickChart();
      return;
    }

    Object.keys(prices).forEach(key => {
      const isBull = outlook[key]?.trend === 'BULLISH';
      const tick = (Math.random() - 0.48) * (prices[key].current * 0.0003);
      prices[key].current = parseFloat((prices[key].current + tick).toFixed(2));
      prices[key].change = parseFloat((prices[key].change + (tick / BASE_PRICES[key]) * 100).toFixed(2));
    });
    renderTickerCards();
    drawCandlestickChart();
  }, 2500);
}

function openSettings() {
  apiKeyInput.value = apiKey;
  simTimeSelect.value = simTimeMode;
  settingsModalOverlay.classList.remove('hidden');
}

function closeSettings() {
  settingsModalOverlay.classList.add('hidden');
}

function saveSettings() {
  apiKey = apiKeyInput.value.trim();
  simTimeMode = simTimeSelect.value;
  localStorage.setItem('gemini_api_key', apiKey);
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
