'use strict';
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({}, {strict:false});

module.exports = mongoose.model("Tasks", taskSchema);