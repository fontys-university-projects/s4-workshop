const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path');
const app = express();

require('dotenv').config();


app.use(bodyParser.json())

const publicVapidKey = process.env.VAPID_PUBLIC;
const privateVapidKey = process.env.VAPID_PRIVATE;
const email = process.env.EMAIL_ADDRESS;

webpush.setVapidDetails('mailto:' +  email, publicVapidKey, privateVapidKey);

const corsOrigin = process.env.CORS

var corsOptions = {
  origin: corsOrigin
};

app.use(cors(corsOptions))

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', corsOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post('/subscribe', (req, res)=>{
  const subscription = req.body;
  res.status(201).json({})
  const payload = JSON.stringify({title: 'Section.io Push Notification' });
  webpush.sendNotification(subscription, payload).catch(err=> console.error(err));
})

const port = process.env.PORT;

app.listen(port, () => console.log(`Server started on port ${port}`));