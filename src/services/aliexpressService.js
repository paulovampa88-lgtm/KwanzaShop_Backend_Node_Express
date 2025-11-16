const axios = require('axios');
const Product = require('../models/Product');

async function fetchFromAliExpress(keyword = 'popular', page = 1) {
  const resp = await axios.get('https://aliexpress-datahub.p.rapidapi.com/item_search', {
    params: { keyword, page },
    headers: {
      'X-RapidAPI-Key': process.env.ALIEXPRESS_RAPIDAPI_KEY,
      'X-RapidAPI-Host': process.env.ALIEXPRESS_RAPIDAPI_HOST
    }
  });
  return resp.data.result || [];
}

module.exports = {
  async syncCategories(categories = ['All']) {
    const exchange = Number(process.env.EXCHANGE_RATE || 1000);
    for (const cat of categories) {
      const items = await fetchFromAliExpress(cat, 1);
      for (const it of items) {
        const priceUsd = Number(it.price) || Number(it.minPrice) || 0;
        const doc = {
          source: 'aliexpress',
          title: it.title || it.name,
          description: it.description || '',
          images: it.images || [it.image],
          thumbnail: (it.images && it.images[0]) || it.image || '',
          price_usd: priceUsd,
          price_kz: Math.round(priceUsd * exchange),
          currency: 'USD',
          category: cat,
          stock: it.stock || 100,
          product_url: it.productUrl || it.link || '',
          last_sync: new Date(),
          metadata: it
        };
        await Product.findOneAndUpdate({ product_url: doc.product_url }, doc, { upsert: true });
      }
    }
  }
};