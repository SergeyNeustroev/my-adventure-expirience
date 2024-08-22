const router = require('express').Router();
const { verifyRefreshToken } = require('../../middlewares/verifyToken');
const generateToken = require('../../utils/generateToken');
const cookieConfig = require('../../configs/cookieConfig');

router.get('/refresh', verifyRefreshToken, (req, res) => {
  if (res.locals.user) {
  const { user } = res.locals;
  const { accessToken, refreshToken } = generateToken({ user });
  console.log('accessToken', accessToken);
  console.log('refreshToken', refreshToken);
  
    res
    .cookie('refreshToken', refreshToken, cookieConfig.refreshToken)
    .json({ user, accessToken });
  } else {
    res.json({ user: {} });
  }
});

module.exports = router;
