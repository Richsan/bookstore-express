const express = require('express');
const router = express.Router();
const { log }  = require('../components/logger');
const languageController = require('../controllers/languages');


/* GET home page. */
router.put('/:language', async function(req, res, next) {
    const lang = req.params["language"].toUpperCase();
    const description = req.body["description"];

    return languageController.upsertLanguage(lang, description)
    .then((response) => {
        const statusCode = (response.updated == true)? 200:201;
        delete response.updated;
        res.status(statusCode).json(response)})
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
    const lang = req.params["language"].toUpperCase();
    return languageController.oneLang(lang)
    .catch((e) => {
            log.error(e); 
            res.status(500).json({error: "server error"});
        })
    .then((response) => {
        const status = (response === undefined)? 404 : 200;
        res.status(status).json(response);
    });
});

router.delete("/:languageid", async function(req, res, _){
    const languageID = req.params["languageid"].toUpperCase();

    return await languageController.deleteOne(languageID)
     .catch((e) => {
            log.error(e); 
            res.status(500).json({error: "server error"});
        })
    .then((response) => {
        const status = (response === undefined)? 404 : 200;
        res.status(status).json(response);
    });
});


module.exports = router;