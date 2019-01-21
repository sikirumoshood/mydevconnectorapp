const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user = require('./routes/api/user');
const post = require('./routes/api/post');
const profile = require('./routes/api/profile');



//DB config

const db = require('./config/keys').mongoURI;
//Connect to mongoDB through mongoose

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("MONGODB CONNECTED SUCCESSFULLY..."))
    .catch((err) => console.log(`UNABLE TO CONNECT: ${err}`));

app.get('/', (req, res) => res.send('hello world'));

const port = process.env.PORT || 5000;

//USE ROUTES

app.use('/api/user', user);
app.use('/api/profile', profile);
app.use('/api/post', post);

app.listen(port, () => console.log(`Server running on port ${port}...`));


