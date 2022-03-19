const express = require('express');
const router = express.Router();
const { log }  = require('../components/logger');
const publisherController = require('../controllers/publisher');

router.post("/", async function(req, res, _){

    return await publisherController.insert(req.body)
    .then((v) => res.status(201).json(v))
    .catch((e) => {
        log.error(e); 
        res.status(500).json({error: "server error"})});
});

router.get("/", async function(req, res, _){
    return await publisherController.allPublishers()
    .catch((e) => {
            log.error(e); 
            res.status(500).json({error: "server error"});
        })
        .then((response) => res.status(200).json(response));
});

router.delete("/:publisherid", async function(req, res, _){
    const publisherID = parseInt(req.params["publisherid"]);

    return await publisherController.deleteOne(publisherID)
     .catch((e) => {
            log.error(e); 
            res.status(500).json({error: "server error"});
        })
    .then((response) => {
        const status = (response === undefined)? 404 : 200;
        res.status(status).json(response);
    });
});

router.get("/:publisherid", async function(req, res, _){
    const publisherID = parseInt(req.params["publisherid"]);

    return await publisherController.fetchOne(publisherID)
     .catch((e) => {
            log.error(e); 
            res.status(500).json({error: "server error"});
        })
    .then((response) => {
        const status = (response === undefined)? 404 : 200;
        res.status(status).json(response);
    });
});

router.patch("/:publisherid", async function(req, res, _){
    const publisherID = req.params["publisherid"];
    const name = req.body["name"];

    return publisherController.update({id: publisherID, name: name})
    .then((response) => res.status(200).json(response))
    .catch((e) => {
         log.error(e);
         return res.status(400).json({error: "Error when updating publisher"});
    });
});

module.exports = router;