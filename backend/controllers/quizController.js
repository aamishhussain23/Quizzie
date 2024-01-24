const {ErrorHandler} = require('../utils/ErrorHandler')
const QuizCollection = require('../models/QuizModel')


const capitalizeFirstLetterOfEachWord = (sentence) => {
    const words = sentence.split(' ');

    for (let i = 0; i < words.length; i++) {
        // Capitalize the first letter of each word
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    return words.join(' ');
};

const createQuiz = async (req, res, next) => {
    const { quizName, quizType, questions, timer } = req.body;

    try {
        // Capitalize the first letter of each word in quizName
        const formattedQuizName = capitalizeFirstLetterOfEachWord(quizName.toLowerCase());

        // Creating a new quiz/poll
        const newQuiz = await QuizCollection.create({
            quizName: formattedQuizName,
            quizType,
            questions: questions.map((question) => ({
                ...question,
                question: capitalizeFirstLetterOfEachWord(question.question.toLowerCase()), // Capitalize each question
            })),
            timer,
            user: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: `${formattedQuizName} ${quizType} created successfully`,
            quizId: newQuiz._id,
        });
    } catch (error) {
        console.error("Error in createQuiz:", error);
        return next(new ErrorHandler(error.message, 500));
    }
};


const getAllQuizes = async (req, res, next) => {
    const userId = req.params.id;

    try {
        // Retrieve quizzes for the specified user
        const userQuizzes = await QuizCollection.find({ user: userId });

        res.status(200).json({
            success: true,
            totalQuiz : userQuizzes.length,
            quizzes: userQuizzes
        });

    } catch (error) {
        console.error("Error in getUserQuizzes:", error);
        return next(new ErrorHandler(error.message, 500));
    }
}


const updateQuiz = async (req, res, next) => {
    const { quizId, index } = req.params;
    const { questions, timer } = req.body;

    try {
        // Finding the quiz 
        const quizToUpdate = await QuizCollection.findById(quizId);

        if (!quizToUpdate) {
            // Quiz not found
            return res.status(404).json({
                success: false,
                message: "Quiz not found",
            });
        }

        // Ensuring the provided index is valid or not
        const questionIndex = parseInt(index, 10);
        if (isNaN(questionIndex) || questionIndex < 0 || questionIndex >= quizToUpdate.questions.length) {
            return res.status(400).json({
                success: false,
                message: "Invalid question",
            });
        }

        // Updating the question directly using the provided index
        quizToUpdate.questions[questionIndex] = {
            ...quizToUpdate.questions[questionIndex],
            question: capitalizeFirstLetterOfEachWord(questions[0].question.toLowerCase()), 
            optionType: questions[0].optionType,
            options: questions[0].options,
            correctAnswer: questions[0].correctAnswer,
        };

        // Updating the timer
        quizToUpdate.timer = timer;

        // Saving the updated quiz
        const updatedQuiz = await quizToUpdate.save();

        res.status(200).json({
            success: true,
            message: `Question updated successfully`,
        });
    } catch (error) {
        console.error("Error in updateQuiz:", error);
        return next(new ErrorHandler(error.message, 500));
    }
};


const getQuestion = async (req, res, next) => {
    const { quizId, index } = req.params;

    try {
        // Finding the quiz 
        const quiz = await QuizCollection.findById(quizId);

        if (!quiz) {
            // Quiz not found
            return res.status(404).json({
                success: false,
                message: "Quiz not found",
            });
        }

        // Ensuring the provided index is valid or not
        const questionIndex = parseInt(index, 10);
        if (isNaN(questionIndex) || questionIndex < 0 || questionIndex >= quiz.questions.length) {
            return res.status(400).json({
                success: false,
                message: "Invalid question index",
            });
        }

        // Retrieving the question from "questions array" of specific index
        const questions = quiz.questions[questionIndex];

        res.status(200).json({
            success: true,
            quizName: quiz.quizName,
            quizType: quiz.quizType,
            timer: quiz.timer,
            questions,
        });
    } catch (error) {
        console.error("Error in getQuestionAtIndex:", error);
        return next(new ErrorHandler(error.message, 500));
    }
}


const deleteQuiz = async (req, res, next) => {
    const userId = req.user._id;
    const quizId = req.params.id;

    try {
        // Checking if the quiz exists for the specified user or not
        const existingQuiz = await QuizCollection.findOne({ _id: quizId, user: userId });

        if (!existingQuiz) {
            return next(new ErrorHandler("Quiz not found", 404));
        }

        // Delete the quiz
        await existingQuiz.deleteOne();

        res.status(200).json({
            success: true,
            message: "Quiz deleted successfully"
        });
    } catch (error) {
        console.error("Error in deleteQuiz:", error);
        return next(new ErrorHandler(error.message, 500));
    }
}



module.exports = {createQuiz, getAllQuizes, updateQuiz, getQuestion, deleteQuiz}