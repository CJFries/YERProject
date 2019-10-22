
function ophalen() {
    //alert("opgehaald");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var haalGegevensJSON = this.responseText;
            console.log(haalGegevensJSON);
            var haalGegevens = JSON.parse(haalGegevensJSON);
            console.log(haalGegevens);
            var arr = haalGegevens;
            var tabel = "<table border = '1'><tr><th>ID</th><th>Voornaam</th><th>Achternaam</th><th>Rating</th><th>Geboortedatum</th><th>Geslacht</th>"
            for (var i=0;i<arr.length;i++){
                tabel+="<tr><td>"+arr[i].id+"</td><td>"+arr[i].firstName+"</td><td>"+arr[i].lastName+"</td><td>"+arr[i].rating+"</td><td>"+arr[i].dateOfBirth+"</td><td>"+arr[i].gender+"</td></tr>"
            }
            tabel+="</table>";
            document.getElementById("memberlist").innerHTML = tabel;
        }
    }
    xhr.open("GET", "http://localhost:8082/allsquashclubmembers", true);
    xhr.send();
}

function versturen() {
    alert("verstuurd")
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
    postData(mijnGegevens);    
}

function postData(data) {
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
    //alert("gezocht");
    var zoekterm = document.getElementById("zoekterm").value;
    var mijnZoekterm = JSON.stringify(zoekterm);
    var zoekfunctie = new XMLHttpRequest();
    zoekfunctie.onreadystatechange = function() {
    }
    zoekfunctie.open("GET", "http://localhost:8082/zoek/" + zoekterm, true);
    zoekfunctie.send();
}