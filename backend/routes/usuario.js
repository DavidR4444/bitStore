//variable exprees:

let express=require("express");
let Usuario=require("../controllers/usuario")

//creamos la api

let api=express.Router();

//servicio POST(registrar) http://localhost:3001/api/registrarUsuario
api.post("/registrarUsuario",Usuario.registrarUsuario)
//servicio ára el login
api.post("/login",Usuario.login)
//exportamos el modulo

module.exports=api;

