require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app =  express()
const auth = require("./app/routes/login.route.js");
const port = process.env.PORT || 3000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
     res.json({messege:'Wellcome API'});
});

app.use('/api/auth/',auth);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
