//variable donde se importa el modulo usuaro
let Usuario = require("../modelo/usuario");
//variable para importar la libreria de password
let bcrypt = require("bcrypt-nodejs");

//funcion que registra un usario
const registrarUsuario = (req, res) => {
  //Sacamos los parametros del body del JSON(viene en la API)
  let params = req.body;
  //uyilizar el modelo usuario(pero limpio)
  let usuario = new Usuario();
  //validamos el pass para encriptarlos
  if (params.pass) {
    //Usamos bcrypt para encriptar el pass
    bcrypt.hash(params.pass, null, null, function (err, hash) {
      //si se encripta la contraseña
      if (hash) {
        usuario.nombres = params.nombres;
        usuario.apellidos = params.apellidos;
        usuario.edad = params.edad;
        usuario.correo = params.correo;
        usuario.pass = hash;
        usuario.rol = params.rol;
        //enviamos al modelo para registrar en mongoDB
        usuario.save((err, saveUsuario) => {
          if (err) {
            //si hay un error
            res.status(500).send({ err: "No se registro el usuario" });
          } else {
            //si el proceso se completo
            res.status(200).send({ usuario: saveUsuario });
          }
        });
      } else {
        //damos respuesta al erro de encriptacion si lo hay
        res
          .status(400)
          .send({ err: "no se encripto el pass y no se resgistro el usuario" });
      }
    });
  } else {
    //validacion de datos del json
    res.status(405).send({ err: "No se guardo ningun dato" });
  }
};

const login = (req, res) => {
  //variable para para parametros que llegan
  let params = req.body;
  //Buscamos el usuario en BD
  Usuario.findOne({ correo: params.correo }, (err, datosUsuario) => {
    if (err) {
      res.status(500).send({ mensaje: "Error del servidor" });
    } else {
      if (datosUsuario) {
        bcrypt.compare(params.pass, datosUsuario.pass, function (err, confirm) {
          if (confirm) {
            if (params.getToken) {
              res.status.send({ Usuario: datosUsuario });
            } else {
              res
                .status(200)
                .send({ Usuario: datosUsuario, mensaje: "sin token" });
            }
          } else {
            res.status(401).send({ mensaje: "correo o password incorrectos" });
          }
        });
      } else {
        res.status(401).send({ mensaje: "correo o password incorrectos" });
      }
    }
  });
};
module.exports = {
  registrarUsuario,
  login,
};
