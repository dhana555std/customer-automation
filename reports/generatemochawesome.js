import fs from 'fs/promises'; // Import fs with promises support
import path from 'path';
import { readdir, stat, copyFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { readFile } from 'fs/promises';
const filePath = './mochawesome.json'; // Adjust the path accordingly

const readJsonFile = async (filePath) => {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        console.error(`Error reading JSON file: ${error.message}`);
        throw error;
    }
};

const generateJsCode = async (jsonData, base64Image) => {
    return `
      (() => {
          window.mochawesome = ${JSON.stringify(jsonData, null, 2)};
          window.info ={
            customerLogo:'${base64Image}'
          }; 
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

async function getFormattedCurrentDate() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');

    const folderName = `${year}_${month}_${day}_${hours}_${minutes}_${seconds}_${milliseconds}`;

    return folderName;
}

async function copyFolderContents(source, destination) {
    try {
        // Create the output folder if it doesn't exist
        await mkdir(destination, { recursive: true });

        // Read the contents of the source folder
        const files = await readdir(source);

        // Iterate through each file/directory in the source
        for (const file of files) {
            const sourcePath = join(source, file);
            const destPath = join(destination, file);

            // Get the file/directory stats
            const stats = await stat(sourcePath);

            // If it's a directory, recursively copy its contents
            if (stats.isDirectory()) {
                await copyFolderContents(sourcePath, destPath);
            } else {
                // If it's a file, copy it to the destination
                await copyFile(sourcePath, destPath);
            }
        }
    } catch (error) {
        console.error('Error during copy:', error);
    }
}

async function imageToBase64(imagePath) {
    try {
        // Read the image file
        const imageData = await readFile(imagePath);

        // Convert image data to base64
        const base64data = Buffer.from(imageData).toString('base64');
        const mimeType = 'image/jpeg'; // Adjust this according to your image type
        const base64Image = `data:${mimeType};base64,${base64data}`;
        console.log(base64Image);
        return base64Image;
    } catch (error) {
        console.error('Error converting image to base64:', error);
        throw error;
    }
}

// Specify the source and destination folders
const sourceFolder = './reports';
const outputFolder = `outputs/${await getFormattedCurrentDate()}`; // Updated output folder path

// Call the function to copy folder contents

(async () => {
    try {
        const jsonData = await readJsonFile(filePath);
        const imagePath = './logo.jpg';
        const base64Image = await imageToBase64(imagePath);
        const jsCode = await generateJsCode(jsonData, base64Image);
        await writeJsFile('./reports/mochawesome.js', jsCode);
        await copyFolderContents(sourceFolder, outputFolder);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();
