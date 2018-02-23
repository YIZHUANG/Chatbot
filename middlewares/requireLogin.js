module.exports = (req, res, next) => {
  //make sure  the user is lodgged in.
  if (!req.user) {
    return res.status(401).send({ error: ' You must log in !' });
  }

  next();
};
