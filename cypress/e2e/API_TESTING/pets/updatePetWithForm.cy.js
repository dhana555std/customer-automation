import { ajv } from '../../../support/e2e';
const apiBaseURL = Cypress.env('CYPRESS_BASE_URL');
const requestInfo = JSON.parse(
    JSON.stringify({ url: '/pet/{petId}', method: 'POST' })
);
requestInfo.url = apiBaseURL + requestInfo.url;

describe('Updates a pet in the store with form data', () => {
    it('201 POST application/json application/json Invalid input', () => {
        cy.fixture(
            '201_application_json_application_json_updatePetWithForm'
        ).then((fixtureResponse) => {
            requestInfo.headers = fixtureResponse.headers
                ? fixtureResponse.headers
                : '';
            requestInfo.body = fixtureResponse.payload
                ? fixtureResponse.payload
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
