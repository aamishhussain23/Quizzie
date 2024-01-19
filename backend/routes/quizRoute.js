const express = require('express')
const {createQuiz, getAllQuizes, updateQuiz, getQuestion, deleteQuestion, deleteOption, deleteQuiz} = require('../controllers/quizController')
const isAuthenticated = require('../middlewares/auth')

const router = express.Router()

router.post('/create-quiz', isAuthenticated, createQuiz)
router.get('/getAllQuizes/:id', isAuthenticated, getAllQuizes)
router.put('/update-quize/:quizId/:index', isAuthenticated, updateQuiz)
router.get('/getSpecific-question/:quizId/:index', isAuthenticated, getQuestion)
router.delete('/delete-specific-question/:quizId/:quesIndex', isAuthenticated, deleteQuestion)
router.delete('/delete-specific-option/:quizId/:quesIndex/:optionIndex', isAuthenticated, deleteOption)
router.delete('/delete-quize/:id', isAuthenticated, deleteQuiz)

module.exports = router