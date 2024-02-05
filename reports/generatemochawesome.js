import fs from 'fs/promises'; // Import fs with promises support
import path from 'path';

const filePath = './mochawesome.json'; // Adjust the path accordingly
console.log(filePath);
const readJsonFile = async (filePath) => {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        console.error(`Error reading JSON file: ${error.message}`);
        throw error;
    }
};

const generateJsCode = (jsonData) => {
    return `
(() => {
    window.mochawesome = ${JSON.stringify(jsonData, null, 2)};
})();
`;
};

const writeJsFile = async (filePath, jsCode) => {
    try {
        await fs.writeFile(filePath, jsCode, 'utf-8');
        console.log(`reports generated successfully.`);
    } catch (error) {
        console.error(`Error writing JS file: ${error.message}`);
        throw error;
    }
};

(async () => {
    try {
        const jsonData = await readJsonFile(filePath);
        const jsCode = generateJsCode(jsonData);
        await writeJsFile('./reports/mochawesome.js', jsCode);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();
