// Variable Mongoose
var mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
var Schema = mongoose.Schema;

// Se crea el esquema
var compraSchema = Schema({
  idEstudiante: { type: Schema.ObjectId, ref: "estudiante" },
  idUsuario: { type: Schema.ObjectId, ref: "usuario" },
  fechaCompra: { type: Date, default: Date.now },
});
// Se exporta el modulo
module.exports = mongoose.model("compra", compraSchema);