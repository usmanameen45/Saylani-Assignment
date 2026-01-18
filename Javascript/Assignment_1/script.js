var his_arr = [];

function handleCalc(value) {
  switch (value) {
    case "clear":
      document.getElementById("result").innerText = "0";
      document.getElementById("question").innerText = "";
      break;
    case "backspace":
      document.getElementById("question").innerText = document
        .getElementById("question")
        .innerText.slice(0, -1);
      break;
    case "calculate":
      var question = document.getElementById("question");
      var output = document.getElementById("result");
      var answer = eval(question.innerText);
      if (String(answer).includes(".")) {
        output.innerText = answer.toFixed(2);
        his_arr.push(question.innerText + " = " + output.innerText);
        his();
      } else {
        output.innerText = answer;
        his_arr.push(question.innerText + " = " + output.innerText);
        his();
      }
      if (question.innerText == "") {
        output.innerText = "0";
      }
      break;
    default:
      document.getElementById("question").innerHTML += value;
      break;
  }
}

function his() {
  var his = document.getElementById("his");
  his.innerHTML = "";
  for (var i = 0; i < his_arr.length; i++) {
    his.innerHTML += "<p>" + his_arr[i] + "</p>";
  }
}

function showHistory() {
  var his = document.getElementById("his");
  var CHis = document.getElementById("CHis");
  var viewHistory = document.getElementById("view-history");
  var viewCalculator = document.getElementById("view-calculator");
  var output = document.getElementById("output");
  var parent = document.getElementById("parent");
  viewCalculator.style.display = "inline-block";
  his.style.display = "block";
  CHis.style.display = "block";
  viewHistory.style.display = "none";
  output.style.display = "none";
  parent.style.display = "none";
}

function showCalculator() {
  var his = document.getElementById("his");
  var CHis = document.getElementById("CHis");
  var viewHistory = document.getElementById("view-history");
  var viewCalculator = document.getElementById("view-calculator");
  var output = document.getElementById("output");
  var parent = document.getElementById("parent");
  viewCalculator.style.display = "none";
  his.style.display = "none";
  CHis.style.display = "none";
  viewHistory.style.display = "inline-block";
  output.style.display = "block";
  parent.style.display = "grid";
}

function clearHistory() {
  his_arr = [];
  his();
}
