const express = require('express');
const router = express.Router();
const {
    log
} = require('../components/logger');
const authorsController = require('../controllers/authors');
const {
    checkSchema
} = require('../components/validator');
const {
    param
} = require('.');

const {
    postAuthorRequest,
    getAuthorIdRequest
} = require('../schemas/requests/authors');

router.post("/", checkSchema(postAuthorRequest),
    async function (req, res, _) {

        return await authorsController.insert(req.body)
            .then((v) => res.status(201).json(v))
            .catch((e) => {
                log.error(e);
                res.status(500).json({
                    error: "server error"
                })
            });
    });

router.get("/", async function (req, res, _) {

    return await authorsController.fetchAll()
        .catch((e) => {
            log.error(e);
            res.status(500).json({
                error: "server error"
            });
        })
        .then((response) => res.status(200).json(response));
});

router.get("/:authorid",
    checkSchema(getAuthorIdRequest),
    async function (req, res, _) {
        const authorID = req.params["authorid"];

        return await authorsController.fetchOne(authorID)
            .catch((e) => {
                log.error(e);
                res.status(500).json({
                    error: "server error"
                });
            })
            .then((response) => {
                const status = (response === undefined) ? 404 : 200;
                res.status(status).json(response);
            });
    });

router.delete("/:authorid", async function (req, res, _) {
    const authorID = parseInt(req.params["authorid"]);

    return await authorsController.deleteOne(authorID)
        .catch((e) => {
            log.error(e);
            res.status(500).json({
                error: "server error"
            });
        })
        .then((response) => {
            const status = (response === undefined) ? 404 : 200;
            res.status(status).json(response);
        });
});

router.patch("/:authorid", async function (req, res, _) {
    const authorID = req.params["authorid"];
    const name = req.body["name"];
    const citation_name = req.body["citation_name"];
    const biography = req.body["biography"];

    return authorsController.update({
            id: authorID,
            name: name,
            citation_name: citation_name,
            biography: biography
        })
        .then((response) => res.status(200).json(response))
        .catch((e) => {
            log.error(e);
            return res.status(400).json({
                error: "Error when updating author"
            });
        });
});

module.exports = router;