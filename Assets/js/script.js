var questions = [
    {
        title: "The data type that contains one of two possible values, usually True or False, is known as:",
        choices: ["string", "boolean", "number", "integer"],
        answer: "boolean"
    },
    {
        title: "Which of the following is the coding language that is used to style and format the layout of a webpage?",
        choices: ["CSS", "Javascript", "HTML", "HooliTech"],
        answer: "CSS"
    },
    {
        title: "Which HTML element tag is generally the most useful when dealing with Flexboxes?",
        choices: ["head", "div", "body", "footer"],
        answer: "div"
    },
    {
        title: "In Javascript, values of an array must be enclosed by:",
        choices: ["brackets", "question marks", "quotation marks", "parentheses"],
        answer: "brackets"
    },

];

var score = 0;
var questionIndex = 0;


var clock = document.querySelector("#clock");
var timer = document.querySelector("#beginQuiz");
var prompt = document.querySelector("#prompt");
var container = document.querySelector("#container");


var secondsLeft = 60;

var holdTime = 0;

var penalty = 10;

var ulCreate = document.createElement("ul");

timer.addEventListener("click", function () {
    // We are checking zero because its originally set to zero
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

