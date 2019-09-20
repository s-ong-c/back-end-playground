// const axios = require('axios')
// const stringify = require('json-stringify-safe')
// const API_KEY =
//   'RdQwoyVw2Umzdj37CDjaCzkxbzkjpuByd87uDl%2BeDmKkg8Uy1gUZUZei4uunS3iq7MtYUlO6OsKVJR6aXlAD2g%3D%3D'
// const durgStore = async ctx => {
//   try {
//     await axios
//       .get(
//         'http://apis.data.go.kr/B551182/pharmacyInfoService/getParmacyBasisList?serviceKey=' +
//           API_KEY +
//           '&pageNo=1&numOfRows=10&xPos=126.877916&yPos=37.481411&radius=1000'
//       )
//       .then(data => {
//         // const drugStore = JSON.parse(stringify(data.data.response.body.items));
//         ctx.body = {
//           Store: JSON.parse(stringify(data.data.response.body.items.item))
//         }
//       })
//   } catch (err) {
//     ctx.throw(500, err)
//   }
// }
