function addUser(event) {
  event.preventDefault()
  username = document.getElementById("username").value;
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;

  var xhttp = new XMLHttpRequest();

  var json = '{"username": "112dsfasdasaDd1", "email": "f.bjerko@gmail", "password": "1232231"}';
  
  xhttp.onreadystatechange = function() {

   
    
  };
  xhttp.open('POST', 'https://fbjerko-login-page.herokuapp.com/api', true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send('{"username": "'+ username +'", "email": "'+ email +'", "password": "'+password+'"}');
 
}


function loginSuccess() {

}

function loginFailed() {

}
