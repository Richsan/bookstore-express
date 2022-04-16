const app = require('../../src/app');
const request = require('supertest');

const {
    ExpectationFailed
} = require("http-errors");

describe('Author endpoints', () => {
    it('should return 201 when requestig create an author', async () => {
        const res = await request(app)
            .post('/authors')
            .send({
                name: 'J.K. Roling',
                citation_name: 'J.K.',
                biography: 'Harry Potter\'s author',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toMatchObject({
            id: 1,
            name: 'J.K. Roling',
            citation_name: 'J.K.',
            biography: 'Harry Potter\'s author',
        });
    });
    it('should return 200 when get request an single author', async () => {
        const res = await request(app)
            .get('/authors/1')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject({
            id: 1,
            name: 'J.K. Roling',
            citation_name: 'J.K.',
            biography: 'Harry Potter\'s author',
        });
    });

    it('should return 400 when get request an not number author id', async () => {
        const res = await request(app)
            .get('/authors/acacaca')
            .send();
        expect(res.statusCode).toEqual(400);
        expect(res.body).toMatchObject({
            errors: [{
                param: 'authorid',
                msg: 'Id should be an integer number'
            }]
        });
    });


    it('should return 400 when author\'s name has more than 50 characters', async () => {
        const res = await request(app)
            .post('/authors')
            .send({
                name: 'Mussum Ipsum cacilds vidis litro abertis. A ordem dos tratores não altera o pão duris.Manduma pindureta quium dia nois paga.',
                citation_name: 'J.K.',
                biography: 'Harry Potter\'s author',
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toMatchObject({
            errors: [{
                'param': 'name',
                'msg': 'name can\'t have more than 50 characters nor less than 2 characters'
            }]
        });
    });

    it('should return 400 when author\'s name has less than 2 characters', async () => {
        const res = await request(app)
            .post('/authors')
            .send({
                name: 'Ip',
                citation_name: 'J.K.',
                biography: 'Harry Potter\'s author',
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toMatchObject({
            errors: [{
                'param': 'name',
                'msg': 'name can\'t have more than 50 characters nor less than 2 characters'
            }]
        });
    });

    it('should return 400 when author\'s name has empty characters', async () => {
        const res = await request(app)
            .post('/authors')
            .send({
                name: '   ',
                citation_name: 'J.K.',
                biography: 'Harry Potter\'s author',
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toMatchObject({
            errors: [{
                'param': 'name',
                'msg': 'name can\'t have more than 50 characters nor less than 2 characters'
            }]
        });
    });
});