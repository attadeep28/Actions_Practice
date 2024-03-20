const fs = require('fs');
const convertXmlToJson = require('./xmltojson');

const xmlFile = 'Abhigna/sample.xml';
const outputFile = 'Abhigna/output.json';

const propertyName = 'data';

options = { 
    attributeKey: '$',
    characterKey: '_',
    explicitArray: false,
    mergeAttrs: true,
    ignoreAttrs: true,
    trim: true
}

convertXmlToJson(xmlFile, propertyName, options)
    .then((jsonData) => {
        fs.writeFile(outputFile, jsonData, (err) => {
            if (err) {
                console.error('Error writing JSON to file:', err);
                return;
            }
            console.log('JSON data has been written to', outputFile);
        });
    })
    .catch((err) => {
        console.error('Error:', err.message);
    });
