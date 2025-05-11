const questions = [
    {
        question: "Қызыл кітапқа енген ағаштар",
        options: ["Қарағай, самырсын, шетен", "Арша, қайың, қарағаш", "Жөке, емен, шырша", "Үйеңкі, терек, қандағаш"],
        answer: 3
    },
    {
        question: "Сақиналы ғаламшар",
        options: ["Сатурн", "Юпитер", "Нептун", "Уран"],
        answer: 0
    },
    // қалған 8 сұрақ дәл осылай енгізіледі...
];

let current = 0;
let score = 0;
let userAnswers = [];

function renderQuestion() {
    const box = document.getElementById("question-box");
    box.innerHTML = `<h3>Бастауыш сынып: ${current + 1} - сұрақ</h3>
                     <p>${questions[current].question}</p>`;
    questions[current].options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.innerText = String.fromCharCode(65 + i) + ". " + opt;
        btn.onclick = () => {
            userAnswers[current] = i;
            nextButton.style.display = "block";
            finishButton.style.display = "block";
        };
        box.appendChild(btn);
        box.appendChild(document.createElement("br"));
    });
}

function showResults() {
    const box = document.getElementById("question-box");
    const result = document.getElementById("result-box");
    box.innerHTML = "";
    result.style.display = "block";
    result.innerHTML = `<h3>Нәтиже:</h3>`;
    userAnswers.forEach((ans, i) => {
        const isCorrect = ans === questions[i].answer;
        if (isCorrect) score++;
        result.innerHTML += `<p>Сұрақ ${i + 1}: ${isCorrect ? "✅ Дұрыс" : "❌ Қате"}</p>`;
    });
    result.innerHTML += `<h4>Барлығы: ${score} / ${questions.length}</h4>`;
    document.getElementById("review-button").style.display = "block";
}

function reviewMistakes() {
    const box = document.getElementById("question-box");
    const result = document.getElementById("result-box");
    result.style.display = "none";
    box.innerHTML = "";
    questions.forEach((q, i) => {
        const user = userAnswers[i];
        const correct = q.answer;
        box.innerHTML += `<p><b>${i + 1}. ${q.question}</b></p>`;
        q.options.forEach((opt, j) => {
            const color = j === correct ? "correct" : (j === user ? "incorrect" : "");
            box.innerHTML += `<p class="${color}">${String.fromCharCode(65 + j)}. ${opt}</p>`;
        });
    });
}

const nextButton = document.getElementById("next-button");
const finishButton = document.getElementById("finish-button");

nextButton.onclick = () => {
    current++;
    if (current < questions.length) {
        renderQuestion();
        nextButton.style.display = "none";
        finishButton.style.display = "none";
    }
};

finishButton.onclick = showResults;

renderQuestion();
  