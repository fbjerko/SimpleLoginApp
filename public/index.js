function addUser() {

  console.log("SENDT YEAH");
  
 var username = document.getElementById("username").value;
 var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  var xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {

    if(xhttp.readyState === 4 && xhttp.status === 200) {
      // Bruker finnes, sjekker passord
      //alert("User " + username + " has been added");
      newUserSuccess(username);
      
    }

   if(xhttp.readyState === 4 && xhttp.status === 400) {
     
      newUserFailed();
   }
    
  };
  xhttp.open('POST', 'https://fbjerko-login-page.herokuapp.com/api', true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send('{"username": "'+ username +'", "email": "'+ email +'", "password": "'+password+'"}');
 
}

function validate(event) {
  event.preventDefault()

  var username = document.getElementById("username").value;
  if(username === "") {
    document.getElementById("modal").innerHTML = "You must enter a username";
      return loginFailed();
      
  }

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

    var emailRGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var emailResult = emailRGEX.test(email);
    var passwordRGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    var passwordResult = passwordRGEX.test(password);

    if(passwordResult === true && emailResult === true){
      addUser();
    } else if (passwordResult && !emailResult) {
      document.getElementById("modal").innerHTML = "Enter a valid E-Mail address";
      loginFailed();
    } else if (!passwordResult && emailResult) {
      document.getElementById("modal").innerHTML = "Enter a valid Password";
      loginFailed();
    } else {
      document.getElementById("modal").innerHTML = "Enter a valid Email and Password";
      loginFailed();
    }
}


function newUserSuccess(username) {
  document.getElementById("username").value = "";
   document.getElementById("email").value = "";
  document.getElementById("password").value = "";
document.getElementById("modal").innerHTML = "User " + username + " has been added";
modal.style.display = "block";
}

function newUserFailed() {
  document.getElementById("username").value = "";
   document.getElementById("email").value = "";
  document.getElementById("password").value = "";
document.getElementById("modal").innerHTML = "User " + username + " already exists";
modal.style.display = "block";
}

function toAdminPage() {
  window.open('https://fbjerko-login-page.herokuapp.com/admin', '_blank');
}

function loginFailed() {
 
 document.getElementById("password").value = "";
 modal.style.display = "block";
}


var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("submit");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

