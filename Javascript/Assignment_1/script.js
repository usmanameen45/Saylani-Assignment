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
        var result = eval(document.getElementById("question").innerText);
        if(String(result).includes(".")) {
            document.getElementById("result").innerText = result.toFixed(2);
        } else {
            document.getElementById("result").innerText = result;
        }
        break;
    default:
        document.getElementById("question").innerHTML += value;
        break;
   }
}   