const jwt = require('jsonwebtoken');

const verifyRefreshToken = (req, res, next) => {
  if (req.cookies){
  try {
    const { refreshToken } = req.cookies;
    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    res.locals.user = user;

    next();
  } catch (error) {
    console.log('Invalid refresh', error);
    res.status(400).json({ message: 'Invalid refresh' });
  }
}
};

const verifyAccessToken = (req, res, next) => {
  console.log('cookies:',req.headers);
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    console.log('22', accessToken);
    const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    res.locals.user = user;
    console.log('user:', user);
    
    next();
  } catch (error) {
    console.log('Invalid access', error);
    res.status(400).json({ message: 'Invalid access' });
  }
};

module.exports = { verifyRefreshToken, verifyAccessToken };
