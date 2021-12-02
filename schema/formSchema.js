const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const formSchema = new Schema({
    formSchema: { type: Object, required: true },
    name: { type: String, required: true, index: true, unique: true },
})

module.exports.formModel = model("CMS1_Forms", formSchema);