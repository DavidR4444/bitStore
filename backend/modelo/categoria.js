// Variable Mongoose
var mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
var Schema = mongoose.Schema;

// Se crea el esquema
var categoriaSchema = Schema({
  nombre: String,
  descripcion: String,
});
// Se exporta el modulo
module.exports = mongoose.model("categoria", categoriaSchema);