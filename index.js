const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const app = new Koa();

app.use(async ctx => {
  const target = ctx.request.path;
  const ext = path.extname(target).slice(1);
  const config = JSON.parse(ctx.cookies.get('config') || "{}");

  switch (ext) {
    case 'js': {
      ctx.set('Content-Type', 'application/javascript');
    }
    break;

    case 'css': {
      ctx.set('Content-Type', 'text/css');
    }
    break;

    case 'jpg':
    case 'png': {
      ctx.set('Content-Type', `image/${ext}`);
    }
    break;

    default:
      ctx.set('Content-Type', 'text/html');
  }

  if (config.type === 'delay' && ext === config.file) {
    sleep(config.value);
  }

  if (target === '/') {
    return ctx.body = fs.readFileSync('./index.html');
  } else if (fs.existsSync(`.${target}`)) {
    return ctx.body = fs.readFileSync(`.${target}`);
  } else if (target.endsWith('.html')) {
    return ctx.body = fs.readFileSync('./demo/views/index.html');
  } else {
    ctx.status = 404;
    return ctx.body = 'Not Found';
  }
});

function sleep(time) {
  time = parseInt(time, 10);
  if (isNaN(time)) {
    return;
  }
  const end = Date.now() + time;
  while (Date.now() < end) {}
}

app.listen(9393);
