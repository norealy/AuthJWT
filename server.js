require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app =  express()
const auth = require("./app/routes/login.route.js");
const post = require("./app/routes/post.js");
const port = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/', (req, res) => {
     res.json({messege:'Wellcome API'});
});

app.use('/api/auth/',auth);
app.use('/api/posts',post);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
