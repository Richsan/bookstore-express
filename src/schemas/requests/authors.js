const postAuthorRequest = {
    name: {
        in: ['body'],
        trim: {

        },
        escape: {

        },
        isLength: {
            options: {
                min: 3,
                max: 50,
            },
            errorMessage: 'name can\'t have more than 50 characters nor less than 2 characters'
        }
    }
};

const getAuthorIdRequest = {
    authorid: {
        in: ['params'],
        isInt: true,
        toInt: true,
        errorMessage: "Id should be an integer number"
    }
};

module.exports = {
    postAuthorRequest,
    getAuthorIdRequest
};