const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const essayButton = document.getElementById("essay-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const soundCorrect = document.getElementById("soundCorrect");
const soundWrong = document.getElementById("soundWrong");
const backSound = document.getElementById("backSound");
const essayAnswer = document.getElementById("essayAnswer");
const show = document.getElementById("show-btn");
const intruction = document.getElementById("intruction");
const closing = document.getElementById("closing");
const closingSound = document.getElementById("closingSound");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions;
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
  intruction.classList.add("hide");
  function sound() {
    backSound.play();
    backSound.volume = 0.05;
    backSound.loop = true;
  }
  sound();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    } else if (answer.correct === false) {
      button.dataset.wrong = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  const wrong = selectedButton.dataset.wrong;
  setStatusClass(document.body, correct, wrong);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    if (correct) {
      selectedButton.classList.add("correct");
      nextButton.classList.remove("hide");
    } else if (wrong) {
      selectedButton.classList.add("wrong");
    }
  } else {
    if (correct) {
      selectedButton.classList.add("correct");
    } else if (wrong) {
      selectedButton.classList.add("wrong");
    }
    startButton.classList.add("hide");
    essayButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct, wrong) {
  clearStatusClass(element);
  if (correct) {
    function sound() {
      soundCorrect.play();
    }
    sound();
    element.classList.add("correct");
  } else if (wrong) {
    function sound() {
      soundWrong.play();
    }
    sound();
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "Question 1",
    answers: [
      { text: "A. Answer 1", correct: false },
      { text: "B. Answer 2", correct: true },
      { text: "C. Answer 3", correct: false },
      { text: "D. Answer 4", correct: false },
      { text: "E. Answer 5", correct: false },
    ],
  },
  {
    question: "Question 2",
    answers: [
      { text: "A.	Answer 1", correct: false },
      { text: "B.	Answer 2", correct: false },
      { text: "C.	Answer 3", correct: false },
      { text: "D.	Answer 4", correct: true },
      { text: "E.	Answer 5", correct: false },
    ],
  },
  {
    question: "Question 3",
    answers: [
      { text: "A.	Answer 1", correct: false },
      { text: "B.	Answer 2", correct: true },
      { text: "C.	Answer 3", correct: false },
      { text: "D.	Answer 4", correct: false },
      { text: "E.	Answer 5", correct: false },
    ],
  },
  {
    question: "Question 4",
    answers: [
      { text: "A.	Answer 1", correct: true },
      { text: "B.	Answer 2", correct: false },
      { text: "C.	Answer 3", correct: false },
      { text: "D.	Answer 4", correct: false },
      { text: "E.	Answer 5", correct: false },
    ],
  },
  {
    question: "Question 5",
    answers: [
      { text: "A.	Answer 1", correct: false },
      { text: "B.	Answer 2", correct: false },
      { text: "C.	Answer 3", correct: false },
      { text: "D.	Answer 4", correct: false },
      { text: "E.	Answer 5", correct: true },
    ],
  },
];

// essay question and functions
essayButton.addEventListener("click", () => {
  essayButton.classList.add("hide");
  essay1();
});

function essay1() {
  clearStatusClass(document.body);
  startButton.classList.add("hide");
  answerButtonsElement.classList.add("hide");
  questionElement.innerText = "Question 1";
  essayAnswer.classList.remove("hide");
  show.classList.remove("hide");
  document.addEventListener("keyup", (event) => {
    if (event.keyCode === 32) {
      document.body.classList.add("wrong");
      function sound() {
        soundWrong.play();
      }
      sound();
    }
  });
  show.addEventListener("click", () => {
    clearStatusClass(document.body);
    essayAnswer.value = "Answer";
    document.body.classList.add("correct");
    nextButton.classList.remove("hide");
    function sound() {
      soundCorrect.play();
    }
    sound();
  });
  nextButton.addEventListener("click", function essay2() {
    clearStatusClass(document.body);
    startButton.classList.add("hide");
    answerButtonsElement.classList.add("hide");
    questionElement.innerText = "Question 2";
    essayAnswer.classList.remove("hide");
    show.classList.remove("hide");
    essayAnswer.value = "";
    show.addEventListener("click", () => {
      essayAnswer.value = "Answer";
      document.body.classList.add("correct");
      nextButton.classList.remove("hide");
      function sound() {
        soundCorrect.play();
      }
      sound();
    });
    nextButton.addEventListener("click", function essay3() {
      clearStatusClass(document.body);
      startButton.classList.add("hide");
      answerButtonsElement.classList.add("hide");
      questionElement.innerText = "Question 3";
      essayAnswer.classList.remove("hide");
      show.classList.remove("hide");
      essayAnswer.value = "";
      show.addEventListener("click", () => {
        essayAnswer.value = "Answer";
        document.body.classList.add("correct");
        nextButton.classList.remove("hide");
        function sound() {
          soundCorrect.play();
        }
        sound();
      });
      nextButton.addEventListener("click", function essay4() {
        clearStatusClass(document.body);
        startButton.classList.add("hide");
        answerButtonsElement.classList.add("hide");
        questionElement.innerText = "Question 4";
        essayAnswer.classList.remove("hide");
        show.classList.remove("hide");
        essayAnswer.value = "";
        show.addEventListener("click", () => {
          essayAnswer.value = "Answer";
          document.body.classList.add("correct");
          nextButton.classList.remove("hide");
          function sound() {
            soundCorrect.play();
          }
          sound();
        });
        nextButton.addEventListener("click", function essay5() {
          clearStatusClass(document.body);
          startButton.classList.add("hide");
          answerButtonsElement.classList.add("hide");
          questionElement.innerText = "Question 5";
          essayAnswer.classList.remove("hide");
          show.classList.remove("hide");
          essayAnswer.value = "";
          show.addEventListener("click", () => {
            essayAnswer.value = "Answer";
            document.body.classList.add("correct");
            nextButton.classList.remove("hide");
            function sound() {
              soundCorrect.play();
            }
            sound();
          });
          nextButton.addEventListener("click", function () {
            clearStatusClass(document.body);
            show.classList.add("hide");
            essayAnswer.classList.add("hide");
            answerButtonsElement.classList.add("hide");
            essayAnswer.classList.add("hide");
            questionElement.classList.add("hide");
            questionContainerElement.classList.add("hide");
            const container = document.getElementById("container");
            container.classList.add("hide");
            closing.classList.remove("hide");
            backSound.pause();
            function sound() {
              closingSound.play();
              closingSound.volume = 0.3;
            }
            sound();
            document.addEventListener("keyup", (event) => {
              if (event.keyCode === 32) {
                clearStatusClass(document.body);
                soundWrong.pause();
              }
            });
          });
        });
      });
    });
  });
}
