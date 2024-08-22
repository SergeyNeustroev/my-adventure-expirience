const router = require('express').Router();
const { User } = require('../../db/models');
const { verifyRefreshToken, verifyAccessToken } = require('../../middlewares/verifyToken');

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
.put('/', verifyAccessToken, async (req, res) => {
    const { car, boat, photo } = req.body;
    const { user } = res.locals;
    try {
      const userprofile = await User.findOne({ where: { id: user.id } });
      userprofile.update({ car, boat, photo }, { where: { id: user.id } });
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  });

  module.exports = router;