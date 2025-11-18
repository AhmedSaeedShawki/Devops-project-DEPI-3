const mongoose = require("mongoose")
const urlSchema = new mongoose.Schema({
      long_url: String,
      shorten_text: String,
      short_url: String,
});

const genCountSchema = new mongoose.Schema({
    count: Number
});

const redCountSchema = new mongoose.Schema({
    count: Number
});

const Url = mongoose.model("Url", urlSchema);
const GenCount = mongoose.model("GenCount", genCountSchema);
const RedCount = mongoose.model("RedCount", redCountSchema);

module.exports = { Url, GenCount, RedCount };