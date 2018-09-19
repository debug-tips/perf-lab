const Koa = require('koa');
const fs = require('fs');
const app = new Koa();

app.use(async ctx => {
  const target = ctx.request.path;

  ctx.set('Content-Type', 'text/html');

  if (ctx.request.query.delay) {
    const delay = parseInt(ctx.request.query.delay, 10);
    const start = Date.now();
    const end = start + delay;
    while (Date.now() < end) {

    }
  }

  if (target === '/') {
    return ctx.body = fs.readFileSync('./index.html');
  } else if (target.endsWith('.html') && fs.existsSync(`.${target}`)) {
    return ctx.body = fs.readFileSync(`.${target}`);
  } else {
    ctx.status = 404;
    return ctx.body = 'Not Found';
  }

});

app.listen(9393);
