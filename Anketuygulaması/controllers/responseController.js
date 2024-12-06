const Response = require('../../models/Response');
const Survey = require('../../models/Survey');

exports.addResponse = async (req, res) => {
    const { surveyId } = req.params;
    const { answers } = req.body;
    const userId = req.user._id;

    try {
        const survey = await Survey.findById(surveyId);
        if (!survey) {
            return res.status(404).json({ error: 'Survey not found' });
        }

        // Kullanıcının bu ankete daha önce yanıt verip vermediğini kontrol et
        const existingResponse = await Response.findOne({ survey: surveyId, user: userId });
        if (existingResponse) {
            return res.status(400).json({ error: 'You have already submitted a response to this survey.' });
        }

        // Her bir yanıtı kontrol et
        for (let answer of answers) {
            const question = survey.questions.id(answer.questionId);
            if (!question) {
                return res.status(400).json({ error: `Question with ID ${answer.questionId} not found in this survey` });
            }

            // Büyük/küçük harf duyarlılığını dikkate alarak geçerli seçenekleri kontrol et
            const validOptions = question.options.map(option => option.toLowerCase());
            const givenAnswer = answer.answer.toLowerCase();
            if (!validOptions.includes(givenAnswer)) {
                return res.status(400).json({ error: `Invalid answer "${answer.answer}" for question "${question.text}". Valid options are: ${question.options.join(', ')}` });
            }
        }

        const response = new Response({ survey: surveyId, user: userId, answers });
        await response.save();
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getResponsesBySurveyId = async (req, res) => {
    try {
        const responses = await Response.find({ survey: req.params.surveyId });
        res.json(responses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllResponses = async (req, res) => {
    try {
        const responses = await Response.find();
        res.json(responses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
