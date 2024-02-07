const apiBaseURL = Cypress.env('CYPRESS_BASE_URL');
const requestInfo = JSON.parse(
    JSON.stringify({ url: '/posts/{postId}', method: 'PUT' })
);
requestInfo.url = apiBaseURL + requestInfo.url;

describe('Updates the post.', () => {
    it('200 PUT application/json application/json post succesfully updated.', () => {
        cy.fixture('200_application_json_application_json_updatePost').then(
            (fixtureResponse) => {
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
                });
            }
        );
    });
});
