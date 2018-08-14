const express = require ("express");
var bodyParser = require('body-parser')

const app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.post('/api/login', peticion)
app.post('/api/login', (req, response) => {
  console.log("Peticion Recibida.");
  const postBody = req.body;
  //console.log(postBody);
  var user_name = req.body.user;
  
  //var user_name = request.body.user;
  var psw = req.body.pwd;
  //response.writeHead(200, {"Content-Type": "text/html"});

  var index = searchUser(employee,user_name);

  //validar que existe el usuario
  if (index != -1){
    if (pwd(employee[index].pwd,psw)){
      response.json({
        "status": "ok",
        "msg": {
            "username": employee[index].user_name,
            "name": employee[index].nombre,
            "lastname": employee[index].apellido,
            "profilePicture": employee[index].photo
        }
      })
    }
    else{
      response.json({
        "status": "error",
        "msg": "error al iniciar sesión"
      })
    }
      //response.write(employee[index].nombre);
  } else{
    response.json({
      "status": "error",
      "msg": "error al iniciar sesión"
    })
  }
});

const port = 5000;

app.listen(port,() => console.log(`Server running on port ${port}`));
// Cargar el modulo HTTP
//var http = require('http');

//Archivo json
const fs = require('fs');
let rawdata = fs.readFileSync('./employees.json');  
let employee = JSON.parse(rawdata);
 
//buscar usuario
 function searchUser(users, user){
  for (var i = 0; i < employee.length; ++i){
    if (users[i].user_name == user){
      return i;
    } 
  }
  return -1;
}

//comparar pwd
 function pwd(original, pwd){
  var crypto = require('crypto');
  var cry = crypto.createHash('md5').update(pwd).digest("hex");
  if (original == cry)
    return true;
  return false;
 }

