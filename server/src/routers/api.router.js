const router = require('express').Router();
const postsRouter = require('./posts.api.router');
const authRouter = require('./auth.router');
const tokenRouter = require('./token.router');

router.use('/posts', postsRouter);
router.use('/auth', authRouter);
router.use('/tokens', tokenRouter);

module.exports = router;
