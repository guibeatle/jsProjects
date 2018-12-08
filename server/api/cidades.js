var express = require("express");
var Cidades = require("../models/cidades");

var router = express.Router();

router.get("/", (req, res) => {
  Cidades.retornaTodas((err, cidades) => {
    if (err) return res.json(err);
    return res.json(cidades);
  });
});

module.exports = router;
