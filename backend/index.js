//Variables globlales de modulos
let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
//variable para puero de conexion del servidor
let port = process.env.PORT || 3001;

//variable que ejecuta la aplicacion
let app = express();

//routes
let Usuario=require("./routes/usuario");
//conexion a DB
mongoose.connect("mongodb://localhost:27017/bitstoredb",{ useUnifiedTopology:true, useNewUrlParser:true}, (err, res) => {
  if (err) {
    console.log(err);
    throw err;
  } else {
    console.log("Servidor DB:ON");
    app.listen(port, function () {
      console.log("servidor backend funcionado en el puerto" + port);
    });
  }
});

//Analizar las url 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//usar las rutas api
app.use("/api",Usuario);
//cramos modulo para importar
module.exports = app;
