const keys = require("../../config/keys");
const apiaiApp = require("apiai")(keys.apiaiToken);
const request = require("request");

module.exports = app => {
  app.post("/api/webhook", function(req, res, next) {
    let message = req.body.text;
    console.log(message);
    let apiai = apiaiApp.textRequest(message, {
      sessionId: "gfgdgdg" // any arbitrary text
    });

    apiai.on("response", response => {
      let text = response.result.fulfillment.speech;
      let intentName = response.result.metadata.intentName;
      let action = response.result.action;
      let parameters = response.result.parameters;

      console.log(response);

      if (
        intentName === "book-appointment" ||
        intentName === "doctor-request" ||
        intentName === "Type number 4"
      ) {
        return res.send(intentName);
      } else if (intentName === "Get_Drug") {
        request(
          {
            url: `https://api.mlab.com/api/1/databases/drug/collections/drug?apiKey=${
              keys.DataBaseKey
            }`
          },
          (error, response, body) => {
            if (!error && response.statusCode == 200) {
              let drug = JSON.parse(body);
              let reply = `the drug we have are : `;
              let drugs = drug.map(item => item.name).join(", ");
              return res.send(reply + " " + drugs);
            } else {
              return res.send("No current drugs available");
            }
          }
        );
      } else if (
        action === "get-current-weather" &&
        parameters.hasOwnProperty("geo-city") &&
        parameters["geo-city"] !== ""
      ) {
        request(
          {
            url: "http://api.openweathermap.org/data/2.5/weather",
            qs: {
              appid: keys.weatherApiKey,
              q: parameters["geo-city"]
            }
          },
          (error, response, body) => {
            if (error) {
              return res.send();
            }
            let weather = JSON.parse(body);
            let reply = `The weather is ${
              weather["weather"][0]["description"]
            }`;
            return res.send(reply);
          }
        );
      } else if (intentName === "get_hospitals") {
        request(
          {
            url: `https://api.mlab.com/api/1/databases/hospitals/collections/hospitals?apiKey=${
              keys.DataBaseKey
            }`
          },
          (error, response, body) => {
            if (!error && response.statusCode == 200) {
              let hospital = JSON.parse(body);
              let reply = `The hospitals we have in our database are : `;
              let hospitals = hospital.map(item => item.name).join(", ");
              return res.send(reply + " " + hospitals);
            } else {
              return res.send("No current hospitals available");
            }
          }
        );
      } else {
        return res.send(text);
      }
    });
    apiai.on("error", error => {
      console.log(error);
    });
    apiai.end();
  });
};
