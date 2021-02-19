var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var startOver = document.querySelector("#startOver");

// Event listener to clear scores 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// Retreives local stroage 
var scoreHistory = localStorage.getItem("scoreHistory");
scoreHistory = JSON.parse(scoreHistory);

if (scoreHistory !== null) {

    for (var i = 0; i < scoreHistory.length; i++) {

        var newLi = document.createElement("li");
        newLi.textContent = scoreHistory[i].initials + " " + scoreHistory[i].score;
        highScore.appendChild(newLi);

    }
}
// Event listener to move to index page
startOver.addEventListener("click", function () {
    window.location.replace("./index.html");
});