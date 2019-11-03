const Router = require('koa-router');
const axios = require('axios');
const stringify = require('json-stringify-safe');
require('dotenv').config();
const auth = new Router();
auth.get('/drugs', async (ctx, next) => {
  try {
    await axios
      .get(
        'http://apis.data.go.kr/B551182/pharmacyInfoService/getParmacyBasisList?serviceKey=' +
          process.env.API_KEY +
          '&pageNo=1&numOfRows=10&xPos=126.877916&yPos=37.481411&radius=1000'
      )
      .then(data => {
        // const drugStore = JSON.parse(stringify(data.data.response.body.items));
        ctx.body = {
          Store: JSON.parse(stringify(data.data.response.body.items.item))
        };
      });
  } catch (err) {
    ctx.throw(500, err);
  }
});

module.exports = auth;
