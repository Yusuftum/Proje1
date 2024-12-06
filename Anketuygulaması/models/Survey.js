const mongoose = require('mongoose');

//anket şeması
const surveySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: [{ text: String, options: [String] }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Survey', surveySchema);
