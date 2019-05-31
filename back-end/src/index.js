const koa = require('koa');

const app = new koa();

app.use((ctx) =>  {
    ctx.body = 'hello world';
});

app.listen(4000 , () => {
    console.log('port to 400')
})