const express = require('express');
const { createSurvey, getSurveys, getSurveyById } = require('../client/controllers/surveyController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/surveys', protect, authorize(['admin']), createSurvey); // Anket oluşturma
router.get('/surveys', protect, getSurveys); // Tüm anketleri listeleme
router.get('/surveys/:id', protect, getSurveyById); // Belirli bir anketi ID ile getirme

module.exports = router;
