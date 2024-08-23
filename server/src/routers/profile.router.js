const router = require('express').Router();
const { User } = require('../../db/models');
const { verifyRefreshToken, verifyAccessToken } = require('../../middlewares/verifyToken');
const multer  = require('multer')
const bcrypt = require('bcrypt');
const generateToken = require('../../utils/generateToken');
const cookieConfig = require('../../configs/cookieConfig');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './public/photos')
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage })

router
.get('/', verifyRefreshToken, async (req, res) => {
  const { user } = res.locals;

  try {
    const entries = await User.findOne({ where: { id: user.id } });
    res.json(entries);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
})
.put('/changeLogin', verifyAccessToken, async (req, res) => {
  const { username, email, password } = req.body;
  const { user } = res.locals;
  try {
    const userprofile = await User.findOne({ where: { id: user.id } });
    if (username !== null) userprofile.update({ username }, { where: { id: user.id } });
    if (email !== null) userprofile.update({ email }, { where: { id: user.id } });
    if (password !== null) userprofile.update({ password: await bcrypt.hash(password, 10) }, { where: { id: user.id } });
    const plainUser = await User.findOne({ where: { id: user.id } });
    delete plainUser.password;
    const { accessToken, refreshToken } = generateToken({ user: plainUser });
    res
    .cookie('refreshToken', refreshToken, cookieConfig.refreshToken)
    .json({ user: plainUser, accessToken })
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
})
.post('/changePhoto', verifyRefreshToken, upload.single("photo"), async (req, res) => {
    const photo = req.file.filename;
    const { user } = res.locals;
  try {
    User.update({ photo }, { where: { id: user.id } });
    res.redirect('http://localhost:5173/profile')
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
    
  });

  module.exports = router;