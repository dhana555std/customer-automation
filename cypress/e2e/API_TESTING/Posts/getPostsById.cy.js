const apiBaseURL = Cypress.env('CYPRESS_BASE_URL');
const requestInfo = JSON.parse(
    JSON.stringify({ url: '/posts/{postId}', method: 'GET' })
);
requestInfo.url = apiBaseURL + requestInfo.url;

describe('fetches the data of a perticular post.', () => {
    it('200 GET application/json  successful operation', () => {
        cy.fixture('200_application_json__getPostsById').then(
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
                });
            }
        );
    });

    it('400 GET   Bad Request', () => {
        cy.fixture('400___getPostsById').then((fixtureResponse) => {
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
            });
        });
    });
});
