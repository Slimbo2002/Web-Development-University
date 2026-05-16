const quizContainer = document.querySelector('.quiz');
const question = document.querySelector('.informationBlock1 .question');
const options = document.querySelector('.informationBlock1 .options');
const nextButton = document.querySelector('.informationBlock1 .nextButton');
const questionImage = document.querySelector('.qImage');
const resultPage = document.querySelector('.result');
const resultText = document.querySelector('.result .resultText');
const resultImg = document.querySelector('.result .resultImg');
const feedback = document.querySelector('.result .feedback');
const encourage = document.querySelector('.result .encourage');

let questionNumber = 0;
let correctAnswers = 0;
let selected = null;

let quiz_questions = [];

const loadQuestions = async () => {
    const response = await fetch('get_questions.php');
    quiz_questions = await response.json();
    createQuestion();
}

const checkAnswer = (e) =>{
  let userAnswer = e.target.textContent;

  if(userAnswer == quiz_questions[questionNumber].answer){
    correctAnswers++;
    e.target.classList.add("correct")
  }
  else{
    e.target.classList.add("incorrect")
  }
  selected = userAnswer;
  nextButton.classList.add("enabled")

  //Disables options buttons
  let allOptions = document.querySelectorAll(".informationBlock1 .option")
  allOptions.forEach(o =>{
    o.classList.add("disabled");
  })
}

const createQuestion = () =>{
  options.innerHTML = '';
  selected = null;
  nextButton.classList.remove("enabled");
  updateImage();

  question.innerHTML = quiz_questions[questionNumber].question;

  quiz_questions[questionNumber].options.forEach((o) =>{
    const option = document.createElement("button");
    option.classList.add("option");
    option.innerHTML = o;
    option.addEventListener("click", (e) =>{
      checkAnswer(e);
    })
    options.prepend(option);
  })
}

const updateImage = () =>{
  let imagePath = quiz_questions[questionNumber].imagePath
  questionImage.src = imagePath
}

const showQuizResult = () =>{
  quizContainer.style.display = 'none'
  resultPage.removeAttribute('hidden');
  resultPage.classList.add('visible');

  resultText.innerHTML = `You Got ${correctAnswers} / ${quiz_questions.length}`
  let percent = (correctAnswers / quiz_questions.length) * 100;
  feedback.innerHTML = `${percent}% correct`;

  if(percent > 80){
    resultImg.src = "Assets/happy_kid.png";
    encourage.innerHTML = "Wow you are an expert in saving your planet!";
  }
  else if(percent < 80 && percent > 50){
    resultImg.src = "Assets/happy_kid.png";
    encourage.innerHTML = "You are almost there!";
  }
  else{
    resultImg.src = "Assets/try_again.png";
    encourage.innerHTML = "Still have some work to do, you've got this!";
  }
  
}
const displayNextQuestion = () =>{
  if(selected == null){
    return;
  }

  if(questionNumber >= quiz_questions.length -1){
    showQuizResult();
    return;
  }

  questionNumber++;
  createQuestion(); 
}

loadQuestions();
nextButton.addEventListener("click", displayNextQuestion);