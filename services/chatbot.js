var prompt = require("prompt-sync")();

var express = require("express"); // app server
var bodyParser = require("body-parser"); // parser for post requests
var Conversation = require("watson-developer-cloud/conversation/v1"); // watson sdk

var app = express();
// this is not in used!! just for testing!!!!!!!!!

app.use(express.static("./public"));
app.use(bodyParser.json());
var workspace_id = "87c57bee-2c6a-4921-9210-168e8d364fee";

module.exports = app => {
  var conversation = new Conversation({
    username: "64f66201-31d5-4001-8ffd-5b576ee39b95",
    password: "eteBPxcAzj5J",
    version_date: "2017-05-26"
  });

  app.post("/api/message", function(req, res) {
    var workspace = "87c57bee-2c6a-4921-9210-168e8d364fee";
    if (!workspace) {
      return res.json({
        output: {
          text:
            "The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the " +
            '<a href="https://github.com/watson-developer-cloud/conversation-simple">README</a> documentation on how to set this variable. <br>' +
            "Once a workspace has been defined the intents may be imported from " +
            '<a href="https://github.com/watson-developer-cloud/conversation-simple/blob/master/training/car_workspace.json">here</a> in order to get a working application.'
        }
      });
    }
    var payload = {
      workspace_id: workspace,
      context: req.body.context || {},
      input: req.body.input || {}
    };

    conversation.message(payload, function(err, data) {
      if (err) {
        return res.status(err.code || 500).json(err);
      }
      return res.json(updateMessage(payload, data));
    });
  });

  /**
   * Updates the response text using the intent confidence
    @param  {Object} input
    @param  {Object} response
    @return {Object}
   */
  function updateMessage(input, response) {
    var responseText = null;
    if (!response.output) {
      response.output = {};
    } else {
      return response;
    }
    if (response.intents && response.intents[0]) {
      var intent = response.intents[0];
      // Depending on the confidence of the response the app can return different messages.
      // The confidence will vary depending on how well the system is trained. The service will always try to assign
      // a class/intent to the input. If the confidence is low, then it suggests the service is unsure of the
      // user's intent . In these cases it is usually best to return a disambiguation message
      // ('I did not understand your intent, please rephrase your question', etc..)
      if (intent.confidence >= 0.75) {
        responseText = "I understood your intent was " + intent.intent;
      } else if (intent.confidence >= 0.5) {
        responseText = "I think your intent was " + intent.intent;
      } else {
        responseText = "I did not understand your intent";
      }
    }
    response.output.text = responseText;
    return response;
  }
};
