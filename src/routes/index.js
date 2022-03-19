var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.status(302).location("/openAPI/swagger.html").send();
});

module.exports = router;