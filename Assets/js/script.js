var questions = [
    {
        ask: "The data type that contains one of two possible values, usually True or False, is known as:",
        selection: ["string", "boolean", "number", "integer"],
        correct: "boolean"
    },
    {
        ask: "Which of the following is the coding language that is used to style and format the layout of a webpage?",
        selection: ["CSS", "Javascript", "HTML", "HooliTech"],
        correct: "CSS"
    },
    {
        ask: "Which HTML element tag is generally the most useful when dealing with Flexboxes?",
        selection: ["head", "div", "body", "footer"],
        correct: "div"
    },
    {
        ask: "In Javascript, values of an array must be enclosed by:",
        selection: ["brackets", "question marks", "quotation marks", "parentheses"],
        correct: "brackets"
    },

];
var allQuestions = 0;


//HTML IDs
var newUl = document.createElement("ul");
var clock = document.querySelector("#clock");
var timer = document.querySelector("#beginQuiz");
var prompt = document.querySelector("#prompt");
var container = document.querySelector("#container");


var secondsLeft = 60;
var holdTime = 0;
var dockTime = 10;
var score = 0;




//countdown
timer.onclick = function () {

    if (holdTime === 0) {
        holdTime = setInterval(function () {
            secondsLeft--;
            clock.textContent = "Seconds Remaining: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdTime);
                endQuiz();
                clock.textContent = "You're outta time!";
            }
        }, 1000);
    }
    render(allQuestions);
};


function render(allQuestions) {

    prompt.innerHTML = "";
    newUl.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {
        var questionDisplay = questions[allQuestions].ask;
        var selectionDisplay = questions[allQuestions].selection;
        prompt.textContent = questionDisplay;
    }
    // make variables into listed elements
    selectionDisplay.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        prompt.appendChild(newUl);
        newUl.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

function compare(event) {
    var element = event.target;

    if (element.matches("li")) {
        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", "newDiv");
        if (element.textContent == questions[allQuestions].correct) {
            score++;
            newDiv.textContent = "Correct!";
        } else {
            secondsLeft = secondsLeft - dockTime;
            newDiv.textContent = "Nope! The answer you're looking for is:  " + questions[allQuestions].correct;
        }

    }
    allQuestions++;

    if (allQuestions >= questions.length) {
        endQuiz();
        newDiv.textContent = "You answered  " + score + "out of" + questions.length + " Q's correctly!";
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

    // enter initials to keep score in local memory
    var boxData = document.createElement("input");
    boxData.setAttribute("type", "text");
    boxData.setAttribute("id", "enterInitials");
    boxData.textContent = "";

    prompt.appendChild(boxData);
    // submit to local storage
    var submitData = document.createElement("button");
    submitData.setAttribute("type", "submit");
    submitData.setAttribute("id", "Submit");
    submitData.textContent = "Submit";

    prompt.appendChild(submitData);


    // local storage
    submitData.addEventListener("click", function () {
        var enterInitials = boxData.value;

        if (enterInitials === null) {

            console.log("empty");

        } else {
            var finalScore = {
                enterInitials: enterInitials,
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

