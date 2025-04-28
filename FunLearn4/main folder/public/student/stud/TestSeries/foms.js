let answers = ["A", "C", "C","C"],
    tot = answers.length;
function getCheckedValue(radioName) {
    let radios = document.getElementsByName(radioName);
    for (let y = 0; y < radios.length; y++){ 

        console.log(radios[y]);
        if (radios[y].checked) return radios[y].value;
    } 
    
}
function getScore() {
    let score = 0;
    for (let i = 0; i < tot; i++)
        if (getCheckedValue("question" + i) === answers[i]) score += 1;
    return score;
}
function returnScore() { 
    document.getElementById("myresults").innerHTML =
        "Your score is " + getScore() + "/" + tot;
    if (getScore() > 2) {
      
        console.log("Bravo");
    }
}
