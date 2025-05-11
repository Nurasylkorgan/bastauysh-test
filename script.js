/* Сұрақтар мәліметтері (текст, жауаптар, дұрыс индекс) */
const questions = [
  {
    text: "Қызыл кітапқа енген ағаштар?",
    answers: [
      "Қарағай, самырсын, шетен",
      "Арша, қайың, қарағаш",
      "Жөке, емен, шырша",
      "Үйеңкі, терек, қандағаш"
    ],
    correct: 3
  },
  {
    text: "Қазақстанның астанасы қай қала?",
    answers: [
      "Алматы",
      "Шымкент",
      "Ақтау",
      "Астана"
    ],
    correct: 3
  },
  {
    text: "2 + 2 қанша?",
    answers: [
      "3",
      "4",
      "22",
      "5"
    ],
    correct: 1
  },
  {
    text: "Дүниежүзінде ең үлкен мұхит қайсы?",
    answers: [
      "Атлант мұхиты",
      "Тынық мұхиты",
      "Үнді мұхиты",
      "Солтүстік Мұзды мұхит"
    ],
    correct: 1
  },
  {
    text: "Қазақстан туының түсі қандай?",
    answers: [
      "Көк",
      "Қызыл",
      "Жасыл",
      "Сары"
    ],
    correct: 0
  },
  {
    text: "Аптаның үшінші күні қалай аталады?",
    answers: [
      "Дүйсенбі",
      "Сейсенбі",
      "Сәрсенбі",
      "Бейсенбі"
    ],
    correct: 2
  },
  {
    text: "HTML толық атауы қалай ашылады?",
    answers: [
      "Hyperlinks and Text Markup Language",
      "Hyper Text Makeup Language",
      "Hyper Text Markup Language",
      "Home Tool Markup Language"
    ],
    correct: 2
  },
  {
    text: "Бір жылда неше ай бар?",
    answers: [
      "10",
      "12",
      "11",
      "13"
    ],
    correct: 1
  },
  {
    text: "Адам денесінде неше сүйек бар?",
    answers: [
      "206",
      "201",
      "260",
      "240"
    ],
    correct: 0
  },
  {
    text: "Қазақстанның Тәуелсіздік күні қашан?",
    answers: [
      "16 желтоқсан",
      "1 мамыр",
      "30 тамыз",
      "25 қазан"
    ],
    correct: 0
  }
];
const totalQuestions = questions.length;
let userAnswers = Array(totalQuestions).fill(null);  // әр сұраққа пайдаланушы жауабы (null – жауап берілмеген)
let currentQuestionIndex = 0;  // ағымдағы сұрақтың индексы (0-ден басталады)
let reviewMode = false;       // қателерді қарау режимі жүріп жатыр ма
let mistakes = [];            // қате кеткен сұрақтардың индекстері
let currentReviewIndex = 0;   // қателерді қарау режимінде ағымдағы сұрақтың индексы (mistakes тізіміне сәйкес)

/* Қажетті элементтерді DOM-нан алу */
const navElem = document.getElementById('nav');
const questionTextElem = document.getElementById('question-text');
const answersElem = document.getElementById('answers');
const feedbackElem = document.getElementById('feedback');
const finishBtn = document.getElementById('finish-btn');
const nextBtn = document.getElementById('next-btn');
const resultSection = document.getElementById('result-section');
const correctCountElem = document.getElementById('correct-count');
const wrongCountElem = document.getElementById('wrong-count');
const retryBtn = document.getElementById('retry-btn');
const closeBtn = document.getElementById('close-btn');
const modalOverlay = document.getElementById('modal-overlay');
const modalConfirm = document.getElementById('modal-confirm');
const modalCancel = document.getElementById('modal-cancel');
const quizSection = document.getElementById('quiz-section');

/* Жоғарғы сұрақ навигациясын құру (1-ден 10-ға дейін түймелер) */
const letters = ["A", "B", "C", "D"];  // жауаптарды әріппен белгілеу үшін
for (let i = 1; i <= totalQuestions; i++) {
  const span = document.createElement('span');
  span.className = 'nav-num';
  span.innerText = i;
  span.addEventListener('click', () => {
    if (!reviewMode) {               // тек негізгі тест режимінде ауысуға рұқсат
      currentQuestionIndex = i - 1;
      showQuestion();
    }
  });
  navElem.appendChild(span);
}

/* Берілген индекстегі сұрақты көрсету функциясы */
function showQuestion() {
  // Егер reviewMode қосулы болса, mistakes тізімінен индекс аламыз, әйтпесе currentQuestionIndex
  let qIndex = reviewMode ? mistakes[currentReviewIndex] : currentQuestionIndex;
  let question = questions[qIndex];
  // Сұрақ мәтінін көрсету
  questionTextElem.innerText = question.text;
  // Қате/жауап бермеген туралы хабарламаны әдепкіде жасыру
  feedbackElem.classList.add('hidden');
  feedbackElem.innerText = '';
  // Алдыңғы жауап элементтерін тазалау
  answersElem.innerHTML = '';
  // Аталған сұраққа жауап берілген-берілмегенін тексеру
  let answered = userAnswers[qIndex] !== null;
  // Жауап нұсқаларын құрып шығу
  question.answers.forEach((ansText, idx) => {
    const ansDiv = document.createElement('div');
    ansDiv.className = 'answer-option';
    ansDiv.setAttribute('data-index', idx);
    // Жауап мәтінінің алдына жауап нұсқасының әріптік индексін қосу (A., B., ...)
    ansDiv.innerText = letters[idx] + ". " + ansText;
    if (answered) {
      // Егер сұраққа бұрын жауап берілсе, дұрыс және қате жауаптарды көрсету
      let correctIndex = question.correct;
      let userIndex = userAnswers[qIndex];
      if (idx === correctIndex) {
        ansDiv.classList.add('correct-answer');
      }
      if (userIndex !== question.correct && idx === userIndex) {
        ansDiv.classList.add('wrong-answer');
      }
      // Жауаптар көрсетілгеннен кейін оларды басу мүмкіндігін өшіру
      ansDiv.style.pointerEvents = 'none';
    } else {
      // Егер сұрақ әлі жауапталмаған болса, басу оқиғасын тіркейміз
      ansDiv.addEventListener('click', () => {
        selectAnswer(idx);
      });
    }
    answersElem.appendChild(ansDiv);
  });
  // Review режимінде болса және жауап қате/жоқ болса, тиісті хабарды шығару
  if (reviewMode && userAnswers[qIndex] !== question.correct) {
    feedbackElem.classList.remove('hidden');
    if (userAnswers[qIndex] === null) {
      feedbackElem.innerText = "Сіз бұл сұраққа жауап бермедіңіз";
    } else {
      feedbackElem.innerText = "Сіз бұл сұраққа қате жауап бердіңіз";
    }
  }
  // Навигация элементтері мен төменгі түймелердің күйін жаңарту
  updateNavAndButtons();
}

/* Навигация және басқару түймелерінің көрінісін жаңартатын функция */
function updateNavAndButtons() {
  // Барлық навигация түймелерінің түсін жаңарту
  const navItems = navElem.querySelectorAll('.nav-num');
  navItems.forEach((item, index) => {
    item.classList.remove('current', 'correct', 'wrong');
    if (reviewMode) {
      // Қателерді қарау режимінде навигация түймелерін көрсетпейміз
      item.style.display = 'none';
    } else {
      item.style.display = 'inline-block';
      // Егер сұраққа жауап берілсе, оны дұрыс/қате ретінде белгілеу
      if (userAnswers[index] !== null) {
        if (userAnswers[index] === questions[index].correct) {
          item.classList.add('correct');
        } else {
          item.classList.add('wrong');
        }
      }
      // Ағымдағы сұрақты (егер әлі жауап берілмеген болса) ерекшелеу
      if (index === currentQuestionIndex && userAnswers[index] === null) {
        item.classList.add('current');
      }
    }
  });
  // Навигация панелін толық көрсету/жасыру (режимге байланысты)
  navElem.style.display = reviewMode ? 'none' : 'block';
  // Төменгі түймелердің мәтінін және көрінуін баптау
  if (reviewMode) {
    finishBtn.innerText = "Жабу";
    nextBtn.innerText = "Келесі сұрақ";
    // Егер қате сұрақтардың соңғысына жетсе, "Келесі сұрақ" түймесін жасыру
    if (currentReviewIndex >= mistakes.length - 1) {
      nextBtn.style.display = 'none';
    } else {
      nextBtn.style.display = 'inline-block';
    }
  } else {
    finishBtn.innerText = "Тестті аяқтау";
    nextBtn.innerText = "Келесі сұрақ";
    // Соңғы сұрақ болса, "Келесі сұрақ" түймесін жасыру
    if (currentQuestionIndex >= totalQuestions - 1) {
      nextBtn.style.display = 'none';
    } else {
      nextBtn.style.display = 'inline-block';
    }
  }
}

/* Пайдаланушы жауапты таңдаған кездегі өңдеу */
function selectAnswer(optionIndex) {
  let qIndex = currentQuestionIndex;
  if (userAnswers[qIndex] !== null) {
    return;  // Егер бұған дейін жауап берілген болса, қайталамау
  }
  // Пайдаланушы таңдаған жауабын сақтау
  userAnswers[qIndex] = optionIndex;
  let correctIndex = questions[qIndex].correct;
  // Барлық жауап опциялары бойынша өтіп, түстерін қойып шығу
  const options = answersElem.querySelectorAll('.answer-option');
  options.forEach(opt => {
    const idx = Number(opt.getAttribute('data-index'));
    if (idx === correctIndex) {
      opt.classList.add('correct-answer');
    }
    if (idx === optionIndex && optionIndex !== correctIndex) {
      opt.classList.add('wrong-answer');
    }
    // Таңдағаннан кейін барлық опцияларды басу мүмкіндігін алып тастау
    opt.style.pointerEvents = 'none';
  });
  // Навигация күйін жаңартып, сұрақ нөмірін дұрыс/қате деп белгілеу
  updateNavAndButtons();
}

/* Тесті аяқтап, нәтиже экранға шығару */
function finishTest() {
  // Дұрыс жауаптардың жалпы санын есептеу
  let correctCount = 0;
  for (let i = 0; i < totalQuestions; i++) {
    if (userAnswers[i] !== null && userAnswers[i] === questions[i].correct) {
      correctCount++;
    }
  }
  let wrongCount = totalQuestions - correctCount;
  // Нәтиже деректерін нәтижелер экранына шығару
  correctCountElem.innerText = correctCount;
  wrongCountElem.innerText = wrongCount;
  // Егер қате жауап болмаған болса, "Қатемен жұмыс" түймесін алып тастау
  if (wrongCount === 0) {
    retryBtn.style.display = 'none';
  } else {
    retryBtn.style.display = 'block';
  }
  // Сұрақтар бөлімін жасырып, нәтиже бөлімін көрсету
  quizSection.classList.add('hidden');
  resultSection.classList.remove('hidden');
}

/* Оқиғаларға тыңдаушыларды тіркеу */
// "Келесі сұрақ" түймесін басу
nextBtn.addEventListener('click', () => {
  if (reviewMode) {
    // Қателерді қарау режимінде келесі қате сұраққа өту
    if (currentReviewIndex < mistakes.length - 1) {
      currentReviewIndex++;
      showQuestion();
    }
  } else {
    // Негізгі режимде келесі сұраққа ауысу (егер соңғы сұрақ болмаса)
    if (currentQuestionIndex < totalQuestions - 1) {
      currentQuestionIndex++;
      showQuestion();
    }
  }
});
// "Тестті аяқтау" (немесе "Жабу") түймесін басу
finishBtn.addEventListener('click', () => {
  if (reviewMode) {
    // Егер қателерді қарап болып «Жабу» басылса – WebApp-ты жабамыз
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.close();
    } else {
      // Егер Telegram ортасынан тыс тексерілсе
      alert("WebApp жабылды (симуляция).");
    }
  } else {
    // Егер негізгі тестті аяқтау басылса, барлық сұрақтар жауапталды ма тексеру
    let answeredCount = userAnswers.filter(ans => ans !== null).length;
    if (answeredCount < totalQuestions) {
      // Егер әлі жауапталмаған сұрақтар болса, растау модалын көрсету
      modalOverlay.classList.remove('hidden');
    } else {
      // Барлық сұрақтарға жауап берілсе, тікелей нәтижені шығару
      finishTest();
    }
  }
});
// Модал терезедегі "Аяқтау" түймесін басу (растау)
modalConfirm.addEventListener('click', () => {
  modalOverlay.classList.add('hidden');
  finishTest();
});
// Модалдағы "Бас тарту" түймесін басу (доғару)
modalCancel.addEventListener('click', () => {
  modalOverlay.classList.add('hidden');
});
// "Қатемен жұмыс" түймесін басу (қате сұрақтарды қайта көрсету)
retryBtn.addEventListener('click', () => {
  // Қате кеткен немесе жауап берілмеген сұрақтардың тізімін қалыптастыру
  mistakes = [];
  for (let i = 0; i < totalQuestions; i++) {
    if (userAnswers[i] === null || userAnswers[i] !== questions[i].correct) {
      mistakes.push(i);
    }
  }
  if (mistakes.length === 0) {
    return; // Қате сұрақ жоқ, функциядан шығамыз
  }
  // Қателерді қарау режимін бастау
  reviewMode = true;
  currentReviewIndex = 0;
  // Нәтиже бөлімін жасырып, сұрақтар бөлімін қайта көрсету
  resultSection.classList.add('hidden');
  quizSection.classList.remove('hidden');
  // Қате кеткен алғашқы сұрақты көрсету
  showQuestion();
});
// "Жабу" түймесін басу (тест нәтижесі экранында)
closeBtn.addEventListener('click', () => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.close();
  } else {
    alert("WebApp жабылды (симуляция).");
  }
});

// Бастапқыда бірінші сұрақты көрсету
showQuestion();
// Telegram-ға WebApp дайын екенін хабарлау
if (window.Telegram && window.Telegram.WebApp) {
  window.Telegram.WebApp.ready();
}