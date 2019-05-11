/*Its assumed that you have already created a mongodb atlas cluster 
in previous exercise, Therefore, use the cluster credentials 
(username and password for mongodb atlas cluster) for this exercise */

//install mongodb using 'npm install mongoose'

// mongoose.connect('mongodb://localhost:27017/mean-db', options).then(function() {
// console.log('connected to mongodb!');
// var db = mongoose.connection;
// db.collection('posts').countDocuments().then(function(count) {
// console.log("post count: " + count);
// });
// }, function(error) {
// console.error('failed to connect to MongoDB...', error);
// });


// Load mongoose module 
const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
const { inspect } = require('util');

// Declare a variable named uri and assign MongoDB connection string
//var uri = "mongodb+srv://<username>:<password> @cluster0-0wi3e.mongodb.net/test?retryWrites=true";

// Declare a variable named option and assign optional settings

  const options = {
    // reconnectTries: Number.MAX_VALUE,
    // poolSize: 10,
    // useNewUrlParser:true
  };

// Connect MongoDB Atlas using mongoose connect method
mongoose.connect('mongodb+srv://Greg:Mcdgr2357_@clusterprwnz-gqxbj.azure.mongodb.net/PRW_NZDB')
.then(
    (err) => {
      var db = mongoose.connection;
      var collect = db.collection('events');
      collect.countDocuments().then(function(count) {
      console.log("post count: " + count);
        })
      //   .then(() => collect.aggregate([
      //       {
      //       '$lookup': {
      //         'from': 'posts', 
      //         'localField': 'title', 
      //         'foreignField': 'title', 
      //         'as': 'newDataSet'
      //       }
      //     }, {
      //       '$match': {
      //         'title': 'veniam natus officiis'
      //       }
      //     }, {
      //       '$project': {
      //         'title': 1, 
      //         'body': 1, 
      //         'newDataSet.content': 1
      //       }
      //     }, {
      //       '$unwind': {
      //         'path': '$newDataSet'
      //       }
      //     }, {
      //       '$project': {
      //         'total': {
      //           '$sum': [
      //             '$body', '$newDataSet.content'
      //           ]
      //         }
      //       }
      //       }
      //     ])
      //     .toArray())
      //     .then(results => {
      //       console.log(inspect(results, false, null))
      //     })

      console.log("Database connection established!");
      
    },
    err => {
      console.log("Error connecting Database instance due to: ", err);
    }
  );





// require any models

require("../api/models/Article");