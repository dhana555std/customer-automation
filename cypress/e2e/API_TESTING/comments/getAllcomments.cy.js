const apiBaseURL = Cypress.env('CYPRESS_BASE_URL');
const requestInfo = JSON.parse(
    JSON.stringify({ url: '/comments', method: 'GET' })
);
requestInfo.url = apiBaseURL + requestInfo.url;

describe('Get all the comments', () => {
    it('200 GET application/json  successful operation', () => {
        cy.fixture('200__getAllcomments').then((fixtureResponse) => {
            requestInfo.headers = fixtureResponse.headers
                ? fixtureResponse.headers
                : '';
            cy.request(requestInfo).then((response) => {
                expect(response.status).to.eq(
                    parseInt(fixtureResponse.responseStatusCode)
                );
            });
        });
    });
});
