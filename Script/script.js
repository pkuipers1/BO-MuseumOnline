const delayTime = 2000; // wachttijd voor de volgende vraag
const myQuestion = document.getElementById('myQuestion');
const myAnswer = document.getElementById('myAnswer');
const quizWrapper = document.getElementById('quizWrapper');
const questionBox = document.getElementById('questionBox');
const resultBox = document.getElementById('resultBox');
const quizTitle = document.getElementById('quizTitle');

let counter = 0; // aantal mutliple choice vragen
let quiz; // object met quiz vragen
let playerData = {}; // object, hierin worden de game gegevens opgeslagen
let quizNummer = 1; // voorbereiden automatisch 2e quiz startem


function init(){
  quiz = quiz1; // kies de quiz
  //  quiz = quiz2; // kies de quiz
  initQuiz(); // start de quiz
}

function initQuiz(){
  questionBox.style.display = "block"; // reset alle player game variabelen
  resultBox.style.display = "none"; // reset alle player game variabelen
  counter = 0; // reset alle player game variabelen
  playerData.goodAnswers = 0; // reset alle player game variabelen
  playerData.wrongAnswers = 0; // reset alle player game variabelen
  playerName = ""; // toekomstige uitbreiding naam speler opvragen
  resultBox.style.display = "none"; // verberg de resultbox
  quizTitle.innerHTML=quiz.quizMetaData.title; // laat titel van quiz zien
  prepareQuestions(); // start de quiz
}

function prepareQuestions() {
  questionBox.className = "questionBox-new"; // voorbereiden animatie
  let quizImage = quiz.quizMetaData.imageURI; // image laden
  quizWrapper.style.backgroundImage = "url("+ quizImage + ")"; // image laden
  quizWrapper.style.backgroundRepeat = "no-repeat"; // image positioneren
  quizWrapper.style.backgroundPosition = "right"; // image positioneren
  quizWrapper.style.backgroundSize = "25%"; // image positioneren
  quiz.answerClicked = false; // voorkom dubbel klikken op antwoord


  if (counter < quiz.quizContent.length) { // test op aantal vragen
    myQuestion.innerHTML = quiz.quizContent[counter].question; // laat vraag zien
    myAnswer.innerHTML = "";
    // zet de multiple choice antwoorden neer
    for (let i = 0; i < quiz.quizContent[counter].answers.length; i++) {
      let answer = document.createElement('li');
      answer.className = "answer";
      answer.score = quiz.quizContent[counter].answers[i].feedback;
      answer.innerHTML = quiz.quizContent[counter].answers[i].answer;
      myAnswer.appendChild(answer);
      answer.addEventListener('click', evaluate, true)
    }

  }
  else
  {
    finishQuiz(); // sluit de quiz af
  }
}

function evaluate(evt) {
 // console.log(evt.target); // debug
  if(!quiz.answerClicked){
    if (evt.target.score) {
      evt.target.className = "right";
      playerData.goodAnswers += 1; // increase good score
      console.log("correct answer");
      console.log("correct answers:" + playerData.goodAnswers)
      console.log("wrong answers:" + playerData.wrongAnswers)
    } else {
      evt.target.className = "wrong";
      playerData.wrongAnswers += 1; // increase wrong score
      console.log("wrong answer");
      console.log("correct answers:" + playerData.goodAnswers)
      console.log("wrong answers:" + playerData.wrongAnswers)
    }
    quiz.answerClicked=true; // prevent double click
  }
  counter++;
  questionBox.className = "questionBox";  // voorbereiden animatie
  setTimeout(prepareQuestions, delayTime); // wacht 2 seconden voor nieuwe vraag
}

function finishQuiz() {
  // afsluiting quiz geef feedback
  questionBox.style.display = "none";
  resultBox.style.display = "block";
  quizWrapper.style.background = "white";
  resultBox.innerHTML = "<h2>Jouw resultaat <br>goede antwoorden " + playerData.goodAnswers + "<br>foute antwoorden " + playerData.wrongAnswers + "</h2>";

  console.log("GOOD ANSWERS: " + playerData.goodAnswers)
  console.log("WRONG ANSWERS: " + playerData.wrongAnswers)

  if (playerData.goodAnswers < 2) {
    resultBox.innerHTML = "<h1>Woman With Shopping</h1><img src=\"../f1m2BO-MuseumOnline/Images/WomanWithShopping.jpg\"><p>Je bent gefoccused op je eigen problemen. Er is genoeg in je leven om je druk over te maken, je hebt niet iemand anders zijn problemen nodig.</p>"
  } else if (playerData.goodAnswers == 2) {
    resultBox.innerHTML = "<h1>Bedorven Druiven</h1><img src=\"../f1m2BO-MuseumOnline/Images/Druiven.jpg\"><p>Je zorgt voornamelijk voor jezelf, maar zorgt ook voor een glimlach bij de mensen om je heen. Je ziet er Meestal netjes uit, maar bent stiekem nogal lui.</p>"
  } else if (playerData.goodAnswers == 3) {
    resultBox.innerHTML = "<h1>Last Supper</h1><img src=\"../f1m2BO-MuseumOnline/Images/LastSupper.jpg\"><p>Je bent chaotisch en het zonnetje in huis. Je houd van felle kleuren en accepteert uitdagingen die jouw richting uitkomen.</p>"
  } else {
    resultBox.innerHTML = "<h1>Zelfportret van suikerklontjes</h1><img src=\"../f1m2BO-MuseumOnline/Images/Suikerklont.jpg\"><p>Je vind dat andere mensen prioriteit hebben, waardoor jij zelf soms in de problemen komt. Je probeert jezelf altijd te verbeteren en doet zoveel mogelijk je best om anderen blij te maken.</p>"
  }
}

init(); // start it
