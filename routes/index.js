var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 const name = req.query["name"];

 res.send(`Ola ${name || "coloque seu nome na variavel name"}`);
});


module.exports = router;
