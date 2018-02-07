const keys = require("../../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../../middlewares/requireLogin"); //middleware that make sure  the user is lodgged in.

module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "Give me 500 $$",
      source: req.body.id
    });

    req.user.credits += 20;
    const user = await req.user.save();

    res.send(user);
  });
};
