import Ajv from 'ajv';
const ajv = new Ajv();
const apiBaseURL = Cypress.env('CYPRESS_BASE_URL');
const requestInfo = JSON.parse(
    JSON.stringify({ url: '/user/createWithArray', method: 'POST' })
);
requestInfo.url = apiBaseURL + requestInfo.url;

describe('Creates list of users with given input array', () => {
    it('successful operation', () => {
        cy.fixture(
            '200_applciation_json_application_json_createUsersWithArrayInput'
        ).then((fixtureResponse) => {
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
