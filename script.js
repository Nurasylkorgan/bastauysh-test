// script.js

const questions = [
    {
      question: "Қызыл кітапқа енген ағаштар",
      options: [
        "Қарағай, самырсын, шетен",
        "Арша, қайың, қарағаш",
        "Жөке, емен, шырша",
        "Үйеңкі, терек, қандағаш"
      ],
      correct: 3
    },
    {
      question: "Сақиналы ғаламшар",
      options: ["Сатурн", "Юпитер", "Нептун", "Уран"],
      correct: 0
    },
    // ... тағы сұрақтар осылай жалғасады
  ];
  
  let current = 0;
  let userAnswers = Array(questions.length).fill(null);
  
  const questionArea = document.getElementById("questionArea");
  const questionNav = document.getElementById("questionNav");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const endTestBtn = document.getElementById("endTestBtn");
  const confirmModal = document.getElementById("confirmModal");
  const resultsModal = document.getElementById("resultsModal");
  const reviewMistakes = document.getElementById("reviewMistakes");
  const questionListBtn = document.getElementById("questionListBtn");
  const questionListModal = document.getElementById("questionListModal");
  
  function renderQuestion(index) {
    const q = questions[index];
    questionArea.innerHTML = `
      <h3>${index + 1}-сұрақ:</h3>
      <p>${q.question}</p>
      <div class="options">
        ${q.options
          .map((opt, i) => {
            let cls = "";
            if (userAnswers[index] !== null) {
              if (i === q.correct) cls = "correct";
              else if (i === userAnswers[index]) cls = "incorrect";
            }
            return `<button class="${cls}" onclick="selectOption(${i})">${String.fromCharCode(
              65 + i
            )}. ${opt}</button>`;
          })
          .join("")}
      </div>
    `;
    renderNav();
  }
  
  function renderNav() {
    questionNav.innerHTML = `${current + 1} / ${questions.length}`;
  }
  
  function selectOption(i) {
    userAnswers[current] = i;
    renderQuestion(current);
  }
  
  prevBtn.onclick = () => {
    if (current > 0) {
      current--;
      renderQuestion(current);
    }
  };
  
  nextBtn.onclick = () => {
    if (current < questions.length - 1) {
      current++;
      renderQuestion(current);
    }
  };
  
  endTestBtn.onclick = () => {
    confirmModal.classList.remove("hidden");
  };
  
  document.getElementById("cancelEndTest").onclick = () => {
    confirmModal.classList.add("hidden");
  };
  
  document.getElementById("confirmEndTest").onclick = () => {
    confirmModal.classList.add("hidden");
    showResult();
  };
  
  document.getElementById("closeResults").onclick = () => {
    resultsModal.classList.add("hidden");
  };
  
  function showResult() {
    resultsModal.classList.remove("hidden");
    const correct = userAnswers.filter((a, i) => a === questions[i].correct).length;
    document.getElementById("correctCount").textContent = correct;
    document.getElementById("totalCount").textContent = questions.length;
  }
  
  reviewMistakes.onclick = () => {
    questions.forEach((q, i) => {
      if (userAnswers[i] === q.correct) userAnswers[i] = null;
    });
    current = 0;
    resultsModal.classList.add("hidden");
    renderQuestion(current);
  };
  
  questionListBtn.onclick = () => {
    questionListModal.classList.remove("hidden");
    const grid = document.getElementById("questionGrid");
    grid.innerHTML = "";
    for (let i = 0; i < questions.length; i++) {
      const btn = document.createElement("button");
      btn.textContent = i + 1;
      btn.onclick = () => {
        current = i;
        questionListModal.classList.add("hidden");
        renderQuestion(i);
      };
      grid.appendChild(btn);
    }
  };
  
  document.getElementById("closeList").onclick = () => {
    questionListModal.classList.add("hidden");
  };
  
  window.onload = () => {
    renderQuestion(current);
  };
  