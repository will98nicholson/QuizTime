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
var allQuestions = 0;
var clock = document.querySelector("#clock");
var timer = document.querySelector("#beginQuiz");
var prompt = document.querySelector("#prompt");
var container = document.querySelector("#container");
var secondsLeft = 60;
var holdTime = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");

timer.addEventListener("click", function () {

    if (holdTime === 0) {
        holdTime = setInterval(function () {
            secondsLeft--;
            clock.textContent = "Seconds Remaining: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdTime);
                endQuiz();
                clock.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(allQuestions);
});


function render(allQuestions) {

    prompt.innerHTML = "";
    ulCreate.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {
        var questionDisplay = questions[allQuestions].title;
        var choicesDisplay = questions[allQuestions].choices;
        prompt.textContent = questionDisplay;
    }
    // make answer variables into listed elements
    choicesDisplay.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        prompt.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

function compare(event) {
    var element = event.target;

    if (element.matches("li")) {
        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[allQuestions].answer) {
            score++;
            newDiv.textContent = "Correct! The answer is:  " + questions[allQuestions].answer;
        } else {
            secondsLeft = secondsLeft - penalty;
            newDiv.textContent = "Nope! The correct answer is:  " + questions[allQuestions].answer;
        }

    }
    allQuestions++;

    if (allQuestions >= questions.length) {
        endQuiz();
        newDiv.textContent = "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(allQuestions);
    }
    prompt.appendChild(newDiv);

}
// Post-Quiz
function endQuiz() {
    prompt.innerHTML = "";
    clock.innerHTML = "";


    var newH1 = document.createElement("h1");
    newH1.setAttribute("id", "newH1");
    newH1.textContent = "Let's see how you did!"

    prompt.appendChild(newH1);

    var newP = document.createElement("p");
    newP.setAttribute("id", "newP");

    prompt.appendChild(newP);

    if (secondsLeft >= 0) {
        var spareTime = secondsLeft;
        var newP2 = document.createElement("p");
        clearInterval(holdTime);
        newP.textContent = "Final Score: " + spareTime;
        newP2.setAttribute("id", "newP2");
        prompt.appendChild(newP2);
    }

    // text box for score logging
    var newBox = document.createElement("label");
    newBox.setAttribute("id", "newBox");
    newBox.textContent = "Enter your initials: ";

    prompt.appendChild(newBox);

    // enter initials to be logged
    var boxData = document.createElement("input");
    boxData.setAttribute("type", "text");
    boxData.setAttribute("id", "initials");
    boxData.textContent = "";

    prompt.appendChild(boxData);
    // submit 
    var submitData = document.createElement("button");
    submitData.setAttribute("type", "submit");
    submitData.setAttribute("id", "Submit");
    submitData.textContent = "Submit";

    prompt.appendChild(submitData);


    // local storage
    submitData.addEventListener("click", function () {
        var initials = boxData.value;

        if (initials === null) {

            console.log("empty");

        } else {
            var finalScore = {
                initials: initials,
                score: spareTime
            }
            console.log(finalScore);
            var scoreHistory = localStorage.getItem("scoreHistory");
            if (scoreHistory === null) {
                scoreHistory = [];
            } else {
                scoreHistory = JSON.parse(scoreHistory);
            }
            scoreHistory.push(finalScore);
            var newScore = JSON.stringify(scoreHistory);
            localStorage.setItem("scoreHistory", newScore);
            window.location.replace("./ScorePage.html");
        }
    });

} 