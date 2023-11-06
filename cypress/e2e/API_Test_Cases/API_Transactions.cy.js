import { expect } from '../../support/commands';

describe('Test Account Transactions Request', () => {
    it('GET Transactions for 2536 Account', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8000/accounts/2536/transactions'

        }).then(response => {
            expect(response.body).to.deep.equal({
                Data: {
                    Transaction: [
                        {
                            "accountId": 2536,
                            "creditDebitIndicator": "test",
                            "amount": 12555,
                            "currency": "USD",
                            "createdAt": "2023-05-10T14:03:03.000Z",
                            "updatedAt": "2023-05-10T14:03:03.000Z"
                        }
                    ]
                }
            })
            expect(response.status).to.equal(200)
            expect(response.statusText).to.equal('OK')
        })
    })

    it('GET Transaction with Invalid Account', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8000/accounts/112233/transactions',
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

    it('GET Transactions for All Accounts', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8000/transactions'

        }).then(response => {
            cy.fixture('transactions_schema.json').then((schema) => {
                expect(response.status).to.equal(200)
                expect(response.statusText).to.equal('OK')
                expect(response.body).to.be.jsonSchema(schema)
            })
        })
    })
})