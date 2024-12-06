const Survey = require('../../models/Survey');

//anket oluşturmak için kullanılan kodlar burada 
exports.createSurvey = async (req, res) => {
    const { title, description, questions } = req.body;
    try {
        const survey = new Survey({ title, description, questions });
        await survey.save();
        res.status(201).json(survey);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//anketleri getirmek için kullanılan kodlar burada 
exports.getSurveys = async (req, res) => {
    try {
        const surveys = await Survey.find();
        res.json(surveys);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//anketi İD ile getirmek için kullanılan kodlar burada 
exports.getSurveyById = async (req, res) => {
    try {
        const survey = await Survey.findById(req.params.id);
        if (!survey) {
            return res.status(404).json({ error: 'Survey not found' });
        }
        res.json(survey);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
