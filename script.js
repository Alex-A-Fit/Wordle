let inputAnswer1 = document.getElementById("inputAnswer1");
let Body = document.getElementById("Body");
let wrongAns = document.getElementById("wrongAns");
let submitBtn = document.getElementById("submitBtn");
let CorrectAns = document.getElementById("CorrectAns");
let GameBoard = document.getElementById("GameBoard");

//all keyboard imitation buttons
let Btn1 = document.getElementById("Btn1");
let Btn2 = document.getElementById("Btn2");
let Btn3 = document.getElementById("Btn3");
let Btn4 = document.getElementById("Btn4");
let Btn5 = document.getElementById("Btn5");
let Btn6 = document.getElementById("Btn6");
let Btn7 = document.getElementById("Btn7");
let Btn8 = document.getElementById("Btn8");
let Btn9 = document.getElementById("Btn9");
let Btn0 = document.getElementById("Btn0");
let BtnA = document.getElementById("BtnA");
let BtnB = document.getElementById("BtnB");
let BtnC = document.getElementById("BtnC");
let BtnEnter = document.getElementById("BtnEnter");
let BtnD = document.getElementById("BtnD");
let BtnE = document.getElementById("BtnE");
let BtnF = document.getElementById("BtnF");
let BtnBackspace = document.getElementById("BtnBackspace");

let KeyboardArray = [
  Btn0,
  Btn1,
  Btn2,
  Btn3,
  Btn4,
  Btn5,
  Btn6,
  Btn7,
  Btn8,
  Btn9,
  BtnA,
  BtnB,
  BtnC,
  BtnD,
  BtnE,
  BtnF,
  BtnEnter,
  BtnBackspace,
];
KeyboardArray.forEach((button) => {
  if (button.value == "Enter") {
    button.addEventListener("click", function () {
      //Submit Function

    });
  } else if (button.value == "Backspace") {
    button.addEventListener("click", function () {
      //Delete Function

      if(letterIndex == 1){
          return
      }else{
          letterIndex--;  
        DeleteChoice(DetermineGuessPos(GuessIndex), DetermineLetterPos(letterIndex))   
        }
    });
  } else {
    button.addEventListener("click", function () {
      //add function if avail
    if(letterIndex > 6){
        return
    }else{
        InputChoice(DetermineGuessPos(GuessIndex), DetermineLetterPos(letterIndex), button.value);
    }
    });
  }
});

let answer = "#";
// let wrongLetters = 0;
let GuessArray = ["", "", "", "", ""];

let Evaluation = [
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
];

let GuessIndex = 1;

let letterIndex = 1;

let hexArray = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];

setColor(Body, GetRandomColor());
console.log(answer);

// submitBtn.addEventListener("click", function () {
//   checkAnswer();
// });d
window.onkeydown = function (evt) {
  evt = evt || window.event;
  var charCode = evt.keyCode || evt.which || evt.charCode;
  if (charCode == 13) {
      //submit answer
      console.log("Enter was pressed");
    } else if (charCode == 8){
        if(letterIndex == 1){
            return
        }else{
            letterIndex--;  
          DeleteChoice(DetermineGuessPos(GuessIndex), DetermineLetterPos(letterIndex))   
          }
    }else {
    var charStr = String.fromCharCode(charCode);
    charStr = charStr.toString().toUpperCase();
    if (hexArray.includes(charStr)){
        if(letterIndex > 6){
            return
        }else{
        InputChoice(DetermineGuessPos(GuessIndex), DetermineLetterPos(letterIndex), charStr);
        }
    }else null;
  }
};

function RandomNum() {
  let randomNum = Math.floor(Math.random() * hexArray.length);
  return randomNum;
}
function GetRandomColor() {
  let randomNum = null;
  let color = "#";
  while (color.length < 7) {
    randomNum = RandomNum();
    color += hexArray[randomNum];
  }
  answer = color;
  return color;
}

function checkAnswer() {
  wrongLetters = 0;
  let input = inputAnswer1.value;
  input = input.toUpperCase();
  console.log(input);
  if (input.length == 0) {
    wrongAns.innerText =
      wrongLetters + " out of 6 letters or numbers are incorrect";
  }
  if (input.length < 7) {
    wrongLetters = 7 - input.length;

    for (let a = 0; a < input.length; a++) {
      if (input[a] != answer[a]) {
        wrongLetters++;
      }
    }
  } else {
    for (let a = 0; a < input.length; a++) {
      if (input[a] != answer[a]) {
        wrongLetters++;
      }
    }
  }
  if (wrongLetters > 0) {
    wrongAns.innerText =
      wrongLetters + " out of 6 letters or numbers are incorrect";
  } else {
    wrongAns.innerText = "";
    CorrectAns.style.color = answer;
    CorrectAns.innerText = "Hooray You got the color correct!";
  }
}

function setColor(element, color) {
  element.style.backgroundColor = color;
}

function InputChoice(guess, letterPosition, choice) {
  const Guess = document.querySelector(guess);
  let Letter = Guess.querySelector(letterPosition);
  Letter.value = " " + choice;
  letterIndex++;
}

function DeleteChoice(guess, letterPosition) {
    const Guess = document.querySelector(guess);
    let Letter = Guess.querySelector(letterPosition);
    Letter.value = "";
  }

function DetermineGuessPos(currentPos) {
  switch (currentPos) {
    case 1:
      currentPos = "#Guess1";
      break;
    case 2:
      currentPos = "#Guess2";
      break;
    case 3:
      currentPos = "#Guess3";
      break;
    case 4:
      currentPos = "#Guess4";
      break;
    case 5:
      currentPos = "#Guess5";
      break;
  }
  return currentPos
}

function DetermineLetterPos(currentPos) {
  switch (currentPos) {
    case 1:
      currentPos = "#One";
      break;
    case 2:
      currentPos = "#Two";
      break;
    case 3:
      currentPos = "#Three";
      break;
    case 4:
      currentPos = "#Four";
      break;
    case 5:
      currentPos = "#Five";
      break;
    case 6:
      currentPos = "#Six";
      break;
  }
  return currentPos
}
// function InputChoice(guess, letterPosition, choice) {
//     const guess1 = document.querySelector("#Guess1");
//     let Letter1 = guess1.querySelector("#One");
//     Letter1.value = "T";
//   }
