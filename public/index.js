function addUser(event) {
  event.preventDefault()
  username = document.getElementById("username").value;
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;

  var xhttp = new XMLHttpRequest();

  var json = '{"username": "112dsfasdasaDd1", "email": "f.bjerko@gmail", "password": "1232231"}';
  
  xhttp.onreadystatechange = function() {

    if(xhttp.readyState === 4 && xhttp.status === 200) {
      // Bruker finnes, sjekker passord
      //alert("User " + username + " has been added");
      loginAttempt();
      
    }

   if(xhttp.readyState === 4 && xhttp.status === 400) {
      alert("User " + username + " already exists");
      loginAttempt();
   }

   
    
  };
  xhttp.open('POST', 'https://fbjerko-login-page.herokuapp.com/api', true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send('{"username": "'+ username +'", "email": "'+ email +'", "password": "'+password+'"}');
 
}


function loginAttempt() {
  document.getElementById("username").value = "";
   document.getElementById("email").value = "";
  document.getElementById("password").value = "";
document.getElementById("modal").innerHTML = "User " + username + " has been added";
modal.style.display = "block";
}

function toAdminPage() {
  window.open('https://fbjerko-login-page.herokuapp.com/admin', '_blank');
}

function loginFailed() {

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
} 
