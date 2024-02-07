const apiBaseURL = Cypress.env('CYPRESS_BASE_URL');
const requestInfo = JSON.parse(
    JSON.stringify({ url: '/posts', method: 'POST' })
);
requestInfo.url = apiBaseURL + requestInfo.url;

describe('fetches the data which is posted', () => {
    it('201 POST application/json application/json created', () => {
        cy.fixture('201_application_json_application_json_createNewPost').then(
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
                });
            }
        );
    });
});
