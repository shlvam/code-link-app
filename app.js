const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// setting view to ejs
app.set('view engine', 'ejs');
app.set('views', 'views');      // key, folder_name

// setting all variables to be used later in app.js
const MONGODB_URI= `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.8umkl.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

// getting all routes/middleware to app.js-> later to be called as required
const textRoutes = require('./routes/text');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(textRoutes);

// connecting with database to be used
// keeping the app to listen requests always
mongoose
  .connect(MONGODB_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useFindAndModify: false   // for `findOneAndUpdate()` and `findOneAndDelete()` to work without DeprecationWarning
    }
  )
  .then(result=>{
    console.log("connected with database");
    app.listen(8080);
  })
  .catch(err => {
    console.log(err);
  });
