const db = require("../database");

class Cidades {
  static retornaTodasPorEstado(nome, callback) {
    db.query(
      "SELECT bc250.lim_municipio_a.nome AS nme_mun, bc250.lim_municipio_a.uf_geocodigo AS ufId_mun, " +
        "bc250.lim_unidade_federacao_a.nome AS nme_uf FROM bc250.lim_municipio_a " +
        "INNER JOIN bc250.lim_unidade_federacao_a ON " +
        "bc250.lim_municipio_a.uf_geocodigo=bc250.lim_unidade_federacao_a.geocodigo " +
        "WHERE bc250.lim_unidade_federacao_a.nome = $1 ORDER BY nme_mun asc",
      [String(nome)],
      (err, res) => {
        console.log("Response: ");
        console.log(res);
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
  static retornaTodas(callback) {
    db.query(
      "SELECT nome, geocodigo, uf_id from bc250.lim_municipio_a ORDER BY nome asc",
      (err, res) => {
        console.log("Aqio");
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}

module.exports = Cidades;
