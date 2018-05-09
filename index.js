require('dotenv').config()
const axios = require('axios')
const express = require('express')
const app = express()

app.get('/', async (req, res) => {
  try {
    const fetch = require('node-fetch');
    const data = [{ email: "svsvsrv@ssrvsrbsdb.com" }];
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

app.listen(80, () => console.log('express started on port 80!'))