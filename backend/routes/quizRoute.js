const express = require('express')
const {createQuiz, getAllQuizes, updateQuiz, getQuiz, deleteQuiz, checkAnswer} = require('../controllers/quizController')
const isAuthenticated = require('../middlewares/auth')

const router = express.Router()

router.post('/create-quiz', isAuthenticated, createQuiz)
router.get('/getAllQuizes/:id', isAuthenticated, getAllQuizes)
router.put('/update-quize/:quizId', isAuthenticated, updateQuiz)
router.get('/getQuiz/:quizId', getQuiz)
router.delete('/delete-quize/:id', isAuthenticated, deleteQuiz)
router.post('/check-answer', checkAnswer)

module.exports = router