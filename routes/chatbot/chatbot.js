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
      let text = response.result.fulfillment.speech;
      let intentName = response.result.metadata.intentName;
      console.log(response);
      if (intentName == "Bookappointment" || intentName == "doctor-request") {
        res.send(intentName);
      } else {
        res.send(text);
      }
    });
    apiai.on("error", error => {
      console.log(error);
    });

    apiai.end();
  });
};
