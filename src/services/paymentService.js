
const axios = require('axios');
async function createPaymentSession({ orderId, amount_kz, currency = 'AOA', return_url }) {
  return { payment_url: `https://redotpay.test/checkout?ref=${orderId}`, reference: `KWZ-${Date.now()}` };
}
module.exports = { createPaymentSession };
