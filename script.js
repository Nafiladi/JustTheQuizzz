// Save quiz to localStorage
function saveQuizToStorage(quizName, questions) {
    let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    quizzes.push({ name: quizName, questions });
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
}

// Show Create Quiz Form
function showCreateQuiz() {
    document.getElementById('quiz-container').innerHTML = `
        <h2>Create Your Own Quiz</h2>
        <input type="text" id="quiz-name" placeholder="Enter quiz name" />
        <input type="text" id="question" placeholder="Enter your question" />
        <input type="text" id="answer" placeholder="Enter the answer" />
        <button onclick="addQuestion()">Add Question</button>
        <button onclick="saveQuiz()">Save Quiz</button>
    `;
}

// Add question to current quiz
let currentQuiz = [];
function addQuestion() {
    const question = document.getElementById('question').value;
    const answer = document.getElementById('answer').value;
    if (question && answer) {
        currentQuiz.push({ question, answer });
        alert('Question added!');
        document.getElementById('question').value = '';
        document.getElementById('answer').value = '';
    } else {
        alert('Please fill in both question and answer.');
    }
}

// Save the quiz and return to the lobby
function saveQuiz() {
    const quizName = document.getElementById('quiz-name').value;
    if (quizName && currentQuiz.length > 0) {
        saveQuizToStorage(quizName, currentQuiz);
        alert('Quiz saved!');
        currentQuiz = []; // Clear current quiz questions
        showLobby();
    } else {
        alert('Please enter a quiz name and add at least one question.');
    }
}

// Show the quiz lobby
function showLobby() {
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    let lobbyHtml = '<h2>Quiz Lobby</h2>';
    quizzes.forEach((quiz, index) => {
        lobbyHtml += `
            <div class="quiz-card">
                <h3>${quiz.name}</h3>
                <button onclick="startQuiz(${index})">Start Quiz</button>
            </div>
        `;
    });
    if (quizzes.length === 0) {
        lobbyHtml += '<p>No quizzes available. Please create one.</p>';
    }
    document.getElementById('quiz-lobby').innerHTML = lobbyHtml;
}

// Start the quiz from the lobby
function startQuiz(index) {
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const quiz = quizzes[index];
    let currentQuestionIndex = 0;
    let correctAnswers = 0;

    function askQuestion() {
        const question = quiz.questions[currentQuestionIndex].question;
        const userAnswer = prompt(${question}\nEnter your answer:);
        if (userAnswer.toLowerCase() === quiz.questions[currentQuestionIndex].answer.toLowerCase()) {
            correctAnswers++;
            alert('Correct!');
        } else {
            alert('Incorrect. The correct answer was: ' + quiz.questions[currentQuestionIndex].answer);
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < quiz.questions.length) {
            askQuestion();
        } else {
            alert(Quiz finished! You got ${correctAnswers} out of ${quiz.questions.length} correct.);
        }
    }
    askQuestion();
}

// Initialize by showing the lobby or the home page
window.onload = () => {
    showLobby(); // Always show the lobby on load
};
