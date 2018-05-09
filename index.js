require('dotenv').config()
const express = require('express')
const app = express()
const fetch = require('node-fetch');
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.post('/', async (req, res) => {
  try {
    const data = [{ email: req.body.email }];
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`
            },
        body: JSON.stringify(data)
        };
    const response = await fetch('https://api.sendgrid.com/v3/contactdb/recipients', options);

    // console.log(response.ok, response.status, response.statusText);
    return res.send(response.statusText)
  } catch (e) {
    console.log(e);
    return res.send('There was an error');
  }
});

app.get('/favicon.ico', (req, res) =>res.sendStatus(204));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`express started on port ${port}!`))