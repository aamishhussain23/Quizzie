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

        // Create a copy of each quiz and remove the correctAnswer field from each question
        let userQuizzesCopy = userQuizzes.map(quiz => {
            let quizCopy = quiz.toObject();
            quizCopy.questions.forEach(question => {
                delete question.correctAnswer;
            });
            return quizCopy;
        });

        res.status(200).json({
            success: true,
            totalQuiz : userQuizzesCopy.length,
            quizzes: userQuizzesCopy
        });

    } catch (error) {
        console.error("Error in getUserQuizzes:", error);
        return next(new ErrorHandler(error.message, 500));
    }
};



const updateQuiz = async (req, res, next) => {
    const { quizId } = req.params;
    const { quizName, questions, timer } = req.body;

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

        // Updating the quiz name and timer
        quizToUpdate.quizName = quizName;
        quizToUpdate.timer = timer;

        // Updating all questions
        quizToUpdate.questions = questions.map(question => ({
            ...question,
            question: capitalizeFirstLetterOfEachWord(question.question.toLowerCase()),
        }));

        // Saving the updated quiz
        const updatedQuiz = await quizToUpdate.save();

        res.status(200).json({
            success: true,
            message: `Quiz updated successfully`,
        });
    } catch (error) {
        console.error("Error in updateQuiz:", error);
        return next(new ErrorHandler(error.message, 500));
    }
};



const getQuiz = async (req, res, next) => {
    const { quizId } = req.params;

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

        quiz.impressions += 1;
        await quiz.save();

        // Create a copy of the quiz object
        let quizCopy = quiz.toObject();

        // Remove the correctAnswer field from each question
        quizCopy.questions.forEach(question => {
            delete question.correctAnswer;
        });

        res.status(200).json({
            success: true,
            quiz: quizCopy,
        });
    } catch (error) {
        console.error("Error in getQuestionAtIndex:", error);
        return next(new ErrorHandler(error.message, 500));
    }
};


const getQuizForUpdate = async (req, res, next) => {
    const { quizId } = req.params;

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

        res.status(200).json({
            success: true,
            quiz
        });
    } catch (error) {
        console.error("Error in getQuestionAtIndex:", error);
        return next(new ErrorHandler(error.message, 500));
    }
};


const checkAnswer = async (req, res, next) => {
    const { quizId } = req.body;
    const questions = req.body.questions;

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

        let totalScore = 0; // Initialize total score

        // Checking each question's answer
        for (const question of questions) {
            const { _id, userAnswer } = question;
            const dbQuestion = quiz.questions.find(q => q._id.toString() === _id);

            if (!dbQuestion) {
                // Question not found
                return res.status(404).json({
                    success: false,
                    message: "Question not found",
                });
            }

            // Incrementing the total participants count for the question
            dbQuestion.totalParticipants += 1;

            // Checking if the user answer is correct
            const correctAnswer = dbQuestion.correctAnswer;
            if (correctAnswer.toLowerCase() === userAnswer.toLowerCase()) {
                // Incrementing the correct count
                dbQuestion.correctCount += 1;
                totalScore += 1; // Increment total score of user
            } else {
                // Incrementing the incorrect count
                dbQuestion.incorrectCount += 1;
            }
        }

        await quiz.save();

        res.status(200).json({
            success: true,
            message: "Saved Successfully",
            totalScore
        });
    } catch (error) {
        console.error("Error in check-answer:", error);
        return next(new ErrorHandler(error.message, 500));
    }
};




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



module.exports = {createQuiz, getAllQuizes, updateQuiz, getQuiz, getQuizForUpdate, checkAnswer, deleteQuiz}