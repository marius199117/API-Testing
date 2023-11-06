import { expect } from '../../support/commands';

describe('Test Balances Request', () => {
    it('GET Balance for 2536 Account', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8000/accounts/2536/balance'

        }).then(response => {
            expect(response.body).to.deep.equal({
                Data: {
                    Balance: [
                        {
                            accountId: 2536,
                            amount: 12888,
                            currency: "RON",
                            creditDebitIndicator: "test",
                            createdAt: "2023-05-10T14:01:47.000Z",
                            updatedAt: "2023-05-10T14:01:47.000Z"
                        }
                    ]
                }
            })
            expect(response.status).to.equal(200)
            expect(response.statusText).to.equal('OK')
        })
    })

    it('GET Balance with Invalid Account', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8000/accounts/112233/balance',
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

    it('GET Balances for All Accounts', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8000/balances'

        }).then(response => {
            cy.fixture('balances_schema.json').then((schema) => {
                expect(response.status).to.equal(200)
                expect(response.statusText).to.equal('OK')
                expect(response.body).to.be.jsonSchema(schema)
            })
        })
    })
})