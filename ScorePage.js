var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var startOver = document.querySelector("#startOver");


clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});


var scoreHistory = localStorage.getItem("scoreHistory");
scoreHistory = JSON.parse(scoreHistory);

if (scoreHistory !== null) {

    for (var i = 0; i < scoreHistory.length; i++) {

        var newLi = document.createElement("li");
        newLi.textContent = scoreHistory[i].enterInitials + " " + scoreHistory[i].score;
        highScore.appendChild(newLi);

    }
}
startOver.addEventListener("click", function () {
    window.location.replace("./index.html");
});