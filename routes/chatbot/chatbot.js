const keys = require("../../config/keys");
const apiaiApp = require("apiai")(keys.apiaiToken);

module.exports = app => {
  app.post("/api/webhook", function(req, res) {
    let message = req.body.text;
    console.log(message);
    let apiai = apiaiApp.textRequest(message, {
      sessionId: "gfgdgdg" // any arbitrary text
    });

    apiai.on("response", response => {
      console.log(response.result.fulfillment.speech);
      res.send(response.result.fulfillment.speech);
    });

    apiai.on("error", error => {
      console.log(error);
    });

    apiai.end();
  });
};
