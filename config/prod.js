// for production.
module.exports = {
  mongoURL: process.env.MONGO_URL,
  cookieKey: process.env.COOKIE_KEY,
  stripePublishablekey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  sendGridKey: process.env.SEND_GRID_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN,
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectGoogleCallBack: process.env.GOOGLE_CALL_BACK
};
