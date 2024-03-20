const fs = require('fs');
const convertJsonToXml = require('./jsontoxml');

const jsonFile = 'Abhigna/input.json';
const outputFile = 'Abhigna/output.xml';

const propertyName = 'data1';

const options = {
    // propertyName: 'data',
    attributeKey: '@',
    characterKey: '#',
    headless: true,
    rootName: 'root'
};

convertJsonToXml(jsonFile, propertyName, options)
    .then((xmlDataArray) => {
        const xmlData = xmlDataArray.map(obj => obj[propertyName]).join('\n');
        fs.writeFile(outputFile, xmlData, (err) => {
            if (err) {
                console.error('Error writing XML to file:', err);
                return;
            }
            console.log('XML data has been written to', outputFile);
        });
    })
    .catch((err) => {
        console.error('Error:', err.message);
    });
