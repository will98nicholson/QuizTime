var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var startOver = document.querySelector("#startOver");

//start over clear buttons
clear.onclick = function () {
    localStorage.clear();
    location.reload();
};
startOver.onclick = function () {
    window.location.replace("./index.html");
};
//list scores on leaderboard
var scoreHistory = localStorage.getItem("scoreHistory");
scoreHistory = JSON.parse(scoreHistory);

if (scoreHistory !== null) {

    for (var i = 0; i < scoreHistory.length; i++) {

        var newLi = document.createElement("li");
        newLi.textContent = scoreHistory[i].enterInitials + " " + scoreHistory[i].score;
        highScore.appendChild(newLi);

    }
}
