const quizData = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "JQuery", "CSS", "XML"],
        correct: 2
    },
    {
        question: "Which is not a JavaScript Framework?",
        options: ["Python Script", "JQuery", "Django", "NodeJS"],
        correct: 2
    }
];

let currentIndex = 0;
let score = 0;
let timeLeft = 60;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreBox = document.getElementById("score-box");
const timerBox = document.getElementById("timer");
const navBox = document.querySelector(".navigations");

function showQuestion(index) {
    const q = quizData[index];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";
    q.options.forEach((option, i) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => selectAnswer(i);
        optionsEl.appendChild(btn);
    });
}

function selectAnswer(selectedIndex) {
    const correctIndex = quizData[currentIndex].correct;
    if (selectedIndex === correctIndex) {
        score++;
        scoreBox.textContent = `Score: ${score}`;
    }
    nextQuestion();
}

function nextQuestion() {
    if (currentIndex < quizData.length - 1) {
        currentIndex++;
        showQuestion(currentIndex);
    } else {
        endQuiz();
    }
}

function prevQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        showQuestion(currentIndex);
    }
}

function startTimer() {
    const timer = setInterval(() => {
        timeLeft--;
        timerBox.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}


document.getElementById("next").onclick = nextQuestion;
document.getElementById("prev").onclick = prevQuestion;

showQuestion(currentIndex);
startTimer();

function restartQuiz() {
    currentIndex = 0;
    score = 0;
    timeLeft = 60;
    scoreBox.textContent = `Score: ${score}`;
    timerBox.textContent = `Time Left: ${timeLeft}s`;
    navBox.style.display = "block";
    timerBox.style.display = "block";
    document.getElementById("restart").style.display = "none";
    showQuestion(currentIndex);
    startTimer();
}
function endQuiz() {
    clearInterval(timer); // stop the timer
    questionEl.textContent = "🎉 Quiz Completed!";
    optionsEl.innerHTML = `<h3>Your final score is ${score}/${quizData.length}</h3>`;
    navBox.style.display = "none";
    timerBox.style.display = "none";
    document.getElementById("restart").style.display = "inline-block";
}
document.getElementById("end").onclick = () => {
    if (confirm("Are you sure you want to end the quiz now?")) {
        endQuiz();
    }
};
