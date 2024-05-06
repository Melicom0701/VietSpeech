const express = require('express');
require('dotenv').config();
const multer = require('multer');
const app = express();
const port = 3000;
const indexRouter = require('./routes/index');
const cors = require('cors');
app.use(cors());

//turn of cors



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', indexRouter);


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
    }
);
