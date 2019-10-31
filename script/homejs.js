
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
    
<<<<<<< HEAD
        if(this.readyState == 4 && this.status == 200) {
            var haalScoresJSON = this.responseText;
        }
    }  
}*/

function addUser(){
    alert("add user called");
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var role = document.getElementById("role").value;
    if (username && password && role){
        var data = '{"username":"'+username+'", "password":"'+password+'", "role":"'+role+'"}';
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            console.log(this.readyState + "-" + this.status);
            if(this.readyState === 4 && this.status === 200){
                if(JSON.parse(this.responseText).body.username){
                    var user = JSON.parse(this.responseText).body;
                    document.getElementById("result").innerText =username + " added succesfully"
                } else {
                    document.getElementById("result").innerText = "User not added";
                }
            }    
        };
        xhttp.open("POST", "http://localhost:8082/api/user/add");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(data);
    } else{
        document.getElementById("header").innerText = "Please fill in all the fields";
    }
}

function homeKnop(){
    window.location.href="Home.html"
}

function init(){
    document.getElementById("username").value = "[[${#httpServletRequest.remoteUser}]]";
}

function logout(){
    localStorage.clear();
    navigate("logout");
}
function navigate(url){
    location.href= url;
}
function getAllUser (){
    var api = "api/user/all";
}
function getSingleUser(){
    checkUsernameAndGetData("/user");
}
function isUserExist(){
    checkUsernameAndGetData("/user/exist/");
}
function checkUsernameAndGetData(path){
    if(document.getElementById("username").value){
        var api = "api/" + path + document.getElementById("username").value;
        getData(api);
    } else{
        document.getElementById("demo").innerHTML = "Please enter a username";
    }
}
function deleteUser(){
    var usernameForDelete = document.getElementById("username").value;
    deleteData("api/user/"+usernameForDelete);
}
function postData(api, data){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 202){
            document.getElementById("demo").innerHTML = this.responseText;
        }
    };
    xhttp.open("POST", "http://localhost:8082/"+api, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(Data);
}
function deleteData(api){
    var xhttp = new XMLHttpRequest();
        document.getElementById('apiUrl').value = api;
        clearContainer();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                document.getElementById("demo").innerHTML = JSON.parse(this.responseText).body;
            }
        };
        xhttp.open("DELETE", "http://localhost:8082/"+api, true);
        xhttp.send();
}
function getData(api){
    var xhttp = new XMLHttpRequest();
    document.getElementById("apiUrl").value = api;
        xhttp.onreadystatechange = function() {
        var demo = document.getElementById("demo");
        if (this.readyState === 4 && this.status === 200) {
            clearContainer();
            var parsed = JSON.parse(this.responseText).body;
            if(typeof parsed === "boolean"){
                demo.append(document.createTextNode("User exists: " + parsed));
            } else if(!parsed.hasOwnProperty("username")){
                for(x in parsed){
                    addUserToResult(parsed[x].username, parsed[x].password, parsed[x].role);
                }
            } else{
                addUserToResult(parsed.username, parsed.password, parsed.role);
            }
        } else if(this.status === 500){
            demo.append(document.createTextNode("Can't get the user(s)"));
            xhttp.abort();
        }
    };
    xhttp.open("GET","http://localhost:8082/"+api);
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send();
}
function clearContainer(){
    document.getElementById("demo").innerHTML = "";
}
function addUserToResult(username, password, role){
    var demo = document.getElementById("demo");
    demo.append(document.createElement("LABEL").innerText = "Username: " +username+ " - Role:" + role);
    demo.append(document.createElement("BR"));
    demo.append(document.createElement("LABEL").innerText = "Password: "+ password);
    demo.append(document.createElement("HR"));
=======
>>>>>>> master
}