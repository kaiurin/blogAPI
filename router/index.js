const Router = require('koa-router');
const router = new Router();
const Post = require('../api/db');

router.post('/addPost', async (ctx) => {
    try {
        const result = await Post.addPost({...ctx.request.body});
        ctx.body = result;
    } catch (err) {
        console.error('err', err);
        ctx.status = 500;
        ctx.body = 'Internal error'
    }
});

router.post('/newPost', async (ctx) => {
    ctx.status = 201;
    const result = await Post.create(ctx.request.body);
    ctx.body = result;
});

router.get('/', async (ctx) => {
    ctx.body = 'It works!'
});

router.get('/post', async (ctx) => {
    ctx.body = await Post.getAll()
});
router.get('/post/:id', async (ctx) => {
    let result = await Post.get(ctx.params.id);
    if (result) {
        ctx.body = result
    } else {
        ctx.status = 204
    }
});
router.put('/post/:id', async (ctx, next) => {
    ctx.status = 204;
    let result = await Post.update(ctx.params.id, ctx.request.body);
    ctx.body = result
});
router.delete('/post/:id', async (ctx, next) => {
    ctx.status = 204;
    let rsult = await Post.delete(ctx.params.id);
    ctx.body = rsult
});


module.exports = router;
