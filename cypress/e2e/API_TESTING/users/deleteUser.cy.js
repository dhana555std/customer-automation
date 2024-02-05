import { ajv } from '../../../support/e2e';
const apiBaseURL = Cypress.env('CYPRESS_BASE_URL');
const requestInfo = JSON.parse(
    JSON.stringify({ url: '/user/{username}', method: 'DELETE' })
);
requestInfo.url = apiBaseURL + requestInfo.url;

describe('Delete user', () => {
    it('400 DELETE   Invalid username supplied', () => {
        cy.fixture('400___deleteUser').then((fixtureResponse) => {
            requestInfo.body = fixtureResponse.payload
                ? fixtureResponse.payload
                : '';
            requestInfo.headers = fixtureResponse.headers
                ? fixtureResponse.headers
                : '';
            let pathParams = fixtureResponse.pathParam
                ? fixtureResponse.pathParam
                : '';
            for (const key in pathParams) {
                if (pathParams.hasOwnProperty(key)) {
                    const placeholder = '{' + key + '}';
                    requestInfo.url = requestInfo.url.replace(
                        new RegExp(placeholder, 'g'),
                        pathParams[key]
                    );
                }
            }

            cy.request(requestInfo).then((response) => {
                expect(response.status).to.eq(
                    parseInt(fixtureResponse.responseStatusCode)
                );
                if (
                    fixtureResponse.responseSchema &&
                    fixtureResponse.responseSchema != ''
                ) {
                    const validate = ajv.compile(
                        fixtureResponse.responseSchema
                    );
                    const isValid = validate(response.body);
                    expect(isValid).to.be.true;
                }
            });
        });
    });

    it('404 DELETE   User not found', () => {
        cy.fixture('404___deleteUser').then((fixtureResponse) => {
            requestInfo.body = fixtureResponse.payload
                ? fixtureResponse.payload
                : '';
            requestInfo.headers = fixtureResponse.headers
                ? fixtureResponse.headers
                : '';
            let pathParams = fixtureResponse.pathParam
                ? fixtureResponse.pathParam
                : '';
            for (const key in pathParams) {
                if (pathParams.hasOwnProperty(key)) {
                    const placeholder = '{' + key + '}';
                    requestInfo.url = requestInfo.url.replace(
                        new RegExp(placeholder, 'g'),
                        pathParams[key]
                    );
                }
            }

            cy.request(requestInfo).then((response) => {
                expect(response.status).to.eq(
                    parseInt(fixtureResponse.responseStatusCode)
                );
                if (
                    fixtureResponse.responseSchema &&
                    fixtureResponse.responseSchema != ''
                ) {
                    const validate = ajv.compile(
                        fixtureResponse.responseSchema
                    );
                    const isValid = validate(response.body);
                    expect(isValid).to.be.true;
                }
            });
        });
    });
});
