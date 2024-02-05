import { ajv } from '../../../support/e2e';
const apiBaseURL = Cypress.env('CYPRESS_BASE_URL');
const requestInfo = JSON.parse(
    JSON.stringify({ url: '/user/{username}', method: 'GET' })
);
requestInfo.url = apiBaseURL + requestInfo.url;

describe('Get user by user name', () => {
    it('200 GET application/json  successful operation', () => {
        cy.fixture('200_application_json__getUserByName').then(
            (fixtureResponse) => {
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
            }
        );
    });
});
