const questions = [
    {
      question: "Қызыл кітапқа енген ағаштар",
      options: ["Қарағай, самырсын, шетен", "Арша, қайың, қарағаш", "Жөке, емен, шырша", "Үйеңкі, терек, қандағаш"],
      correct: 3
    },
    {
      question: "Сақиналы ғаламшар",
      options: ["Сатурн", "Юпитер", "Нептун", "Уран"],
      correct: 0
    },
    {
      question: "Өрмекші неше сатыдан тұрады",
      options: ["Бес", "Төрт", "Екі", "Үш"],
      correct: 3
    },
    {
      question: "Ең жақсы жылу оқшаулағыш",
      options: ["Ағаш", "Темір", "Пластик", "Шыны"],
      correct: 1
    },
    {
      question: "Қандай денелер жарықты көбірек өткізеді",
      options: ["Мөлдір", "Жартылай мөлдір", "Қалың", "Боялған"],
      correct: 0
    },
    {
      question: "Өсімдікте не деп аталатын бояғыш зат болады",
      options: ["Хлорофилл", "Антоциан", "Пигмент", "Каротин"],
      correct: 2
    },
    {
      question: "Қандай шөптесін өсімдік тұқымдары жануарлардың тұяқтарына жабысады",
      options: ["Қызғалдақ", "Шырғанақ", "Жусан", "Жолжелкен"],
      correct: 3
    },
    {
      question: "-ы, -і жалғау қосқанда өзгеретін сөз",
      options: ["тірек", "түлкі", "серік", "күрек"],
      correct: 3
    },
    {
      question: "Өлең дегеніміз не?",
      options: ["Хабарландыру", "Көркем әңгіме", "Ғылыми мәтін", "Буын өлшемі мен ұйқасқа құрылатын сөз"],
      correct: 3
    },
    {
      question: "\"Күн шыққанда\" өлеңінің авторы",
      options: ["Жамбыл Жабаев", "Ілияс Жансүгіров", "Мұхтар Әуезов", "Сәкен Сейфуллин"],
      correct: 1
    }
  ];
  
  let current = 0;
  function showQuestion() {
    const block = document.getElementById("question");
    block.innerHTML = `
      <div class="question-block">
        <h2>Бастауыш сынып: ${current + 1} - сұрақ</h2>
        <p>${questions[current].question}</p>
        <div class="options">
          ${questions[current].options.map((opt, idx) =>
            `<button onclick="checkAnswer(${idx}, this)">${String.fromCharCode(65 + idx)}. ${opt}</button>`).join("")}
        </div>
      </div>
    `;
  }
  function checkAnswer(selected, btn) {
    const correct = questions[current].correct;
    const buttons = document.querySelectorAll(".options button");
    buttons.forEach((b, i) => {
      b.disabled = true;
      if (i === correct) b.classList.add("correct");
      else if (i === selected) b.classList.add("incorrect");
    });
    setTimeout(() => {
      current++;
      if (current < questions.length) showQuestion();
      else document.getElementById("question").innerHTML = "<h2>Тест аяқталды</h2>";
    }, 1000);
  }
  window.onload = showQuestion;
  