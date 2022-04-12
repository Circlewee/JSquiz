const resultPage = () => {
  const bodyElement = document.querySelector('body');
  bodyElement.innerHTML = `
    <main>
      <h1>Result</h1>
      <article class='score'>${score}</article>
      <a href='quiz.html'>
        <button class='restart'>Play again</button>
      </a>
    </main>
  `;
};

const check = (choice, child) => {
  if (
    questionList[questionNum - 1].answer === child ||
    questionList[questionNum - 1].answer === true
  ) {
    score += 1;
    let scoreElement = document.querySelector('.score');
    scoreElement.innerText = score;
    choice.classList.add('correct');
  } else {
    choice.classList.add('wrong');
  }
};

const checkAnswer = (child) => {
  let choice = document.querySelector(`.child${child + 1}`);

  if (questionNum !== questionList.length) {
    check(choice, child);
    setTimeout(updatePage, 1000);
  } else {
    check(choice, child);
    setTimeout(resultPage, 1000);
  }
};

const updatePage = () => {
  const questionNumTag = document.querySelector('.question-p');
  const progressMeter = document.querySelector('.meter');
  let exampleStr = ``;
  question = document.querySelector('.question');
  choices = document.querySelector('.choices');

  questionNum = parseInt(questionNumTag.innerText.split(' ')[0]) + 1;
  question.innerText = questionList[questionNum - 1].question;
  for (let i = 0; i < questionList[questionNum - 1].example.length; i++) {
    exampleStr += `
    <div class='child${i + 1}' onclick='checkAnswer(${i})'>
      <div class='child-inner'>${i + 1}</div>
      ${questionList[questionNum - 1].example[i]}</div>
    `;
  }
  choices.innerHTML = exampleStr;

  questionNumTag.innerText = `${questionNum} / 5`;
  progressMeter.value = 20 * questionNum;
};

let questionNum;
let question;
let choices;
let score = 0;

const questionList = [
  {
    question: 'What is 1 + 1?',
    example: ['1', '2', '11', '4', '10'],
    answer: 1,
  },
  {
    question: 'What is "1" + 1',
    example: ['1', '2', '11', '4', '0'],
    answer: 2,
  },
  {
    question: '[1, 2, 3, 4, 5].length()?',
    example: ['1', '2', '3', '4', '5'],
    answer: 4,
  },
  {
    question: 'Math.floor(3.5)?',
    example: ['3.00', '"3"', '3', '[3]', '3.0'],
    answer: 2,
  },
  {
    question: '기프티콘 잘먹겠습니다.',
    example: ['true', 'return 1;', '정답', 'delicious', '감사합니다😎'],
    answer: true,
  },
];
