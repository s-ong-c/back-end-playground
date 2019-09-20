const auth = require('./auth')
const Router = require('koa-router')

const routes = new Router()
routes.use('/auth', auth.routes())
routes.get('/', (ctx, next) => {
  ctx.body = '홈'
})

routes.get('/about', (ctx, next) => {
  ctx.body = '소개'
})

routes.get('/about/:name', (ctx, next) => {
  const { name } = ctx.params // 라우트 경로에서 :파라미터명 으로 정의된 값이 ctx.params 안에 설정됩니다.
  ctx.body = name + '의 소개'
})

routes.get('/post', (ctx, next) => {
  const { id } = ctx.request.query // 주소 뒤에 ?id=10 이런식으로 작성된 쿼리는 ctx.request.query 에 파싱됩니다.
  if (id) {
    ctx.body = '포스트 #' + id
  } else {
    ctx.body = '포스트 아이디가 없습니다.'
  }
})
routes.get('/check', ctx => {
  ctx.body = {
    version: '1.0.0-alpha.0'
  }
})

module.exports = routes
