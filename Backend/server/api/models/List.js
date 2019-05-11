'use strict';
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({}, {strict:false});

module.exports = mongoose.model("Lists", listSchema);
