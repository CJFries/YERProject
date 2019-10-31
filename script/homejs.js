
function sendAndLoad() {
    inschrijvenToernooi();
    window.location.reload();
}

function ophalenInschrijvingen() {
    //alert("opgehaald");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var haalGegevensJSON = this.responseText;
            console.log(haalGegevensJSON);
            var haalGegevens = JSON.parse(haalGegevensJSON);
            console.log(haalGegevens);
            var arr = haalGegevens;
            var tabel = "<table border = '1'><tr><th>ID</th><th>Voornaam</th><th>Achternaam</th><th>Rating</th><th>Leeftijd</th><th>Geslacht</th>"
            for (var i=0;i<arr.length;i++){
                tabel+="<tr><td>"+arr[i].id+"</td><td>"+arr[i].firstName+"</td><td>"+arr[i].lastName+"</td><td>"+arr[i].rating+"</td><td>"+arr[i].age+"</td><td>"+arr[i].gender+"</td></tr>"
            }
            tabel+="</table>";
            document.getElementById("memberlist").innerHTML = tabel;
            document.getElementById("totaalaantalspelers").innerHTML = "Totaal aantal spelers: " + arr.length;
            //console.log(arr.length);
            document.getElementById("ledenlijstnaam").innerHTML = "Spelerlijst: ";
        }
    }
    xhr.open("GET", "http://localhost:8082/allsquashclubmembers", true);
    xhr.send();
}

function inschrijvenToernooi() {
    //alert("verstuurd")
    var voornaam = document.getElementById("vn").value;
    var achternaam = document.getElementById("an").value;
    var rating = document.getElementById("rating").value;
    var geslacht = document.getElementById("geslacht").value;
    var geboortedatum = document.getElementById("gebdat").value;

    var mijnGegevensObject = {}
    mijnGegevensObject.firstName = voornaam;
    mijnGegevensObject.lastName = achternaam;
    mijnGegevensObject.rating = rating;
    mijnGegevensObject.gender = geslacht;
    mijnGegevensObject.dateOfBirth = geboortedatum;

    var mijnGegevens = JSON.stringify(mijnGegevensObject)
    //console.log(mijnGegevens);
    postDataInschrijvenToernooi(mijnGegevens);    
}

function postDataInschrijvenToernooi(data) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 202) {
            document.getElementById("demo").innerHTML = this.responseText;
        }
    };
    xhttp.open("POST", "http://localhost:8082/allsquashclubmembers", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(data);
    //console.log(data);
}

function zoeken() {
    var zoekterm = document.getElementById("zoekterm").value;
    var mijnZoekterm = JSON.stringify(zoekterm);
    var zoekfunctie = new XMLHttpRequest();
    zoekfunctie.onreadystatechange = function() {
    }
    zoekfunctie.open("GET", "http://localhost:8082/zoek/" + zoekterm, true);
    zoekfunctie.send();
    alert("gezocht op: " + zoekterm);
}

function scoresOphalen() {
}

function scoresInvoeren() {
    var score1 = document.getElementById("score1").value;
    var score2 = document.getElementById("score2").value;
    
}