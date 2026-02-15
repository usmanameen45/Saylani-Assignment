var main = document.getElementById("js-div");
var selectDiv = document.getElementById("select-div");
var scoreDisplay = document.getElementById("score");

var backgroundColors = ["maroon", "olive", "aqua", "indigo", "violet", "gold", "silver"];

function getRandomColor() {
    var randomIndex = Math.floor(Math.random() * backgroundColors.length);
    return backgroundColors[randomIndex];
}

selectDiv.style.backgroundColor = getRandomColor();

for (var i = 1; i <= 20; i++) {
    var div = document.createElement("div");
    div.innerHTML = i;
    div.style.width = "200px";
    div.style.height = "200px";
    div.style.border = "1px solid black";
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.cursor = "pointer";
    div.style.backgroundColor = getRandomColor();
    main.appendChild(div);
}


var score = 0;
var lives = 3;
var heart = "❤️";
document.getElementById("heart").innerHTML = heart.repeat(lives);

main.addEventListener("click", function(event) {
    if (event.target.style.backgroundColor === selectDiv.style.backgroundColor) {
        score++;
        scoreDisplay.innerHTML = "Score : " + score;
        selectDiv.style.backgroundColor = getRandomColor();
        event.target.style.backgroundColor = getRandomColor();
    }
    else {
        event.target.style.backgroundColor = getRandomColor();
        lives--;
        document.getElementById("heart").innerHTML = heart.repeat(lives);
        if (lives <= 0) {
            scoreDisplay.innerHTML = "Score : Game Over";
           setTimeout(() => {
            alert("Game Over!");
            location.reload();
        }, 50); // small delay so heart disappears first

        return;
        }
    }
});


