import { defineConfig } from 'cypress';
export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            on('task', {
                log(message) {
                    console.log(message);
                    return null;
                },
            });
        },
        specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx,features}',
        supportFile: false,
        screenshotOnRunFailure: false,
        env: {
            CYPRESS_BASE_URL: 'https://petstore.swagger.io/v2',
            fileuploadContentTypes: 'PLACEHOLDER_CONTENT_TYPES',
        },
    },
});
