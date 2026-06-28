const axios = require('axios');

async function sendWhatsAppMessage(phone, message) {
  const url = process.env.WHATSAPP_API_URL;
  const token = process.env.WHATSAPP_API_TOKEN;

  if (!url || !token) {
    throw new Error('WhatsApp API configuration is missing');
  }

  return axios.post(url, {
    phone,
    message,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}

module.exports = { sendWhatsAppMessage };
