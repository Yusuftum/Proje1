const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    survey: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    answers: [{ questionId: String, answer: String }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Response', responseSchema);
