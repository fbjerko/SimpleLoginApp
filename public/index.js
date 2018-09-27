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
      alert("User " + username + " has been added");
      sjekkPassord();
    }

   if(xhttp.readyState === 4 && xhttp.status === 400) {
      alert("User " + username + " already exists");
      leggTilID();
  }

   
    
  };
  xhttp.open('POST', 'https://fbjerko-login-page.herokuapp.com/api', true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send('{"username": "'+ username +'", "email": "'+ email +'", "password": "'+password+'"}');
 
}


function loginSuccess() {
  document.getElementById("username").value = "";
   document.getElementById("email").value = "";
  document.getElementById("password").value = "";
location.reload();
}

function loginFailed() {

}
