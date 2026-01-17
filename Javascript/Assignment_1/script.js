function handleCalc(value) {
   switch (value) {
    case "clear":
        document.getElementById("result").innerText = "0";
        document.getElementById("question").innerText = "";
        break;
    case "backspace":
        document.getElementById("question").innerText = document.getElementById("question").innerText.slice(0, -1);
        break;
    case "calculate":
        var question = document.getElementById("question");
        var output = document.getElementById("result");
        var answer = eval(question.innerText);
        if(String(answer).includes(".")) {
            output.innerText = answer.toFixed(2);
        } else {
            output.innerText = answer;
        }
        if(question.innerText == ""){
            output.innerText = "0";
        }
        break;
    default:
        document.getElementById("question").innerHTML += value;
        break;
   }
}   
