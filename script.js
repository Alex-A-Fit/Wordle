let inputAnswer1 = document.getElementById("inputAnswer1");
let Square = document.getElementById("Square");
let wrongAns = document.getElementById("wrongAns");
let submitBtn = document.getElementById("submitBtn");
let CorrectAns =  document.getElementById("CorrectAns");

let answer = "#";
let wrongLetters = 0;

let hexArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8" ,"9", "A", "B", "C", "D", "E", "F" ];

setColor(Square, GetRandomColor())
console.log(answer);

submitBtn.addEventListener("click", function(){
    checkAnswer();
})


function RandomNum()
{
    let randomNum =  Math.floor(Math.random() * hexArray.length);
    return randomNum;
}
function GetRandomColor()
{
    let randomNum = null;
    let color = "#";
    while (color.length < 7) {
        randomNum = RandomNum();
        color += hexArray[randomNum];
    }
    answer = color;
    return color;
}

function checkAnswer(){
    wrongLetters = 0;
    let input = inputAnswer1.value;
    input = input.toUpperCase();
    console.log(input)
    if(input.length == 0)
    {
        wrongAns.innerText = wrongLetters + " out of 7 letters or numbers are incorrect";
    }
    if (input.length < 7)
    {
        wrongLetters = 7 - input.length;
       
        for( let a = 0; a < input.length; a++){
            if (input[a] != answer[a])
            {
                wrongLetters++;
            }
        }
        
    }
    else{
        for( let a = 0; a < input.length; a++){
            if (input[a] != answer[a])
            {
                wrongLetters++;
            }
        }
    }
    if(wrongLetters > 0){
        wrongAns.innerText = wrongLetters + " out of 7 letters or numbers are incorrect";
    }
    else{
        wrongAns.innerText =  "";
        CorrectAns.style.color = answer;
        CorrectAns.innerText = "Hooray You got the color correct!";
    }
}

function setColor(element, color)
{
    element.style.backgroundColor = color;
}
