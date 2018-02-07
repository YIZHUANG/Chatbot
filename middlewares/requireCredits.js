module.exports = (req, res, next) => {
  //make sure  the user has enough credits.
  if (req.user.credits < 1) {
    return res.status(403).send({ error: ' Not enough credits !' });
  }

  next();
};
