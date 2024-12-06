const express = require('express');
const { addResponse, getResponsesBySurveyId, getAllResponses } = require('../client/controllers/responseController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/responses/:surveyId', protect, addResponse); // Yanıt ekleme
router.get('/responses/:surveyId', protect, getResponsesBySurveyId); // Belirli bir anketin yanıtlarını listeleme
router.get('/responses', protect, getAllResponses); // Tüm yanıtları listeleme

module.exports = router;
