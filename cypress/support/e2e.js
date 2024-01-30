// ***********************************************************
                    // This example support/e2e.js is processed and
                    // loaded automatically before your test files.
                    //
                    // This is a great place to put global configuration and
                    // behavior that modifies Cypress.
                    //
                    // You can change the location of this file or turn off
                    // automatically serving support files with the
                    // 'supportFile' configuration option.
                    //
                    // You can read more here:
                    // https://on.cypress.io/configuration
                    // ***********************************************************

                    // Import commands.js using ES2015 syntax:
                    import './commands'

                    // Alternatively you can use CommonJS syntax:
                    // require('./commands')
                    import Ajv from 'ajv';
                    const ajv = new Ajv();

                    function createIntegerFormat(formatName, minValue, maxValue) {
                        ajv.addFormat(formatName, {
                            validate: function (data) {
                                return Number.isInteger(data) && data >= minValue && data <= maxValue;
                            },
                            errors: false,
                        });
                    }

                    createIntegerFormat('int32', -2147483648, 2147483647);
                    createIntegerFormat('int64', Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
                    createIntegerFormat('uint32', 0, 4294967295);
                    export { ajv };