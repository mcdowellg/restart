'use strict';
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gpsSchema = new Schema({}, {strict:false});

module.exports = mongoose.model("GPS", gpsSchema);

// const listSchema = new Schema({}, {strict:false});

// module.exports = mongoose.model("Lists", listSchema);
