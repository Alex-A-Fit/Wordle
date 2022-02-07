let inputAnswer1 = document.getElementById("inputAnswer1");
let Body = document.getElementById("Body");
let wrongAns = document.getElementById("wrongAns");
let submitBtn = document.getElementById("submitBtn");
let CorrectAns = document.getElementById("CorrectAns");
let GameBoard = document.getElementById("GameBoard");
let Warning = document.getElementById("Warning");
let Warning2 = document.getElementById("Warning2");
let Success = document.getElementById("Success");
let InstructionsBtn = document.getElementById("InstructionsBtn");
let LeaderboardBtn = document.getElementById("LeaderboardBtn");
let Instructions = document.getElementById("Instructions");



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

//Modal IDs
let MdGamesPlayed = document.getElementById("GamesPlayed");
let MdWinPercent = document.getElementById("WinPerct");
let MdCurrentStreak = document.getElementById("CurrentStreak");
let MdBestStreak = document.getElementById("BestStreak");



LeaderboardBtn.addEventListener("click", function () {
  if(GetFromLS("Stats")){
    let Stats = GetFromLS("Stats")
    MdGamesPlayed.innerText = Stats.GamesPlayed;
    MdWinPercent.innerText = CalcWinPercent();
    MdCurrentStreak.innerText = Stats.WinStreak;
    MdBestStreak.innerText = Stats.BestWinStreak;
  }
});

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
let Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let GameProgress = "IN_PROGRESS";
let LastCompletedTs = null;
let LastPlayedTs = GetTodaysDate();
let answer = "";
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

function PopulateGameBoard(GameState) {
  let Evaluation = GameState.Evaluations;
  let Guesses = GameState.Guesses;
  for (let g = 1; g < GuessIndex; g++) {
    for (let l = 1; l < 7; l++) {
      let Guess = document.querySelector(DetermineGuessPos(g));
      let GuessTile = Guess.querySelector(DetermineGuessTile(l));
      let Letter = Guess.querySelector(DetermineLetterPos(l));
      let letterPositionClone = Guess.querySelector(DetermineLetterPosClone(l));
      if (Letter.value) Letter.value = "";
      if (letterPositionClone.value) letterPositionClone.value = "";
      setTimeout(() => {
        Letter.value = " " + Guesses[g - 1][l - 1];
        letterPositionClone.value = " " + Guesses[g - 1][l - 1];
        if (Evaluation[g - 1][l - 1] == "Correct") {
          GuessTile.classList.toggle("isFlipped");
          setBackgroundColor(letterPositionClone, "#6aaa64");
          setColor(letterPositionClone, "#000");
        } else if (Evaluation[g - 1][l - 1] == "Exist") {
          GuessTile.classList.toggle("isFlipped");
          setBackgroundColor(letterPositionClone, "#c9b458");
          setColor(letterPositionClone, "#000");
        } else if (Evaluation[g - 1][l - 1] == "Wrong") {
          GuessTile.classList.toggle("isFlipped");
          setBackgroundColor(letterPositionClone, "#585858");
          setColor(letterPositionClone, "#FFF");
        }
      }, 300);
    }
  }
}

function LoadGame() {
  let TodaysDate = GetTodaysDate();

  if (GetFromLS("GameState") == null || GetFromLS("GameState" == undefined)) {
    setBackgroundColor(Body, GetRandomColor());
    SaveGameState();
    InstructionsBtn.click();
  } else {
    let GameState = GetFromLS("GameState");
    LastPlayedTs = GameState.LastPlayed;
    if (
      LastPlayedTs[0] == TodaysDate[0] &&
      LastPlayedTs[1] == TodaysDate[1] &&
      LastPlayedTs[2] == TodaysDate[2]
    ) {
      answer = GameState.Answer;
      Evaluation = GameState.Evaluations;
      GameProgress = GameState.GameStatus;
      GuessIndex = GameState.GuessRow;
      GuessArray = GameState.Guesses;
      LastCompletedTs = GameState.LastCompleted;
      setBackgroundColor(Body, "#" + answer);
      PopulateGameBoard(GameState);
    } else {
      setBackgroundColor(Body, GetRandomColor());
    }
  }
}
LoadGame();
function RetrieveGuesses() {}

function GetTodaysDate() {
  let TodaysDate = new Date();
  let month = Months[TodaysDate.getMonth()];
  let day = TodaysDate.getDate();
  let year = TodaysDate.getFullYear();
  TodaysDate = [month.toString(), day.toString(), year.toString()];
  return TodaysDate;
}

function removeWarning() {
  Warning.classList.add("d-none");
}
function removeWarning2() {
  Warning2.classList.add("d-none");
}
function removeSuccess() {
  Success.classList.add("d-none");
}

function assignColorResponse(guess) {
  let Guess = document.querySelector(DetermineGuessPos(guess));
  let GuessClone;
  let LetterClone;
  for (let letterIndex = 1; letterIndex < 7; letterIndex++) {
    LetterClone = Guess.querySelector(DetermineLetterPosClone(letterIndex));
    GuessClone = Guess.querySelector(DetermineGuessTile(letterIndex));

    if (Evaluation[GuessIndex - 1][letterIndex - 1] == "Correct") {
      GuessClone.classList.toggle("isFlipped");
      setBackgroundColor(LetterClone, "#6aaa64");
      setColor(LetterClone, "#000");
    } else if (Evaluation[GuessIndex - 1][letterIndex - 1] == "Exist") {
      GuessClone.classList.toggle("isFlipped");
      setBackgroundColor(LetterClone, "#c9b458");
      setColor(LetterClone, "#000");
    } else if (Evaluation[GuessIndex - 1][letterIndex - 1] == "Wrong") {
      GuessClone.classList.toggle("isFlipped");
      setBackgroundColor(LetterClone, "#585858");
      setColor(LetterClone, "#FFF");
    }
  }
}

function EvalAnswer() {
  let GameState = GetFromLS("GameState");
  let AnsComparison = answer.split("");
  //warning message
  if (GuessIndex > 5) {
    Warning2.classList.remove("d-none");

    setTimeout(removeWarning2, 3000);

    return;
  } else if (letterIndex < 7) {
    Warning.classList.remove("d-none");

    setTimeout(removeWarning, 3000);

    return;
  } else {
    let userGuess = GetChoice(DetermineGuessPos(GuessIndex));
    GuessArray[GuessIndex - 1] = userGuess;
    for (let a = 0; a < userGuess.length; a++) {
      if (answer[a] == userGuess[a]) {
        Evaluation[GuessIndex - 1][a] = "Correct";
        AnsComparison[a] = "";
      } else {
        if (AnsComparison.includes(userGuess[a])) {
          Evaluation[GuessIndex - 1][a] = "Exist";
        } else {
          Evaluation[GuessIndex - 1][a] = "Wrong";
        }
      }
    }
    assignColorResponse(GuessIndex);
    GameState.Evaluations = Evaluation;
    GameState.Guesses[GuessIndex - 1] = userGuess;
    if (userGuess === answer) {
      GameState.GuessRow += 1;
      GameState.GameStatus = "WON";
      GameState.LastCompleted = GetTodaysDate();
      Success.classList.remove("d-none");
      SaveToLS("GameState", GameState);
    } else {
      GuessIndex++;
      GameState.GuessRow = GuessIndex;
      letterIndex = 1;
      SaveToLS("GameState", GameState);
    }
    RecordStats();
  }
}

KeyboardArray.forEach((button) => {
  if (button.value == "Enter") {
    button.addEventListener("click", function () {
      //Submit Function
      EvalAnswer();
    });
  } else if (button.value == "Backspace") {
    button.addEventListener("click", function () {
      //Delete Function
      if (letterIndex == 1) {
        return;
      } else {
        letterIndex--;
        DeleteChoice(
          DetermineGuessPos(GuessIndex),
          DetermineLetterPos(letterIndex)
        );
      }
    });
  } else {
    button.addEventListener("click", function () {
      //add function if avail
      if (letterIndex > 6 || GuessIndex > 5) {
        return;
      } else {
        InputChoice(
          DetermineGuessPos(GuessIndex),
          DetermineLetterPos(letterIndex),
          DetermineLetterPosClone(letterIndex),
          button.value
        );
      }
    });
  }
});

// submitBtn.addEventListener("click", function () {
//   checkAnswer();
// });
window.onkeydown = function (evt) {
  evt = evt || window.event;
  var charCode = evt.keyCode || evt.which || evt.charCode;
  if (charCode == 13) {
    //submit answer by hitting enter on keyboard
    EvalAnswer();
  } else if (charCode == 8) {
    if (letterIndex == 1) {
      return;
    } else {
      letterIndex--;
      DeleteChoice(
        DetermineGuessPos(GuessIndex),
        DetermineLetterPos(letterIndex)
      );
    }
  } else {
    var charStr = String.fromCharCode(charCode);
    charStr = charStr.toString().toUpperCase();
    if (hexArray.includes(charStr)) {
      if (letterIndex > 6) {
        return;
      } else {
        InputChoice(
          DetermineGuessPos(GuessIndex),
          DetermineLetterPos(letterIndex),
          DetermineLetterPosClone(letterIndex),
          charStr
        );
      }
    } else null;
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
    answer += hexArray[randomNum];
  }
  return color;
}

function checkAnswer() {
  wrongLetters = 0;
  let input = inputAnswer1.value;
  input = input.toUpperCase();
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

function setBackgroundColor(element, color) {
  element.style.backgroundColor = color;
}
function setColor(element, color) {
  element.style.color = color;
}

function InputChoice(guess, letterPosition, letterPositionClone, choice) {
  const Guess = document.querySelector(guess);
  let Letter = Guess.querySelector(letterPosition);
  let LetterClone = Guess.querySelector(letterPositionClone);
  Letter.value = " " + choice;
  LetterClone.value = " " + choice;
  letterIndex++;
}

function GetChoice(guess) {
  let TempLetterPos = 1;
  let letterPosition = 1;
  let answer = "";
  let value = "";
  const Guess = document.querySelector(guess);

  for (TempLetterPos; TempLetterPos <= 6; TempLetterPos++) {
    letterPosition = TempLetterPos;
    letterPosition = DetermineLetterPos(letterPosition);
    value = Guess.querySelector(letterPosition).value;
    answer += value.trim();
  }
  return answer;
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
  return currentPos;
}

function DetermineGuessTile(currentPos) {
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
  return currentPos;
}
function DetermineLetterPos(currentPos) {
  switch (currentPos) {
    case 1:
      currentPos = "#TileOne";
      break;
    case 2:
      currentPos = "#TileTwo";
      break;
    case 3:
      currentPos = "#TileThree";
      break;
    case 4:
      currentPos = "#TileFour";
      break;
    case 5:
      currentPos = "#TileFive";
      break;
    case 6:
      currentPos = "#TileSix";
      break;
  }
  return currentPos;
}
function DetermineLetterPosClone(currentPos) {
  switch (currentPos) {
    case 1:
      currentPos = "#TileOneClone";
      break;
    case 2:
      currentPos = "#TileTwoClone";
      break;
    case 3:
      currentPos = "#TileThreeClone";
      break;
    case 4:
      currentPos = "#TileFourClone";
      break;
    case 5:
      currentPos = "#TileFiveClone";
      break;
    case 6:
      currentPos = "#TileSixClone";
      break;
  }
  return currentPos;
}

function SaveToLS(localStorageKey, localStorageValue) {
  localStorage.setItem(localStorageKey, JSON.stringify(localStorageValue));
}

function GetFromLS(localStorageKey) {
  return JSON.parse(localStorage.getItem(localStorageKey));
}

function SaveGameState() {
  let GameState = {
    Answer: answer,
    Evaluations: Evaluation,
    GameStatus: GameProgress,
    GuessRow: GuessIndex,
    Guesses: GuessArray,
    LastCompleted: LastCompletedTs,
    LastPlayed: LastPlayedTs,
  };
  if (GetFromLS("GameState") == null || GetFromLS("GameState" == undefined)) {
    SaveToLS("GameState", GameState);
  } else {
    GameState = GetFromLS("GameState");
  }
}

function RecordStats() {
  let GamesWon = 0;
  let GamesPlayed = 1;
  let WinStreak = 0;
  let BestWinStreak = 0;
  let GameState = GetFromLS("GameState");
  let TodaysDate = GetTodaysDate();
  let Stats = {
    GamesWon: GamesWon,
          GamesPlayed: GamesPlayed,
          WinStreak: WinStreak,
          BestWinStreak: BestWinStreak,
  }
  LastPlayedTs = GameState.LastPlayed;
  if (
    LastPlayedTs[0] == TodaysDate[0] &&
    LastPlayedTs[1] == TodaysDate[1] &&
    LastPlayedTs[2] == TodaysDate[2]
  ) {
    if (GetFromLS("Stats") == null || GetFromLS("Stats") == undefined) {
      if (GameState.GameStatus == "WON") {
        Stats.GamesWon += 1;
        Stats.WinStreak += 1;
        Stats.BestWinStreak += 1;
        SaveToLS("Stats", Stats);
      } else if(GuessIndex > 5) {
        SaveToLS("Stats", Stats);
      }
    }
  } else if (
    LastPlayedTs[0] == TodaysDate[0] &&
    parseInt(LastPlayedTs[1]) + 1 == parseInt(TodaysDate[1]) &&
    LastPlayedTs[2] == TodaysDate[2]
  ) {
    Stats = GetFromLS("Stats");
    Stats.GamesPlayed += 1
    if(GameState.GameStatus == "WON"){
      Stats.GamesWon += 1;
      Stats.WinStreak += 1;
      if(Stats.WinStreak > Stats.BestWinStreak){
        Stats.BestWinStreak = Stats.WinStreak;
      }
      SaveToLS("Stats", Stats);
    }
  }else{
    Stats = GetFromLS("Stats");
    Stats.GamesPlayed += 1
    Stats.WinStreak = 0;
    if (GameState.GameStatus == "WON") {
      Stats.GamesWon += 1;
      Stats.WinStreak = 1;
      if(Stats.WinStreak > Stats.BestWinStreak){
        Stats.BestWinStreak = Stats.WinStreak;
      }
      SaveToLS("Stats", Stats);
    }
  }
}

function CalcWinPercent(){
  if(GetFromLS("Stats")){
    let Stats = GetFromLS("Stats")
    let WinPercentage = Stats.GamesWon * 100 / Stats.GamesPlayed 
    return WinPercentage + "%";
  }else{
    return "0%";
  }
}

