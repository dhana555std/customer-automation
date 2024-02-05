import { ajv } from '../../../support/e2e';
const apiBaseURL = Cypress.env('CYPRESS_BASE_URL');
const requestInfo = JSON.parse(JSON.stringify({ url: '/pet', method: 'POST' }));
requestInfo.url = apiBaseURL + requestInfo.url;

describe('Add a new pet to the store', () => {
    it('200 POST application/json application/xml Invalid input', () => {
        cy.fixture('200_application_json_application_xml_addPet').then(
            (fixtureResponse) => {
                requestInfo.headers = fixtureResponse.headers
                    ? fixtureResponse.headers
                    : '';
                requestInfo.body = fixtureResponse.payload
                    ? fixtureResponse.payload
                    : '';
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

    it('200 POST application/xml application/xml Invalid input', () => {
        cy.fixture('200_application_xml_application_xml_addPet').then(
            (fixtureResponse) => {
                requestInfo.headers = fixtureResponse.headers
                    ? fixtureResponse.headers
                    : '';
                requestInfo.body = fixtureResponse.payload
                    ? fixtureResponse.payload
                    : '';
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

    it('400 POST  application/xml s', () => {
        cy.fixture('400__application_xml_addPet').then((fixtureResponse) => {
            requestInfo.headers = fixtureResponse.headers
                ? fixtureResponse.headers
                : '';
            requestInfo.body = fixtureResponse.payload
                ? fixtureResponse.payload
                : '';
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
