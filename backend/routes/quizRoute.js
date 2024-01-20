const express = require('express')
const {createQuiz, getAllQuizes, updateQuiz, getQuestion, deleteQuiz} = require('../controllers/quizController')
const isAuthenticated = require('../middlewares/auth')

const router = express.Router()

router.post('/create-quiz', isAuthenticated, createQuiz)
router.get('/getAllQuizes/:id', isAuthenticated, getAllQuizes)
router.put('/update-quize/:quizId/:index', isAuthenticated, updateQuiz)
router.get('/getSpecific-question/:quizId/:index', isAuthenticated, getQuestion)
router.delete('/delete-quize/:id', isAuthenticated, deleteQuiz)

module.exports = router