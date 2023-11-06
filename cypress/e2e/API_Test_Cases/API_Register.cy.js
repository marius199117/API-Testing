import { expect } from '../../support/commands';

describe('User Registration', () => {
    it('Should successfully sign up a new user', () => {
        cy.generateRandomUsername().then((randomUsername) => {
            cy.request({
                method: 'POST',
                url: 'https://api.brillovate.net/auth/signUp',
                body: {
                    username: randomUsername,
                    password: 'Bence@2022!',
                    firstName: 'firstname',
                    lastName: 'lastName',
                    preferredName: 'preferedName',
                    companyName: 'company_name',
                    jobTitle: 'jobTitle',
                    email: randomUsername,
                    country: 'Australia',
                    product: ['Accounts & Transactions']
                }

            }).then(response => {
                cy.fixture('register_schema.json').then((schema) => {
                    expect(response.status).to.equal(200)
                    expect(response.statusText).to.equal('OK')
                    expect(response.body).to.be.jsonSchema(schema)
                })
            })
        })
    })

    it('Try to register with a mail that already has been registered', () => {
            cy.request({
                method: 'POST',
                url: 'https://api.brillovate.net/auth/signUp',
                failOnStatusCode: false,
                body: {
                    username: "bence.tokos@brillio.com",
                    password: 'Bence@2022!',
                    firstName: 'firstname',
                    lastName: 'lastName',
                    preferredName: 'preferedName',
                    companyName: 'company_name',
                    jobTitle: 'jobTitle',
                    email: "bence.tokos@brillio.com",
                    country: 'Australia',
                    product: ['Accounts & Transactions']
                }

            }).then(response => {
                expect(response.status).to.equal(400)
                expect(response.statusText).to.equal('Bad Request')
                expect(response.body.errorMessage).to.equal('An account with the given email already exists.');
            })
        })

    it('Try to register when username is different than email', () => {
            cy.request({
                method: 'POST',
                url: 'https://api.brillovate.net/auth/signUp',
                failOnStatusCode: false,
                body: {
                    username: "bence.tokos@brillio.com",
                    password: 'Bence@2022!',
                    firstName: 'firstname',
                    lastName: 'lastName',
                    preferredName: 'preferedName',
                    companyName: 'company_name',
                    jobTitle: 'jobTitle',
                    email: "bence.tokos12@brillio.com",
                    country: 'Australia',
                    product: ['Accounts & Transactions']
                }

            }).then(response => {
                expect(response.status).to.equal(400)
                expect(response.statusText).to.equal('Bad Request')
                expect(response.body.errorMessage).to.equal('User email should be empty or same as username, since username attribute is email.');
            })
        })
    })

