// 1. Array of question objects
const questions = [
  {
    question: "Which keyword declares a block-scoped variable that can be reassigned?",
    options: ["const", "let", "var", "static"],
    correctIndex: 1
  },
  {
    question: "Which method selects the first element matching a CSS selector?",
    options: [
      "document.getElementById()",
      "document.querySelectorAll()",
      "document.querySelector()",
      "document.find()"
    ],
    correctIndex: 2
  },
  {
    question: "What does typeof [] return in JavaScript?",
    options: ["\"array\"", "\"list\"", "\"object\"", "\"undefined\""],
    correctIndex: 2
  },
  {
    question: "Which array method adds one or more elements to the end of an array?",
    options: ["push()", "pop()", "shift()", "slice()"],
    correctIndex: 0
  }
];

// Counter state variables
let currentQuestionIndex = 0;
let score = 0;

// DOM references via querySelector
const quizSection = document.querySelector("#quizSection");
const resultSection = document.querySelector("#resultSection");
const progressText = document.querySelector("#progressText");
const questionText = document.querySelector("#questionText");
const optionsContainer = document.querySelector("#optionsContainer");
const nextBtn = document.querySelector("#nextBtn");
const scoreText = document.querySelector("#scoreText");
const messageText = document.querySelector("#messageText");
const restartBtn = document.querySelector("#restartBtn");

// 2 & 3. Render one question at a time and configure button state/label
function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  questionText.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";

  // Disable Next/Finish button until a radio button is selected
  nextBtn.disabled = true;

  // Update button text on the last question
  if (currentQuestionIndex === questions.length - 1) {
    nextBtn.textContent = "Finish";
  } else {
    nextBtn.textContent = "Next";
  }

  // Create radio buttons for each option
  currentQuestion.options.forEach((option, index) => {
    const label = document.createElement("label");
    label.className = "option-label";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quizOption";
    radio.value = index;

    radio.addEventListener("change", () => {
      nextBtn.disabled = false;
    });

    const span = document.createElement("span");
    span.textContent = option;

    label.appendChild(radio);
    label.appendChild(span);
    optionsContainer.appendChild(label);
  });
}

// 4 & 5. Evaluate answer, advance counter, or display final results
function handleNextClick() {
  const selectedRadio = document.querySelector('input[name="quizOption"]:checked');
  if (!selectedRadio) return;

  const selectedIndex = Number(selectedRadio.value);
  const correctIndex = questions[currentQuestionIndex].correctIndex;

  if (selectedIndex === correctIndex) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizSection.style.display = "none";
  resultSection.style.display = "block";

  const total = questions.length;
  const percentage = (score / total) * 100;

  scoreText.textContent = `Score: ${score}/${total} (${percentage}%)`;

  if (percentage === 100) {
    messageText.textContent = "Excellent work!";
  } else if (percentage >= 50) {
    messageText.textContent = "Good job!";
  } else {
    messageText.textContent = "Keep practising!";
  }
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultSection.style.display = "none";
  quizSection.style.display = "block";
  renderQuestion();
}

nextBtn.addEventListener("click", handleNextClick);
restartBtn.addEventListener("click", restartQuiz);

// Initial render
renderQuestion();