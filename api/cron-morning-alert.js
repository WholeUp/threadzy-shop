export default async function handler(req, res) {
  const { time, phone, apikey } = req.query;
  const now = new Date();

  try {
    const fetchSymbol = async (symbol) => {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1m&range=1d`;
      const resp = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      const data = await resp.json();
      return data.chart.result[0].meta.regularMarketPrice;
    };

    const niftyPrice = await fetchSymbol('^NSEI').catch(() => 23870);
    const bankPrice = await fetchSymbol('^NSEBANK').catch(() => 56580);

    let message = '';
    if (time === '0900') {
      message = `⏰ 09:00 AM MON-FRI PRE-MARKET ALERT:
Market opens in 15 minutes (09:15 AM IST)!
Nifty 50 Level: ₹${niftyPrice}
Bank Nifty Level: ₹${bankPrice}
Get ready for GTF Demand/Supply Zone setups!
Live Desk: https://threadzy.shop/`;
    } else {
      message = `🚀 09:15 AM LIVE MARKET OPEN:
NSE/BSE Indian Market is now LIVE OPEN!
Nifty 50: ₹${niftyPrice}
Bank Nifty: ₹${bankPrice}
Scan Window #1 Active at 09:45 AM!
Live Desk: https://threadzy.shop/`;
    }

    // CallMeBot Direct WhatsApp Inbox Delivery
    let whatsappDeliveryStatus = 'Web Redirect Ready';
    if (phone && apikey) {
      const cleanPhone = phone.replace(/[^0-9]/g, '');
      const callmebotUrl = `https://api.callmebot.com/whatsapp.php?phone=${cleanPhone}&text=${encodeURIComponent(message)}&apikey=${apikey}`;
      const waRes = await fetch(callmebotUrl).catch(() => null);
      if (waRes && waRes.ok) {
        whatsappDeliveryStatus = 'Direct WhatsApp Inbox Delivered!';
      }
    }

    return res.status(200).json({
      success: true,
      time: time || '0900',
      cronRanAt: now.toISOString(),
      message,
      whatsappDeliveryStatus,
      status: 'Automated Mon-Fri Cron Execution Successful'
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
