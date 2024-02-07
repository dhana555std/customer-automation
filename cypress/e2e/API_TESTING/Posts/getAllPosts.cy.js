const apiBaseURL = Cypress.env('CYPRESS_BASE_URL');
const requestInfo = JSON.parse(
    JSON.stringify({ url: '/posts', method: 'GET' })
);
requestInfo.url = apiBaseURL + requestInfo.url;

describe('fetches the data which is posted', () => {
    it('200 GET application/json  getAllPosts successful operation', () => {
        cy.fixture('200__getAllPosts').then((fixtureResponse) => {
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
