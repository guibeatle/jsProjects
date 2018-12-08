var express = require("express");
var Estados = require("../models/estados");

var router = express.Router();

router.get("/", (req, res) => {
  Estados.retrieveAll((err, estados) => {
    if (err) return res.json(err);
    return res.json(estados);
  });
});

module.exports = router;
