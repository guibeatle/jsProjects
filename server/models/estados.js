const db = require("../database");

class Estados {
  static retrieveAll(callback) {
    db.query(
      "SELECT nome, geocodigo from bc250.lim_unidade_federacao_a ORDER BY geocodigo asc",
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}

module.exports = Estados;
