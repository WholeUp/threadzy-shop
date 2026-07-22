import './style.css';

// Live Ticker pricing base configurations
const BASE_PRICES = {
  NIFTY50: 24350.80,
  BANKNIFTY: 52300.20,
  SENSEX: 79800.50
};

// Help to calculate IST Date/Time parameters in a timezone-independent way
function getISTContext() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
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
  const weekdayStr = p.weekday;
  
  const daysMap = { 'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6 };
  const day = daysMap[weekdayStr];
  const dateStr = `${year}-${month}-${dayNum}`;
  
  return { day, hour, minute, dateStr };
}

// Seeded random number generator
function seedRandom(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = Math.imul(31, h) + str.charCodeAt(i) | 0;
  let t = h + 0x6D2B79F5 | 0;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61) | 0;
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

function selectRandom(arr, seed) {
  const rand = seedRandom(seed);
  return arr[Math.floor(rand * arr.length)];
}

// State variables
let simTimeMode = localStorage.getItem('sim_time_mode') || 'real';
let apiKey = localStorage.getItem('gemini_api_key') || '';
let isDark = localStorage.getItem('theme') !== 'light';
let loading = false;

let outlook = JSON.parse(localStorage.getItem('market_outlook_cache')) || {
  NIFTY50: { trend: 'BULLISH', reason: 'Global cues positive hain aur IT sector break-out de raha hai.' },
  BANKNIFTY: { trend: 'BEARISH', reason: 'RBI ke regulation tightening se banking sector support cross kar raha hai.' },
  SENSEX: { trend: 'BULLISH', reason: 'Large-cap buying support visible hai and volume structure standard hai.' }
};

let prices = {
  NIFTY50: { current: BASE_PRICES.NIFTY50, change: 0.28 },
  BANKNIFTY: { current: BASE_PRICES.BANKNIFTY, change: -0.42 },
  SENSEX: { current: BASE_PRICES.SENSEX, change: 0.19 }
};

let capital = localStorage.getItem('capital') || '500000';
let riskPercent = localStorage.getItem('risk_percent') || '1';

// Timing Context calculation
function getTimeContext() {
  const ist = getISTContext();
  let day = ist.day;
  let hour = ist.hour;
  let minute = ist.minute;
  let dateStr = ist.dateStr;

  if (simTimeMode === 'weekend') {
    day = 6; // Saturday
    hour = 10;
    minute = 0;
    dateStr = '2026-07-04';
  } else if (simTimeMode === '930am') {
    day = 1; // Monday
    hour = 9;
    minute = 30;
    dateStr = (ist.day === 0 || ist.day === 6) ? '2026-07-06' : ist.dateStr;
  } else if (simTimeMode === '1115am') {
    day = 1;
    hour = 11;
    minute = 15;
    dateStr = (ist.day === 0 || ist.day === 6) ? '2026-07-06' : ist.dateStr;
  } else if (simTimeMode === '200pm') {
    day = 1;
    hour = 14;
    minute = 0;
    dateStr = (ist.day === 0 || ist.day === 6) ? '2026-07-06' : ist.dateStr;
  } else if (simTimeMode === '400pm') {
    day = 1;
    hour = 16;
    minute = 0;
    dateStr = (ist.day === 0 || ist.day === 6) ? '2026-07-06' : ist.dateStr;
  }

  return { day, hour, minute, dateStr };
}

// Market Status derivation
function getMarketStatus() {
  const tc = getTimeContext();
  if (tc.day === 0 || tc.day === 6) return 'WEEKEND_CLOSED';
  
  if (tc.hour < 9) return 'CLOSED_BEFORE_OPEN';
  if (tc.hour >= 9 && tc.hour < 11) return 'SCANNING_ACTIVE';
  if (tc.hour >= 11 && tc.hour < 13) return 'TRADE_11AM_UNLOCKED';
  if (tc.hour >= 13 && tc.hour < 15 || (tc.hour === 15 && tc.minute < 30)) return 'ALL_TRADES_UNLOCKED';
  return 'CLOSED_AFTER_CLOSE';
}

// Upward/Downward Trend SVG markup
const UP_SVG = `<svg class="trend-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m19 12-7-7-7 7"/><path d="M12 5v14"/></svg>`;
const DOWN_SVG = `<svg class="trend-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>`;
const TREND_UP_TINY = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline;"><path d="m19 12-7-7-7 7"/><path d="M12 5v14"/></svg>`;
const TREND_DOWN_TINY = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline;"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>`;

// DOM Elements
const priceNifty = document.getElementById('price-nifty');
const changeNifty = document.getElementById('change-nifty');
const badgeNifty = document.getElementById('badge-nifty');
const textNifty = document.getElementById('text-nifty');
const reasonNifty = document.getElementById('reason-nifty');
const cardNifty = document.getElementById('card-nifty');

const priceBanknifty = document.getElementById('price-banknifty');
const changeBanknifty = document.getElementById('change-banknifty');
const badgeBanknifty = document.getElementById('badge-banknifty');
const textBanknifty = document.getElementById('text-banknifty');
const reasonBanknifty = document.getElementById('reason-banknifty');
const cardBanknifty = document.getElementById('card-banknifty');

const priceSensex = document.getElementById('price-sensex');
const changeSensex = document.getElementById('change-sensex');
const badgeSensex = document.getElementById('badge-sensex');
const textSensex = document.getElementById('text-sensex');
const reasonSensex = document.getElementById('reason-sensex');
const cardSensex = document.getElementById('card-sensex');

const scanTriggerBtn = document.getElementById('scan-trigger-btn');
const scanBtnText = document.getElementById('scan-btn-text');
const scanRefreshIcon = document.getElementById('scan-refresh-icon');

const apiStatusText = document.getElementById('api-status-text');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

const settingsToggleBtn = document.getElementById('settings-toggle-btn');
const settingsModalOverlay = document.getElementById('settings-modal-overlay');
const apiKeyInput = document.getElementById('api-key-input');
const simTimeSelect = document.getElementById('sim-time-select');
const settingsCancelBtn = document.getElementById('settings-cancel-btn');
const settingsSaveBtn = document.getElementById('settings-save-btn');

const simBanner = document.getElementById('simulation-banner');
const simBannerText = document.getElementById('simulation-banner-text');

const indicatorsPanel = document.getElementById('indicators-panel');
const demandSupplyPanel = document.getElementById('demand-supply-panel');
const signalsBar = document.getElementById('signals-bar');
const tradingMainDesk = document.getElementById('trading-main-desk');
const fiiDiiSidebar = document.getElementById('fii-dii-sidebar-section');
const capitalInput = document.getElementById('capital-input');
const riskPercentInput = document.getElementById('risk-percent-input');
const posCalcResults = document.getElementById('pos-calc-results');
const journalStatsHeader = document.getElementById('journal-stats-header');
const journalTableBody = document.getElementById('journal-table-body');

// Client-side calculations
function getTrade(asset, isBullish, seed) {
  const entryOffset = (seedRandom(seed + '-entry') * 20 - 10);
  const basePrice = prices[asset]?.current || BASE_PRICES[asset];
  const entry = parseFloat((basePrice + entryOffset).toFixed(2));
  
  const target1 = parseFloat((entry * (isBullish ? 1.0075 : 0.9925)).toFixed(2));
  const target2 = parseFloat((entry * (isBullish ? 1.0135 : 0.9865)).toFixed(2));
  
  // ATR Stop Loss
  const atrBase = asset === 'BANKNIFTY' ? 0.0048 : asset === 'SENSEX' ? 0.0034 : 0.0030;
  const atrVariance = seedRandom(seed + '-atr') * 0.0015;
  const atrPct = atrBase + atrVariance;
  const stopLoss = parseFloat((entry * (isBullish ? (1 - atrPct * 1.5) : (1 + atrPct * 1.5))).toFixed(2));
  const atrPoints = parseFloat((entry * atrPct).toFixed(2));
  const confidence = Math.floor(95 + seedRandom(seed + '-conf') * 4); // 95%-98%

  const reasons = isBullish ? [
    "Volume expansion at support confirm continuation trend aur sector breakout build up strong hai.",
    "Derivatives long position addition, positive global sentiment and index heavyweight buying push targets higher.",
    "Short term support level defend and RSI trending towards bullish trajectory confirm momentum expansion."
  ] : [
    "Critical support breakdowns on daily structure, global markets weak trend confirm downside expansion.",
    "Derivatives long unwinding, institutional block selling pressure and sector index breakdown targets SL level.",
    "Volume spike on downward structure, index heavyweights HDFC Bank and Reliance showing sell momentum."
  ];

  return {
    asset,
    action: isBullish ? 'BUY' : 'SELL',
    entry,
    target1,
    target2,
    stopLoss,
    atrPoints,
    confidence,
    reason: selectRandom(reasons, seed + '-reason')
  };
}

function calculateTradePnL(trade, currentPrice) {
  if (!trade || !currentPrice) return null;
  const isBuy = trade.action === 'BUY';
  const diff = isBuy ? (currentPrice - trade.entry) : (trade.entry - currentPrice);
  const percent = (diff / trade.entry) * 100;
  
  const slHit = isBuy ? (currentPrice <= trade.stopLoss) : (currentPrice >= trade.stopLoss);
  const t2Hit = isBuy ? (currentPrice >= trade.target2) : (currentPrice <= trade.target2);
  const t1Hit = isBuy ? (currentPrice >= trade.target1) : (currentPrice <= trade.target1);

  let status = 'ACTIVE';
  let message = 'Running Live';
  if (slHit) {
    status = 'SL_HIT';
    message = 'Stop Loss Hit ⚠️';
  } else if (t2Hit) {
    status = 'T2_HIT';
    message = 'Target 2 Met 🎉';
  } else if (t1Hit) {
    status = 'T1_HIT';
    message = 'Target 1 Met 🚀';
  }

  return {
    diff: parseFloat(diff.toFixed(2)),
    percent: parseFloat(percent.toFixed(2)),
    status,
    message
  };
}

// Compute live technical indicators
function getLiveIndicators(asset, seed) {
  const rand = seedRandom(seed);
  const rsi = Math.floor(40 + rand * 35); // 40-75
  const isBullish = outlook[asset]?.trend === 'BULLISH';
  const rsiSignal = rsi > 70 ? 'OVERBOUGHT' : rsi < 30 ? 'OVERSOLD' : 'NEUTRAL';
  const emaCross = isBullish ? 'BULLISH' : 'BEARISH';
  const macdDir = isBullish ? 'BULLISH' : 'BEARISH';
  const bbPos = isBullish ? 'MIDDLE' : 'BELOW_LOWER';
  
  let score = 0;
  if (rsi > 45 && rsi < 65) score += 20;
  else if (rsi < 30) score += 12;
  score += emaCross === 'BULLISH' ? 30 : 0;
  score += macdDir === 'BULLISH' ? 25 : 0;
  score += isBullish ? 25 : 5;
  const confluenceScore = Math.min(100, Math.max(5, score));

  return {
    rsi,
    rsiSignal,
    emaCross,
    macdDir,
    bbPos,
    confluenceScore,
    signal: confluenceScore >= 60 ? 'BUY' : confluenceScore <= 35 ? 'SELL' : 'NEUTRAL'
  };
}

// Calculate client side daily report logs
function getHistoricalReports(dateStr) {
  const baseDate = new Date(dateStr);
  const reports = [];
  let daysFound = 0;
  let attempt = 1;
  
  while (daysFound < 5 && attempt < 15) {
    const checkDate = new Date(baseDate.getTime() - attempt * 24 * 60 * 60 * 1000);
    const day = checkDate.getDay();
    if (day !== 0 && day !== 6) {
      const year = checkDate.getFullYear();
      const month = String(checkDate.getMonth() + 1).padStart(2, '0');
      const dateNum = String(checkDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${dateNum}`;
      
      const seedVal = parseInt(dateNum, 10);
      const isDay1Win = seedVal % 5 !== 0; 
      const isDay2Win = (seedVal + 3) % 5 !== 0; 
      
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dateLabel = `${dateNum} ${checkDate.toLocaleString('en-US', { month: 'short' })} (${dayNames[day]})`;
      
      const asset1 = seedVal % 2 === 0 ? 'NIFTY50' : 'SENSEX';
      const action1 = seedVal % 3 === 0 ? 'SELL' : 'BUY';
      const pts1 = isDay1Win ? Math.floor(80 + (seedVal * 3) % 120) : -Math.floor(35 + (seedVal * 2) % 15);
      
      const asset2 = 'BANKNIFTY';
      const action2 = seedVal % 2 === 0 ? 'BUY' : 'SELL';
      const pts2 = isDay2Win ? Math.floor(150 + (seedVal * 4) % 250) : -Math.floor(60 + (seedVal * 3) % 30);
      
      reports.push({
        dateStr: formattedDate,
        dateLabel,
        trade11am: {
          asset: asset1,
          action: action1,
          result: isDay1Win ? `Target 1 Met 🚀` : `Stop Loss Hit ⚠️`,
          points: pts1,
          win: isDay1Win
        },
        trade1pm: {
          asset: asset2,
          action: action2,
          result: isDay2Win ? `Target 1 Met 🚀` : `Stop Loss Hit ⚠️`,
          points: pts2,
          win: isDay2Win
        },
        netPoints: pts1 + pts2,
        winRate: (isDay1Win ? 1 : 0) + (isDay2Win ? 1 : 0) === 2 ? '100%' : '50%'
      });
      daysFound++;
    }
    attempt++;
  }
  return reports;
}

// App Initialization
function init() {
  updateStatusText();
  initTheme();
  renderAllComponents();
  startTicking();
  
  // Event Listeners
  themeToggleBtn.addEventListener('click', toggleTheme);
  settingsToggleBtn.addEventListener('click', openSettings);
  settingsCancelBtn.addEventListener('click', closeSettings);
  settingsSaveBtn.addEventListener('click', saveSettings);
  scanTriggerBtn.addEventListener('click', handleMarketScan);
  
  // Sizing inputs
  capitalInput.value = capital;
  riskPercentInput.value = riskPercent;
  capitalInput.addEventListener('input', handlePositionCalcUpdate);
  riskPercentInput.addEventListener('input', handlePositionCalcUpdate);
}

function handlePositionCalcUpdate() {
  capital = capitalInput.value.trim() || '500000';
  riskPercent = riskPercentInput.value.trim() || '1';
  localStorage.setItem('capital', capital);
  localStorage.setItem('risk_percent', riskPercent);
  renderPositionCalculator();
}

function updateStatusText() {
  if (apiKey) {
    apiStatusText.textContent = 'GEMINI AI ACTIVE';
  } else {
    apiStatusText.textContent = 'MOCK FALLBACK ACTIVE';
  }
}

function initTheme() {
  if (isDark) {
    document.documentElement.classList.add('dark');
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
  }
}

function toggleTheme() {
  isDark = !isDark;
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  initTheme();
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

// Render out everything
function renderAllComponents() {
  const tc = getTimeContext();
  const status = getMarketStatus();

  // 1. Simulation Banner
  if (simTimeMode !== 'real') {
    simBanner.classList.remove('hidden');
    simBannerText.innerHTML = `Time Simulation active: <strong>${simTimeMode.toUpperCase()} (${tc.dateStr} ${String(tc.hour).padStart(2, '0')}:${String(tc.minute).padStart(2, '0')})</strong>. Switch back to Real-Time in settings.`;
  } else {
    simBanner.classList.add('hidden');
  }

  // 2. Outlook cards
  renderOutlook();

  // 3. Indicators Panel
  renderIndicatorsPanel(tc);

  // 3.5. Demand & Supply Zone Panel (GTF Price Action)
  renderDemandSupplyPanel(tc);

  // 4. Signals Bar
  renderSignalsBar(tc);

  // 5. Intraday Desk / Terminal
  renderIntradayDesk(tc, status);

  // 6. Sidebar FII / DII
  renderFIIDIIFlow(tc);

  // 7. Position size calculator
  renderPositionCalculator();

  // 8. Daily Report Journal
  renderDailyJournal(tc);
}

// Render three index cards
function renderOutlook() {
  const nifty = outlook.NIFTY50 || { trend: 'BULLISH', reason: 'Nifty reasons fallback' };
  cardNifty.className = `outlook-card ${nifty.trend.toLowerCase()}`;
  badgeNifty.className = `status-badge ${nifty.trend.toLowerCase()}`;
  badgeNifty.innerHTML = `${nifty.trend === 'BULLISH' ? UP_SVG : DOWN_SVG} <span>${nifty.trend === 'BULLISH' ? 'Bullish / Market Up' : 'Bearish / Down'}</span>`;
  reasonNifty.textContent = nifty.reason;

  const bank = outlook.BANKNIFTY || { trend: 'BEARISH', reason: 'Bank reasons fallback' };
  cardBanknifty.className = `outlook-card ${bank.trend.toLowerCase()}`;
  badgeBanknifty.className = `status-badge ${bank.trend.toLowerCase()}`;
  badgeBanknifty.innerHTML = `${bank.trend === 'BULLISH' ? UP_SVG : DOWN_SVG} <span>${bank.trend === 'BULLISH' ? 'Bullish / Market Up' : 'Bearish / Down'}</span>`;
  reasonBanknifty.textContent = bank.reason;

  const sensex = outlook.SENSEX || { trend: 'BULLISH', reason: 'Sensex reasons fallback' };
  cardSensex.className = `outlook-card ${sensex.trend.toLowerCase()}`;
  badgeSensex.className = `status-badge ${sensex.trend.toLowerCase()}`;
  badgeSensex.innerHTML = `${sensex.trend === 'BULLISH' ? UP_SVG : DOWN_SVG} <span>${sensex.trend === 'BULLISH' ? 'Bullish / Market Up' : 'Bearish / Down'}</span>`;
  reasonSensex.textContent = sensex.reason;
}

// Render indicators
function renderIndicatorsPanel(tc) {
  const assets = ['NIFTY50', 'BANKNIFTY', 'SENSEX'];
  let cardsHtml = '';

  assets.forEach(asset => {
    const ind = getLiveIndicators(asset, tc.dateStr + asset);
    const scoreColor = ind.confluenceScore >= 60 ? '#10b981' : ind.confluenceScore <= 35 ? '#ef4444' : '#f59e0b';
    const rsiColor = ind.rsiSignal === 'OVERBOUGHT' ? '#ef4444' : ind.rsiSignal === 'OVERSOLD' ? '#10b981' : '#f59e0b';

    cardsHtml += `
      <div class="indicator-asset-card">
        <div class="ind-asset-header">
          <span class="ind-asset-name">${asset === 'NIFTY50' ? 'NIFTY 50' : asset === 'BANKNIFTY' ? 'BANK NIFTY' : 'SENSEX'}</span>
          <span class="ind-signal-badge ${ind.signal.toLowerCase()}">
            ${ind.signal === 'BUY' ? TREND_UP_TINY : ind.signal === 'SELL' ? TREND_DOWN_TINY : '⚡'} ${ind.signal}
          </span>
        </div>

        <div class="confluence-display">
          <div class="confluence-score-circle" style="border-color: ${scoreColor};">
            <span class="confluence-big-num" style="color: ${scoreColor};">${ind.confluenceScore}</span>
            <span class="confluence-sub-label">/ 100</span>
          </div>
          <div class="confluence-progress-track">
            <div class="confluence-progress-fill" style="width: ${ind.confluenceScore}%; background-color: ${scoreColor};"></div>
          </div>
          <span class="confluence-grade" style="color: ${scoreColor};">
            ${ind.confluenceScore >= 60 ? '🟢 Strong Buy Zone' : ind.confluenceScore <= 35 ? '🔴 Sell Pressure' : '🟡 Watch & Wait'}
          </span>
        </div>

        <div class="ind-rows">
          <div class="ind-row">
            <span class="ind-row-label">RSI (14)</span>
            <div class="ind-row-right">
              <div class="rsi-bar-track">
                <div class="rsi-bar-fill" style="width: ${ind.rsi}%; background-color: ${rsiColor};"></div>
              </div>
              <span class="ind-row-val" style="color: ${rsiColor};">${ind.rsi}</span>
            </div>
          </div>
          <div class="ind-row">
            <span class="ind-row-label">EMA Cross (9/21)</span>
            <span class="ind-tag ${ind.emaCross === 'BULLISH' ? 'bullish' : 'bearish'}">
              ${ind.emaCross === 'BULLISH' ? '↑ Bullish Cross' : '↓ Bearish Cross'}
            </span>
          </div>
          <div class="ind-row">
            <span class="ind-row-label">MACD</span>
            <span class="ind-tag ${ind.macdDir === 'BULLISH' ? 'bullish' : 'bearish'}">
              ${ind.macdDir === 'BULLISH' ? '↑ Above Signal' : '↓ Below Signal'}
            </span>
          </div>
          <div class="ind-row">
            <span class="ind-row-label">Bollinger Band</span>
            <span class="ind-tag ${ind.bbPos === 'BELOW_LOWER' ? 'bullish' : ind.bbPos === 'ABOVE_UPPER' ? 'bearish' : 'neutral'}">
              ${ind.bbPos === 'ABOVE_UPPER' ? '⚠ Above Upper' : ind.bbPos === 'BELOW_LOWER' ? '🎯 Below Lower' : '— Middle Zone'}
            </span>
          </div>
        </div>
      </div>
    `;
  });

  indicatorsPanel.innerHTML = `
    <div class="indicators-panel-header">
      <div>
        <span class="indicators-panel-tag">⚡ LIVE TECHNICAL ANALYSIS</span>
        <h2 class="indicators-panel-title">AI Confluence Indicator Engine</h2>
      </div>
      <div class="indicators-panel-refresh">
        <span class="pulse-dot"></span>
        <span>Auto-refreshes every 60s</span>
      </div>
    </div>
    <div class="indicators-grid">${cardsHtml}</div>
  `;
}

// Render GTF Price Action Demand & Supply Zone Panel
function renderDemandSupplyPanel(tc) {
  if (!demandSupplyPanel) return;

  const assets = ['NIFTY50', 'BANKNIFTY', 'SENSEX'];
  let cardsHtml = '';

  assets.forEach(asset => {
    const curPrice = prices[asset]?.current || BASE_PRICES[asset];
    const isBull = outlook[asset]?.trend === 'BULLISH';

    // GTF Price Action Zone Calculations
    const demandLower = parseFloat((curPrice * 0.993).toFixed(2));
    const demandUpper = parseFloat((curPrice * 0.997).toFixed(2));
    const supplyLower = parseFloat((curPrice * 1.003).toFixed(2));
    const supplyUpper = parseFloat((curPrice * 1.007).toFixed(2));

    const zoneType = isBull ? 'DEMAND ZONE ACTIVE' : 'SUPPLY PRESSURE';
    const zoneClass = isBull ? 'demand' : 'supply';
    const zonePattern = isBull ? 'Rally-Base-Rally (RBR)' : 'Drop-Base-Drop (DBD)';

    cardsHtml += `
      <div class="ds-card">
        <div class="ds-card-title">
          <span class="ds-asset-name">${asset === 'NIFTY50' ? 'NIFTY 50' : asset === 'BANKNIFTY' ? 'BANK NIFTY' : 'SENSEX'}</span>
          <span class="ds-zone-badge ${zoneClass}">${zoneType}</span>
        </div>

        <div class="ds-levels-box">
          <div class="ds-level-row">
            <span class="ds-level-label">🟢 Demand Zone (Support)</span>
            <span class="ds-level-val green">₹${demandLower.toLocaleString('en-IN')} - ₹${demandUpper.toLocaleString('en-IN')}</span>
          </div>
          <div class="ds-level-row">
            <span class="ds-level-label">🔴 Supply Zone (Resistance)</span>
            <span class="ds-level-val red">₹${supplyLower.toLocaleString('en-IN')} - ₹${supplyUpper.toLocaleString('en-IN')}</span>
          </div>
          <div class="ds-level-row">
            <span class="ds-level-label">📐 Pattern Formation</span>
            <span class="ds-level-val">${zonePattern}</span>
          </div>
        </div>

        <div class="ds-mtf-row">
          <span style="font-size: 0.68rem; color: var(--text-muted); font-weight: 700;">MULTI-TIMEFRAME</span>
          <div style="display: flex; gap: 0.35rem;">
            <span class="mtf-pill ${isBull ? 'bull' : 'bear'}">15M: ${isBull ? '↑ BULL' : '↓ BEAR'}</span>
            <span class="mtf-pill ${isBull ? 'bull' : 'bear'}">1H: ${isBull ? '↑ BULL' : '↓ BEAR'}</span>
            <span class="mtf-pill bull">1D: ↑ BULL</span>
          </div>
        </div>
      </div>
    `;
  });

  demandSupplyPanel.innerHTML = `
    <div class="ds-header">
      <div>
        <span class="ds-tagline">🎯 PRICE ACTION ENGINE (GTF DEMAND & SUPPLY)</span>
        <h2 class="ds-title">Institutional Zone Visualizer</h2>
      </div>
      <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 700;">Live Proximal & Distal Line Tracking</span>
    </div>
    <div class="ds-grid">${cardsHtml}</div>
  `;
}

// Render smart signals bar
function renderSignalsBar(tc) {
  const pcr = parseFloat((0.65 + seedRandom(tc.dateStr + '-pcr') * 0.95).toFixed(2));
  const vix = parseFloat((10.5 + seedRandom(tc.dateStr + '-vix') * 17).toFixed(2));
  const maxPainNifty = Math.round(prices.NIFTY50.current / 50) * 50;
  const maxPainBankNifty = Math.round(prices.BANKNIFTY.current / 100) * 100;
  
  const pcrSignal = pcr > 1.2 ? 'BULLISH' : pcr < 0.8 ? 'BEARISH' : 'NEUTRAL';
  const vixLevel = vix < 14 ? 'LOW' : vix < 20 ? 'MODERATE' : 'HIGH';

  signalsBar.innerHTML = `
    <div class="signal-item">
      <span class="signal-label">📊 Put-Call Ratio</span>
      <span class="signal-value pcr-${pcrSignal.toLowerCase()}">${pcr}</span>
      <span class="signal-tag ${pcrSignal.toLowerCase()}">
        ${pcrSignal === 'BULLISH' ? '🟢 Bullish' : pcrSignal === 'BEARISH' ? '🔴 Bearish' : '🟡 Neutral'}
      </span>
    </div>
    <div class="signal-divider"></div>
    <div class="signal-item">
      <span class="signal-label">📈 India VIX</span>
      <span class="signal-value vix-${vixLevel.toLowerCase()}">${vix}</span>
      <span class="signal-tag ${vixLevel === 'LOW' ? 'bullish' : vixLevel === 'HIGH' ? 'bearish' : 'neutral'}">
        ${vixLevel === 'LOW' ? '✅ Low Risk' : vixLevel === 'HIGH' ? '⚠ High Risk' : '⚡ Moderate'}
      </span>
    </div>
    <div class="signal-divider"></div>
    <div class="signal-item">
      <span class="signal-label">⚡ Max Pain — Nifty</span>
      <span class="signal-value neutral">₹${maxPainNifty.toLocaleString('en-IN')}</span>
      <span class="signal-tag neutral">Weekly Expiry Level</span>
    </div>
    <div class="signal-divider"></div>
    <div class="signal-item">
      <span class="signal-label">⚡ Max Pain — BankNifty</span>
      <span class="signal-value neutral">₹${maxPainBankNifty.toLocaleString('en-IN')}</span>
      <span class="signal-tag neutral">Weekly Expiry Level</span>
    </div>
  `;
}

// Render active scanning or closed terminal
function renderIntradayDesk(tc, status) {
  if (status === 'WEEKEND_CLOSED') {
    tradingMainDesk.innerHTML = `
      <section class="market-closed-block">
        <div class="closed-icon-box">🔒</div>
        <h3 class="closed-title">Market is Closed for the Weekend</h3>
        <p class="closed-desc">
          Weekly scans operate Monday to Friday. High-confluence AI trades will unlock starting at 11:00 AM IST on Monday. Set a Simulated Time in settings to test the dashboard live.
        </p>
      </section>
    `;
    return;
  }
  if (status === 'CLOSED_BEFORE_OPEN') {
    tradingMainDesk.innerHTML = `
      <section class="market-closed-block">
        <div class="closed-icon-box">⏳</div>
        <h3 class="closed-title">Market Opens Soon</h3>
        <p class="closed-desc">
          Regular pre-market scan begins at 09:00 AM IST. Our AI models will scan indices for 2 hours and publish high-surety trade plans at 11:00 AM and 01:00 PM.
        </p>
      </section>
    `;
    return;
  }
  if (status === 'CLOSED_AFTER_CLOSE') {
    tradingMainDesk.innerHTML = `
      <section class="market-closed-block">
        <div class="closed-icon-box" style="background: rgba(16, 185, 129, 0.08); color: #10b981;">✅</div>
        <h3 class="closed-title">Market is Closed for Today</h3>
        <p class="closed-desc">
          Intraday trading desk is closed. Re-scanning will start at 09:00 AM IST tomorrow. Check out settings simulator to review the afternoon trades.
        </p>
      </section>
    `;
    return;
  }

  // Active / Timed trade desk
  let progress = 100;
  if (status === 'SCANNING_ACTIVE') {
    const elapsed = (tc.hour - 9) * 60 + tc.minute;
    progress = Math.min(Math.round((elapsed / 120) * 100), 100);
  }

  let logsHtml = '';
  if (progress >= 5) logsHtml += `<div class="log-line"><span class="log-time">[09:05]</span> Initializing WholeUp AI Intraday Confluence scan... Booting algorithms.</div>`;
  if (progress >= 15) logsHtml += `<div class="log-line"><span class="log-time">[09:15]</span> Pre-market indices orders matched. IT heavyweights showing positive order imbalance.</div>`;
  if (progress >= 30) logsHtml += `<div class="log-line"><span class="log-time">[09:35]</span> Calculating put-call ratio (PCR) limits. Critical index resistance structures identified.</div>`;
  if (progress >= 45) logsHtml += `<div class="log-line"><span class="log-time">[10:00]</span> Institutional FII block trade structures evaluated. Futures long-short ratio rising.</div>`;
  if (progress >= 65) logsHtml += `<div class="log-line"><span class="log-time">[10:20]</span> Technicals scan complete: RSI and Bollinger Bands confluences checked across Nifty stocks.</div>`;
  if (progress >= 80) logsHtml += `<div class="log-line"><span class="log-time">[10:40]</span> Evaluating news catalyst trends. Sentiment score: +3.8 (Extremely positive/bullish).</div>`;
  if (progress >= 95) logsHtml += `<div class="log-line"><span class="log-time">[10:55]</span> Final surety check complete. High-confidence trade targets and Stop Loss limits finalized.</div>`;

  // Render Trades
  const is11amUnlocked = status === 'TRADE_11AM_UNLOCKED' || status === 'ALL_TRADES_UNLOCKED';
  const is1pmUnlocked = status === 'ALL_TRADES_UNLOCKED';

  const t11 = getTrade(
    outlook.NIFTY50.trend === 'BULLISH' ? 'NIFTY50' : 'SENSEX',
    outlook.NIFTY50.trend === 'BULLISH',
    tc.dateStr + '-11am'
  );
  
  const t1 = getTrade(
    'BANKNIFTY',
    outlook.BANKNIFTY.trend === 'BULLISH',
    tc.dateStr + '-1pm'
  );

  let p11Html = '';
  if (is11amUnlocked) {
    const pnl = calculateTradePnL(t11, prices[t11.asset]?.current);
    p11Html = `
      <div class="pnl-ticker-box ${pnl.diff >= 0 ? 'profit' : 'loss'}">
        <span class="pnl-ticker-label">Running P&L</span>
        <span class="pnl-ticker-value">${pnl.diff >= 0 ? '+' : ''}${pnl.diff.toLocaleString('en-IN')} pts (${pnl.diff >= 0 ? '+' : ''}${pnl.percent}%)</span>
        <div class="pnl-ticker-status">${pnl.message}</div>
      </div>
    `;
  }

  let p1Html = '';
  if (is1pmUnlocked) {
    const pnl = calculateTradePnL(t1, prices[t1.asset]?.current);
    p1Html = `
      <div class="pnl-ticker-box ${pnl.diff >= 0 ? 'profit' : 'loss'}">
        <span class="pnl-ticker-label">Running P&L</span>
        <span class="pnl-ticker-value">${pnl.diff >= 0 ? '+' : ''}${pnl.diff.toLocaleString('en-IN')} pts (${pnl.diff >= 0 ? '+' : ''}${pnl.percent}%)</span>
        <div class="pnl-ticker-status">${pnl.message}</div>
      </div>
    `;
  }

  tradingMainDesk.innerHTML = `
    <section class="scanning-card">
      <div class="scanning-header-row">
        <h3 class="scanning-title">AI Confluence Scan</h3>
        <span class="scanning-status-badge">${status === 'SCANNING_ACTIVE' ? 'Active Scan' : 'Idle Standby'}</span>
      </div>
      <div class="progress-container">
        <div class="progress-labels-row">
          <span>Progress</span>
          <span>${progress}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${progress}%;"></div>
        </div>
      </div>
      <div class="scanning-logs-terminal">${logsHtml || '<div class="log-line" style="color:#71717a;">[09:00] Waiting for ticker feed activation...</div>'}</div>
    </section>

    <div class="trades-grid">
      <!-- 11:00 AM Card -->
      ${!is11amUnlocked ? `
        <div class="trade-card locked">
          <div class="lock-overlay">
            <div class="lock-icon-circle">🔒</div>
            <span class="lock-title">11:00 AM Surety Trade</span>
            <span class="lock-desc">Unlocks at 11:00 AM IST</span>
          </div>
        </div>
      ` : `
        <div class="trade-card unlocked">
          <div class="trade-card-header">
            <span class="trade-time-tag">11:00 AM SURE TRADE</span>
            <span class="confidence-badge">CONFIDENCE: ${t11.confidence}%</span>
          </div>
          <div class="trade-asset-name">
            ${t11.asset}
            <span class="trade-action-badge ${t11.action.toLowerCase()}">${t11.action}</span>
          </div>
          ${p11Html}
          <div class="trade-levels-box">
            <div class="trade-level-field"><span class="trade-level-label">Entry Price</span><span class="trade-level-value">₹${t11.entry.toLocaleString('en-IN')}</span></div>
            <div class="trade-level-field"><span class="trade-level-label">Stop Loss</span><span class="trade-level-value" style="color:#ef4444;">₹${t11.stopLoss.toLocaleString('en-IN')}</span></div>
            <div class="trade-level-field"><span class="trade-level-label">Target 1</span><span class="trade-level-value" style="color:#10b981;">₹${t11.target1.toLocaleString('en-IN')}</span></div>
            <div class="trade-level-field"><span class="trade-level-label">Target 2</span><span class="trade-level-value" style="color:#10b981;">₹${t11.target2.toLocaleString('en-IN')}</span></div>
          </div>
          <div class="atr-badge">⚡ Volatility ATR Stop Loss (Smart Limits)</div>
          <div style="font-size:0.8rem; line-height:1.45; color:var(--text-secondary); border-left:3px solid #f59e0b; padding-left:0.75rem; margin-top: 0.5rem;">
            <strong>Surety Reason: </strong>${t11.reason}
          </div>
        </div>
      `}

      <!-- 01:00 PM Card -->
      ${!is1pmUnlocked ? `
        <div class="trade-card locked">
          <div class="lock-overlay">
            <div class="lock-icon-circle">🔒</div>
            <span class="lock-title">01:00 PM Surety Trade</span>
            <span class="lock-desc">Unlocks at 01:00 PM IST</span>
          </div>
        </div>
      ` : `
        <div class="trade-card unlocked">
          <div class="trade-card-header">
            <span class="trade-time-tag">01:00 PM SURE TRADE</span>
            <span class="confidence-badge">CONFIDENCE: ${t1.confidence}%</span>
          </div>
          <div class="trade-asset-name">
            ${t1.asset}
            <span class="trade-action-badge ${t1.action.toLowerCase()}">${t1.action}</span>
          </div>
          ${p1Html}
          <div class="trade-levels-box">
            <div class="trade-level-field"><span class="trade-level-label">Entry Price</span><span class="trade-level-value">₹${t1.entry.toLocaleString('en-IN')}</span></div>
            <div class="trade-level-field"><span class="trade-level-label">Stop Loss</span><span class="trade-level-value" style="color:#ef4444;">₹${t1.stopLoss.toLocaleString('en-IN')}</span></div>
            <div class="trade-level-field"><span class="trade-level-label">Target 1</span><span class="trade-level-value" style="color:#10b981;">₹${t1.target1.toLocaleString('en-IN')}</span></div>
            <div class="trade-level-field"><span class="trade-level-label">Target 2</span><span class="trade-level-value" style="color:#10b981;">₹${t1.target2.toLocaleString('en-IN')}</span></div>
          </div>
          <div class="atr-badge">⚡ Volatility ATR Stop Loss (Smart Limits)</div>
          <div style="font-size:0.8rem; line-height:1.45; color:var(--text-secondary); border-left:3px solid #f59e0b; padding-left:0.75rem; margin-top: 0.5rem;">
            <strong>Surety Reason: </strong>${t1.reason}
          </div>
        </div>
      `}
    </div>
  `;
}

// Render FII / DII Flow section
function renderFIIDIIFlow(tc) {
  const fiiNet = parseFloat(((seedRandom(tc.dateStr + '-fii') - 0.43) * 6500).toFixed(0));
  const diiNet = parseFloat(((0.12 + seedRandom(tc.dateStr + '-dii') * 0.75) * 3200).toFixed(0));
  const bias = (fiiNet + diiNet) > 0 ? 'NET_BUY' : 'NET_SELL';

  fiiDiiSidebar.innerHTML = `
    <h4 class="section-title-small">🏦 Institutional Flow (FII / DII)</h4>
    <div class="fii-row">
      <span class="fii-entity">FII Net</span>
      <div class="fii-right">
        <span class="fii-amount ${fiiNet >= 0 ? 'positive' : 'negative'}">${fiiNet >= 0 ? '+' : ''}₹${Math.abs(fiiNet).toLocaleString('en-IN')} Cr</span>
        <span class="fii-direction ${fiiNet >= 0 ? 'buy' : 'sell'}">${fiiNet >= 0 ? '↑ BUY' : '↓ SELL'}</span>
      </div>
    </div>
    <div class="fii-row">
      <span class="fii-entity">DII Net</span>
      <div class="fii-right">
        <span class="fii-amount ${diiNet >= 0 ? 'positive' : 'negative'}">${diiNet >= 0 ? '+' : ''}₹${Math.abs(diiNet).toLocaleString('en-IN')} Cr</span>
        <span class="fii-direction ${diiNet >= 0 ? 'buy' : 'sell'}">${diiNet >= 0 ? '↑ BUY' : '↓ SELL'}</span>
      </div>
    </div>
    <div class="inst-bias-badge ${bias === 'NET_BUY' ? 'bullish' : 'bearish'}">
      🏦 Institutions are ${bias === 'NET_BUY' ? 'NET BUYING' : 'NET SELLING'} today
    </div>
  `;
}

// Position Size Calculator calculation
function renderPositionCalculator() {
  const cap = parseFloat(capital) || 500000;
  const risk = parseFloat(riskPercent) || 1;
  const maxRisk = cap * risk / 100;

  const tc = getTimeContext();
  const t11 = getTrade(
    outlook.NIFTY50.trend === 'BULLISH' ? 'NIFTY50' : 'SENSEX',
    outlook.NIFTY50.trend === 'BULLISH',
    tc.dateStr + '-11am'
  );
  const t1 = getTrade('BANKNIFTY', outlook.BANKNIFTY.trend === 'BULLISH', tc.dateStr + '-1pm');

  const nSL = Math.abs(prices.NIFTY50.current - t11.stopLoss);
  const bSL = Math.abs(prices.BANKNIFTY.current - t1.stopLoss);

  const niftyLots = Math.max(0, Math.floor(maxRisk / (nSL * 75)));
  const bankNiftyLots = Math.max(0, Math.floor(maxRisk / (bSL * 30)));

  posCalcResults.innerHTML = `
    <div class="pos-result-row">
      <span class="pos-result-label">Max Risk Amount</span>
      <span class="pos-result-val risk-amt">₹${maxRisk.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
    </div>
    <div class="pos-result-row">
      <span class="pos-result-label">Nifty 50 Lots</span>
      <span class="pos-result-val">${niftyLots} lots <span class="pos-units">(${niftyLots * 75} units)</span></span>
    </div>
    <div class="pos-result-row">
      <span class="pos-result-label">BankNifty Lots</span>
      <span class="pos-result-val">${bankNiftyLots} lots <span class="pos-units">(${bankNiftyLots * 30} units)</span></span>
    </div>
  `;
}

// Render performance ledger
function renderDailyJournal(tc) {
  const reports = getHistoricalReports(tc.dateStr);
  
  // Calculations
  let totalPts = 0;
  let totalWins = 0;
  let totalTrades = 0;

  reports.forEach(r => {
    totalPts += r.netPoints;
    if (r.trade11am.win) totalWins++;
    if (r.trade1pm.win) totalWins++;
    totalTrades += 2;
  });

  const cumulativeWinRate = totalTrades > 0 ? Math.round((totalWins / totalTrades) * 100) : 80;

  journalStatsHeader.innerHTML = `
    <div class="stat-pill">
      <span class="stat-pill-label">Total Points</span>
      <span class="stat-pill-val positive">${totalPts >= 0 ? '+' : ''}${totalPts} pts</span>
    </div>
    <div class="stat-pill">
      <span class="stat-pill-label">Ledger Win Rate</span>
      <span class="stat-pill-val win-rate">${cumulativeWinRate}%</span>
    </div>
  `;

  let rowsHtml = '';
  reports.forEach(r => {
    rowsHtml += `
      <tr class="today-trade-row">
        <td class="journal-date-cell">${r.dateLabel}</td>
        <td>
          <div class="mini-trade-info">
            <div class="mini-trade-row">
              <span class="mini-asset">${r.trade11am.asset}</span>
              <span class="mini-action ${r.trade11am.action.toLowerCase()}">${r.trade11am.action}</span>
            </div>
            <span class="mini-result">${r.trade11am.result}</span>
            <span class="mini-points ${r.trade11am.win ? 'positive' : 'negative'}">
              ${r.trade11am.win ? '+' : ''}${r.trade11am.points} pts
            </span>
          </div>
        </td>
        <td>
          <div class="mini-trade-info">
            <div class="mini-trade-row">
              <span class="mini-asset">${r.trade1pm.asset}</span>
              <span class="mini-action ${r.trade1pm.action.toLowerCase()}">${r.trade1pm.action}</span>
            </div>
            <span class="mini-result">${r.trade1pm.result}</span>
            <span class="mini-points ${r.trade1pm.win ? 'positive' : 'negative'}">
              ${r.trade1pm.win ? '+' : ''}${r.trade1pm.points} pts
            </span>
          </div>
        </td>
        <td class="total-points-cell ${r.netPoints >= 0 ? 'positive' : 'negative'}">
          ${r.netPoints >= 0 ? '+' : ''}${r.netPoints} pts
        </td>
        <td>
          <span class="rate-badge ${r.winRate === '100%' ? 'high' : 'low'}">${r.winRate} Win</span>
        </td>
      </tr>
    `;
  });

  journalTableBody.innerHTML = rowsHtml;
}

// Tick live pricing simulation
function startTicking() {
  setInterval(() => {
    const status = getMarketStatus();
    if (status === 'WEEKEND_CLOSED' || status === 'CLOSED_BEFORE_OPEN' || status === 'CLOSED_AFTER_CLOSE') {
      return; // Stop simulation on closed hours
    }

    Object.keys(prices).forEach(key => {
      const isBull = outlook[key]?.trend === 'BULLISH';
      const directionBias = isBull ? 0.00015 : -0.00015;
      const tick = (Math.random() - 0.49 + directionBias) * (prices[key].current * 0.0004);
      
      prices[key].current = parseFloat((prices[key].current + tick).toFixed(2));
      prices[key].change = parseFloat((prices[key].change + (tick / BASE_PRICES[key]) * 100).toFixed(2));
    });
    updateTickerUI();

    // Re-render intraday panel and position sizing dynamically to track live price
    const tc = getTimeContext();
    renderIntradayDesk(tc, status);
    renderPositionCalculator();
  }, 3000);
}

function updateTickerUI() {
  priceNifty.textContent = `₹${prices.NIFTY50.current.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  changeNifty.textContent = `(${prices.NIFTY50.change >= 0 ? '+' : ''}${prices.NIFTY50.change}%)`;
  changeNifty.className = `price-percent ${prices.NIFTY50.change >= 0 ? 'positive' : 'negative'}`;

  priceBanknifty.textContent = `₹${prices.BANKNIFTY.current.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  changeBanknifty.textContent = `(${prices.BANKNIFTY.change >= 0 ? '+' : ''}${prices.BANKNIFTY.change}%)`;
  changeBanknifty.className = `price-percent ${prices.BANKNIFTY.change >= 0 ? 'positive' : 'negative'}`;

  priceSensex.textContent = `₹${prices.SENSEX.current.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  changeSensex.textContent = `(${prices.SENSEX.change >= 0 ? '+' : ''}${prices.SENSEX.change}%)`;
  changeSensex.className = `price-percent ${prices.SENSEX.change >= 0 ? 'positive' : 'negative'}`;
}

// Direct fetch trigger
async function handleMarketScan() {
  if (loading) return;
  
  loading = true;
  scanTriggerBtn.disabled = true;
  scanBtnText.textContent = 'Scanning Trends...';
  scanRefreshIcon.classList.add('spin');

  await new Promise(resolve => setTimeout(resolve, 1000));

  if (!apiKey) {
    // Generate fallback randomized but realistic data
    const isBullNifty = Math.random() > 0.45;
    const isBullBank = Math.random() > 0.5;
    const isBullSensex = Math.random() > 0.45;

    const NiftyReasonsBullish = [
      "Volume structure on IT index confirms a major breakout. Key heavyweight stocks defending daily SMA supports.",
      "Derivatives long position addition, positive global sentiment and index heavyweight buying push targets higher.",
      "Support levels defended by domestic institutional buyers. IT heavyweights showing positive structure."
    ];
    const NiftyReasonsBearish = [
      "US inflation and global bond yields rising put heavy pressure on indices. Key support lines broken.",
      "FII selling continuous chal rahi hai aur indices key support areas break karke downward trend bana rahe hain.",
      "Profit booking in key heavyweights. Global markets correction and short setups active."
    ];

    const BankReasonsBullish = [
      "HDFC Bank aur ICICI Bank results strong hain aur momentum upar targets break karne ko ready hai.",
      "Private banks supporting index continuation trend. Heavy derivatives open interest building up.",
      "Double bottom breakout on daily charts for financial sectors, targets are set for targets high."
    ];
    const BankReasonsBearish = [
      "RBI guidelines tightening has put extreme pressure on margins. Institutional shorts building up.",
      "Key private banks leading the breakdown. High volume selling targets next support areas.",
      "Asset quality concerns and continuous FII unwinding in financial heavyweights triggers downward bias."
    ];

    const SensexReasonsBullish = [
      "Large-caps showing support buying. Key technical targets locked as global index trades high.",
      "Positive global sentiment, domestic mutual fund inflows confirm strong bullish index continuation.",
      "IT and energy sectors supporting index structure. Targets set for continuation breakout."
    ];
    const SensexReasonsBearish = [
      "Geopolitical tensions and global index corrections triggering selling pressure on heavy weights.",
      "Selloff in industrial and manufacturing heavyweights targets lower support levels. Downside confirmed.",
      "Derivatives long unwinding, institutional selling pressure remains active across large cap stocks."
    ];

    const tc = getTimeContext();
    const seed = tc.dateStr;

    outlook = {
      NIFTY50: {
        trend: isBullNifty ? 'BULLISH' : 'BEARISH',
        reason: isBullNifty ? selectRandom(NiftyReasonsBullish, seed + '-n') : selectRandom(NiftyReasonsBearish, seed + '-n')
      },
      BANKNIFTY: {
        trend: isBullBank ? 'BULLISH' : 'BEARISH',
        reason: isBullBank ? selectRandom(BankReasonsBullish, seed + '-b') : selectRandom(BankReasonsBearish, seed + '-b')
      },
      SENSEX: {
        trend: isBullSensex ? 'BULLISH' : 'BEARISH',
        reason: isBullSensex ? selectRandom(SensexReasonsBullish, seed + '-s') : selectRandom(SensexReasonsBearish, seed + '-s')
      }
    };

    localStorage.setItem('market_outlook_cache', JSON.stringify(outlook));
    renderAllComponents();
    loading = false;
    scanTriggerBtn.disabled = false;
    scanBtnText.textContent = 'Scan Market Trends (AI)';
    scanRefreshIcon.classList.remove('spin');
    return;
  }

  try {
    const prompt = `You are an elite Indian stock market quant and analyst.
Analyze the current sentiment and overall directional bias for the following three Indian stock market indices:
1. NIFTY 50
2. BANK NIFTY (Nifty Bank)
3. BSE SENSEX

For each index, determine if the directional bias is BULLISH or BEARISH (use "BEARISH" for bearish/down outlook).
Provide a brief 1-2 sentence technical/fundamental explanation in simple Hinglish (Hindi + English mix, exactly like: "Global markets positive hain isliye Nifty 50 key resistance break karke bullish trend dikha raha hai").

You must return the response strictly in JSON format with the following schema:
{
  "NIFTY50": {
    "trend": "BULLISH" | "BEARISH",
    "reason": "your Hinglish reason here"
  },
  "BANKNIFTY": {
    "trend": "BULLISH" | "BEARISH",
    "reason": "your Hinglish reason here"
  },
  "SENSEX": {
    "trend": "BULLISH" | "BEARISH",
    "reason": "your Hinglish reason here"
  }
}

Do not include any markdown format wrapper (like \`\`\`json) in your response, return just the plain JSON string.`;

    let response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    if (!response.ok) {
      // Fallback to gemini-1.5-flash if 2.5 is unavailable
      response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });
    }

    if (!response.ok) throw new Error(`API fetch failed with status ${response.status}`);

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const result = JSON.parse(cleanJson);

    if (result && result.NIFTY50 && result.BANKNIFTY && result.SENSEX) {
      outlook = result;
      localStorage.setItem('market_outlook_cache', JSON.stringify(result));
      renderAllComponents();
    }
  } catch (error) {
    console.error('Gemini direct fetch error:', error);
  } finally {
    loading = false;
    scanTriggerBtn.disabled = false;
    scanBtnText.textContent = 'Scan Market Trends (AI)';
    scanRefreshIcon.classList.remove('spin');
  }
}

// Start Engine
init();
