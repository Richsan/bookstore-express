const express = require('express');
const router = express.Router();
const { log }  = require('../components/logger');
const languageController = require('../controllers/languages');


/* GET home page. */
router.post('/:language', async function(req, res, next) {
    const lang = req.params["language"];
    const description = req.body["description"];

    return languageController.insertLanguage(lang, description)
    .then((response) => res.status(201).json(response))
    .catch((e) => {
         log.error(e);
         return res.status(400).json({error: "Error when inserting language"});
    });
    
});

router.get('/', async function(req, res, next) {
    const response = await languageController.allLangs();

    return res.status(200).json(response);
});

router.get('/:language', async function(req, res, next) {
    const lang = req.params["language"];
    const response = await languageController.oneLang(lang);

    return res.status(200).json(response);
});


module.exports = router;