const auth = require('./auth')
const Router = require('koa-router')

const routes = new Router()
routes.use('/auth', auth.routes())
routes.get('/check', ctx => {
  ctx.body = {
    version: '1.0.0-alpha.0'
  }
})

module.exports = routes
