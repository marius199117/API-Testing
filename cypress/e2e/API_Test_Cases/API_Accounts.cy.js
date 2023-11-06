import { expect } from '../../support/commands';

describe('Test Accounts Request', () => {
    it('GET 2536 Account', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8000/accounts/2536'

        }).then(response => {
            expect(response.body).to.deep.equal({
                Data: {
                    Account: {
                        accountId: 2536,
                        currency: "test",
                        nickName: "test",
                        accountSchemeName: "test",
                        accountIdentification: "test",
                        accountName: "test",
                        servicerSchemeName: "test",
                        servicerIdentification: "test",
                        createdAt: "2023-05-10T14:00:30.000Z",
                        updatedAt: "2023-05-10T14:00:30.000Z"

                    }
                }
            })
            expect(response.status).to.equal(200)
            expect(response.statusText).to.equal('OK')
        })
    })

    it('GET Account with Invalid Data', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8000/accounts/112233',
            failOnStatusCode: false

        }).then(response => {
            expect(response.body).to.deep.equal({
                message: 'Invalid Account Id',
                errorCode: 404
            });
            expect(response.status).to.equal(404)
            expect(response.statusText).to.equal('Not Found')
        })
    })

    it('GET All Accounts', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8000/accounts'

        }).then(response => {
            cy.fixture('accounts_schema.json').then((schema) => {
                expect(response.status).to.equal(200)
                expect(response.statusText).to.equal('OK')
                expect(response.body).to.be.jsonSchema(schema)
            })
        })
    })
})