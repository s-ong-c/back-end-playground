const Koa = require('koa')
//  Koa 모듈 가져오기
// 경로에 따라 다른 작업을 할 수 있게 해주는 koa-router

const router = require('./routes')
const app = new Koa()
// app 생성

// router.get('/', (ctx, next) => {
//   ctx.body = 'HOME'
// })

app.use(router.routes())
app.use(router.allowedMethods())
// 미들웨어 작성
// ctx, next parameter 가지고 있음

app.listen(4000, () => {
  console.log('server is listening to port 4000')
})
