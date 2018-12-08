var { Pool } = require("pg");

const CONNECTION_STRING =
  process.env.DATABASE_URL ||
  "postgresql://guib:harrison1620@192.168.2.120:5432/restore_sisarq_v3";
const SSL = process.env.NODE_ENV === "production";

class Database {
  constructor() {
    this._pool = new Pool({
      connectionString: CONNECTION_STRING,
      ssl: SSL
    });

    this._pool.on("error", (err, client) => {
      console.error("Unexpected error on idle PostgreSQL client.", err);
      process.exit(-1);
    });
  }

  query(query, ...args) {
    this._pool.connect((err, client, done) => {
      if (err) throw err;
      const params = args.length === 2 ? args[0] : [];
      const callback = args.length === 1 ? args[0] : args[1];

      client.query(query, params, (err, res) => {
        done();
        if (err) {
          console.log(err.stack);
          return callback({ error: "Erro no banco de dados." }, null);
        }
        callback({}, res.rows);
      });
    });
  }

  end() {
    this._pool.end();
  }
}

module.exports = new Database();
