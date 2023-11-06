import { expect } from '../../support/commands';

describe('User Login', () => {
    it('Should successfully login', () => {
        cy.request({
            method: 'POST',
            url: 'https://api.brillovate.net/auth/signIn',
            body: {
                "username": "bence.tokos@brillio.com",
                "password": "Bence@2022!"
            }

        }).then(response => {
            cy.fixture('login_schema.json').then((schema) => {
                expect(response.status).to.equal(200)
                expect(response.statusText).to.equal('OK')
                expect(response.body).to.be.jsonSchema(schema)
            })
        })
    })

    it('Try to login with invalid credentials', () => {
        cy.request({
            method: 'POST',
            url: 'https://api.brillovate.net/auth/signIn',
            failOnStatusCode: false,
            body: {
                "username": "incorrect",
                "password": "incorrect"
            }

        }).then(response => {
            expect(response.status).to.equal(400)
            expect(response.statusText).to.equal('Bad Request')
            expect(response.body.errorMessage).to.equal('Incorrect username or password.');
        })
    })
})
