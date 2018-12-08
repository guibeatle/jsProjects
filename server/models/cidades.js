const db = require("../database");

class Cidades {
  static retornaTodas(callback) {
    db.query(
      "SELECT nome, geocodigo, uf_id from bc250.lim_municipio_a",
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
  static retornaTodasPorEstado(geocodigoEstado, callback) {
    db.query(
      "SELECT nome, geocodigo, uf_id from bc250.lim_municipio_a WHERE geocodigo = $1",
      geocodigoEstado.geocodigo,
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}

module.exports = Cidades;
