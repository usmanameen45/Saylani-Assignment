function clock(){
    // all varaible declaration
    var time = new Date();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    var day = time.getDate();
    var month = time.getMonth();
    var year = time.getFullYear();
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // amPm logic
    var amPm;
    if(hour >= 12){
        amPm = "PM";
    }else{
        amPm = "AM";
    }
    if(hour > 12){
        hour = hour - 12;
    }
    // time formating
    if(hour < 10){
        hour = "0" + hour;
    }
    if(minute < 10){
        minute = "0" + minute;
    }
    if(second < 10){
        second = "0" + second;
    }
    if(day < 10){
        day = "0" + day;
    }
    // time display
    document.getElementById("hour").innerText = hour;
    document.getElementById("minute").innerText = minute;
    document.getElementById("second").innerText = second;
    document.getElementById("amPm").innerText = amPm;
    document.getElementById("day").innerText = day;
    document.getElementById("month").innerText = months[month];
    document.getElementById("year").innerText = year;
}
clock();
setInterval(clock, 1000);