## Health care smart chat-bot for digia hackathon 2018
## Making this kind of stuff is fun

## Creators : YI ZHUANG (Lead Dev AKA Machine)  Jose Zapata (Junior Dev AKA Human) Laura-Sofia, Jussi Steenari ,Matti valiaho.

## this is a proof of concept prototype application

## This demo is from the old version, does not work that well. Will push the new version soon.

Demo is [here](https://health-care-chat-bot.herokuapp.com)

## How it works? The general flow
`` 1. The user types in something``

`` 2. front-end makes a post request to the back-end Nodejs with what the user types``

`` 3. nodejs post that user input to our AI``

`` 4. AI analize that user input, determain our user's intention and return a response to our Nodejs back-end that includes the instruction what should we do with it?``

`` 5. Nodejs does some filtering deciding which part of these informaton from AI to be returned to our front-end.``

`` 6. Front-end responsds to the user accordingly based on the piece of information Nodejs gives us.``

`` using regex  is an alternative`` 

## Example
`` 1. User types in something like:  "i want to book appointment" or " i would like to make a reservation"``

`` 2. Then api.ai will know: this user's input wants to make an appointment. Then AI will return this intent back to nodejs which was defined by us already in the api.ai client. ``

`` 3. in node.js and the front-end.  If response.intentName==="book-appointment" do something.... else do something else.``

## Installation process  


``npm install `` in root folder and the client folder as well

if you have concurrently installed globally ``npm run dev ``   in the root folder

if not
`` npm run server `` in root folder and ``npm start `` in client folder

Use your own config. (sensitive stuff). check the config folder
``

## Features

## You can use the voice recognition  instead of typing.

## example input  (natural language flow, no need to specify, bot uses AI to learn and train it self)

1.I would like to book an appointment  (using credit card number 4242424242424242 to pay)

2. I would like to talk to a doctor

3. See a list of commands

4. I don't feel well

5. ask it anything :D

## if the project were to continue, everything must be re-made from scratch because the main node package we are using has its own limitation.
