const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    optionType: {
        type: String,
        enum: ['Text', 'Image URL', 'Text & Image URL'],
        required: true,
    },
    options: [{
        type: String,
        required: true,
    }],
    correctAnswer: {
        type: String,
        required: true,
    },
});

const QuizSchema = new mongoose.Schema({
    quizName: {
        type: String,
        required: true,
    },
    quizType: {
        type: String,
        enum: ['Q&A', 'Poll'],
        required: true,
    },
    questions: [QuestionSchema], // Array of questions
    timer: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserCollection',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const QuizCollection = mongoose.model('QuizCollection', QuizSchema);

module.exports = QuizCollection;