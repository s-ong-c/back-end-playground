const Koa = require('koa')
//  Koa 모듈 가져오기
const app = new Koa()
// app 생성

// 미들웨어 작성
// ctx, next parameter 가지고 있음
app.use((ctx, next) => {
  ctx.body = 'hello Koa'
  console.log(1)
  next()
})

app.use(ctx => {
  ctx.body = 'hello Koa1'
  console.log(2)
})

app.use(ctx => {
  ctx.body = 'hello Koa2'
  console.log(3)
})

app.listen(4000, () => {
  console.log('server is listening to port 4000')
})
