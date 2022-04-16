const expressValidator = require('express-validator');

function checkSchema(schema) {
    return [expressValidator.checkSchema(schema),
        function (req, res, next) {
            const errors = expressValidator.validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array().map(e => ({
                        'param': e.param,
                        'msg': e.msg
                    }))
                });
            }
            next();
        }
    ]
}

module.exports = {
    checkSchema
};