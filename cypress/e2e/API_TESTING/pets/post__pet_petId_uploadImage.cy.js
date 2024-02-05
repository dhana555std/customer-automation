import { ajv } from '../../../support/e2e';
const apiBaseURL = Cypress.env('CYPRESS_BASE_URL');
const requestInfo = JSON.parse(
    JSON.stringify({ url: '/pet/{petId}/uploadImage', method: 'POST' })
);
requestInfo.url = apiBaseURL + requestInfo.url;

describe('uploads an image', () => {
    it('200 POST application/json multipart/form-data successful operation', () => {
        cy.fixture(
            '200_application_json_multipart_form-data_post__pet_petId_uploadImage'
        ).then((fixtureResponse) => {
            cy.fixture('**filePath**', 'binary').then((fileContent) => {
                requestInfo.headers = fixtureResponse.headers
                    ? fixtureResponse.headers
                    : '';
                const blob = new Blob([fileContent], {
                    type: requestInfo.headers['Content-Type'],
                });
                const payload = fixtureResponse.payload
                    ? fixtureResponse.payload
                    : '';
                const formData = new FormData();
                // Loop through the keys in payload
                if (payload) {
                    Object.keys(payload).forEach((key) => {
                        // Check if the value is a reference to a file
                        if (payload[key] === 'file') {
                            // Append the file content with the key as the file name
                            formData.append(key, blob);
                        } else {
                            // Append other key-value pairs
                            // "file" key name is given by default you can change if you have different name
                            formData.append(key, payload[key]);
                        }
                    });
                } else {
                    formData.append('file', blob);
                }
                requestInfo.body = formData;
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
                requestInfo.qs = fixtureResponse.queryParam
                    ? fixtureResponse.queryParam
                    : '';
                cy.request(requestInfo).then((response) => {
                    expect(response.status).to.eq(
                        parseInt(fixtureResponse.responseStatusCode)
                    );
                });
            });
        });
    });
});
