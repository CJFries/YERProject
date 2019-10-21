function ophalen() {
    alert("opgehaald");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {

    }
    xhr.open("GET", "http://localhost:8082/allsquashclubmembers", true);
    xhr.send();
    xhr.onload = function() {
        if(this.readyState == 4) {
            var haalGegevensJSON = this.responseText;
            var haalGegevens = JSON.parse(haalGegevensJSON);
            console.log(haalGegevens)
            document.getElementById("id").innerHTML = haalGegevens.id;
            document.getElementById("vnhaal").innerHTML = haalGegevens.firstName;
            document.getElementById("anhaal").innerHTML = haalGegevens.lastName;
            
        }
    }
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
    console.log(mijnGegevens);
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
    console.log(data);
}