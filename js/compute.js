function init() {
    document.getElementById("computeBtn").addEventListener("click", compute);
}

function compute() {
    var data = $('form').serializeArray();
    for (var i = 0; i < data.length; i++) {
        if (data[i].value === "" || data[i].value > 20 || data[i].value<0) {
            return M.toast({html: 'Remplis correctement tes notes', classes: 'red'});
        }
    }
    var meanRAN = computeMean(data.slice(0, 2));
    var meanInitSHS = computeMean(data.slice(2, 8));
    var meanTER = data[8].value;
    var meanLang = data[9].value;
    clearRes();
    fillResUE("ran",meanRAN);
    fillResUE("shs",meanInitSHS);
    var finalMark = computeFinalMark(meanRAN,meanInitSHS,meanTER,meanLang);
    fillFinalMark("finalMark",finalMark)
}

function clearRes() {
    $('.resUe').empty();
}
function fillFinalMark(id,mark){
    var toFill = "";
    if(mark <10){
        toFill= "<h3 class='red-text'>Moyenne du semestre: "+mark+"<br> <i class='large material-icons'>sentiment_dissatisfied</i></h3>"
    }else if(mark === 10){
        toFill = "<h3 class='orange-text'>Moyenne du semestre: "+mark+" <br> <i class='large material-icons'>sentiment_satisfied</i></h3>"
    }else {
        toFill = "<h3 class='green-text'>Moyenne du semestre: "+mark+" <br> <i class='large material-icons'>sentiment_very_satisfied</i></h3>"
    }
    document.getElementById(id).innerHTML += toFill;
    $("#"+id).show();
}

function fillResUE(id,mark){
    var toFill = "";
    if(mark <10){
        toFill= "<h5 class='red-text'>Moyenne de l'UE: "+mark+"</h5>"
    }else if(mark === 10){
        toFill = "<h5 class='orange-text'>Moyenne de l'UE: "+mark+"</h5>"
    }else {
        toFill = "<h5 class='green-text'>Moyenne de l'UE: "+mark+"</h5>"
    }
    document.getElementById(id).innerHTML += toFill;
    $("#"+id).show();
}
function computeMean(data) {
    var sum = 0;
    for (var i = 0; i < data.length; i++) {
        sum += Number(data[i].value.replace(/,/g, '.'));
    }
    return Number(sum / data.length).toFixed(3);
}

function computeFinalMark(ran,shs,ter,lang){
  return ((5*ran + 18*shs  + 4*ter + 3*lang)/30).toFixed(3)
}