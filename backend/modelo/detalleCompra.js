// Variable Mongoose
var mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
var Schema = mongoose.Schema;

// Se crea el esquema
var detalleCompraSchema = Schema({
  idCurso: { type: Schema.ObjectId, ref: "curso" },
  idCompra: { type: Schema.ObjectId, ref: "compra" },
  cantidad: Number,
});
// Se exporta el modulo
module.exports = mongoose.model("detallecompra", detalleCompraSchema);