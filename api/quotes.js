export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Primary: Direct TradingView Real-Time Scanner API
    const tvResp = await fetch('https://scanner.tradingview.com/india/scan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: JSON.stringify({
        symbols: { tickers: ['NSE:NIFTY', 'NSE:BANKNIFTY', 'BSE:SENSEX'] },
        columns: ['close', 'change', 'high', 'low']
      })
    });

    if (tvResp.ok) {
      const tvData = await tvResp.json();
      if (tvData && Array.isArray(tvData.data) && tvData.data.length >= 3) {
        const parseTvRow = (row) => {
          const close = parseFloat(row.d[0].toFixed(2));
          const changePct = parseFloat(row.d[1].toFixed(2));
          const high = parseFloat(row.d[2].toFixed(2));
          const low = parseFloat(row.d[3].toFixed(2));
          const prevClose = parseFloat((close / (1 + (changePct / 100))).toFixed(2));
          return { current: close, change: changePct, prevClose, high, low };
        };

        const niftyRow = tvData.data.find(d => d.s === 'NSE:NIFTY') || tvData.data[0];
        const bankniftyRow = tvData.data.find(d => d.s === 'NSE:BANKNIFTY') || tvData.data[1];
        const sensexRow = tvData.data.find(d => d.s === 'BSE:SENSEX') || tvData.data[2];

        res.setHeader('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
        return res.status(200).json({
          success: true,
          source: 'TradingView Direct Scanner',
          timestamp: new Date().toISOString(),
          prices: {
            NIFTY50: parseTvRow(niftyRow),
            BANKNIFTY: parseTvRow(bankniftyRow),
            SENSEX: parseTvRow(sensexRow)
          }
        });
      }
    }

    // Fallback: Yahoo Finance API
    const fetchYahooSymbol = async (symbol) => {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1m&range=1d`;
      const resp = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      if (!resp.ok) throw new Error(`Yahoo Finance error ${resp.status}`);
      const data = await resp.json();
      const meta = data.chart.result[0].meta;
      const current = meta.regularMarketPrice;
      const prevClose = meta.chartPreviousClose || meta.previousClose;
      const change = current - prevClose;
      const changePct = prevClose ? parseFloat(((change / prevClose) * 100).toFixed(2)) : 0;
      return {
        current: parseFloat(current.toFixed(2)),
        change: changePct,
        prevClose: parseFloat(prevClose.toFixed(2)),
        high: meta.regularMarketDayHigh ? parseFloat(meta.regularMarketDayHigh.toFixed(2)) : current,
        low: meta.regularMarketDayLow ? parseFloat(meta.regularMarketDayLow.toFixed(2)) : current
      };
    };

    const [nifty, banknifty, sensex] = await Promise.all([
      fetchYahooSymbol('^NSEI'),
      fetchYahooSymbol('^NSEBANK'),
      fetchYahooSymbol('^BSESN')
    ]);

    res.setHeader('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
    return res.status(200).json({
      success: true,
      source: 'Yahoo Finance',
      timestamp: new Date().toISOString(),
      prices: {
        NIFTY50: nifty,
        BANKNIFTY: banknifty,
        SENSEX: sensex
      }
    });
  } catch (err) {
    console.error('Error fetching live quotes:', err);
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}

