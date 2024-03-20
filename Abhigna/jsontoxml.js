const fs = require('fs');
const xml2js = require('xml2js');

/**
 * Converts JSON data to XML format.
 * @param {string} jsonFile - Path to the JSON file.
 * @param {Object} options - Conversion options.
 * @param {string} propertyName - Property name for the JSON object.
 * @param {string} [options.attributeKey='$'] - Key name for XML attributes.
 * @param {string} [options.characterKey='_'] - Key name for XML character data.
 * @param {boolean} [options.headless=false] - Whether to exclude XML declaration.
 * @param {string} [options.rootName='root'] - Root element name for the XML.
 * @returns {Promise<string>} A Promise that resolves with the XML data or rejects with an error.
 */
function convertJsonToXml(jsonFile, propertyName, options = {}) {
    return new Promise((resolve, reject) => {
        // Read JSON data from file
        fs.readFile(jsonFile, 'utf8', (err, jsonData) => {
            if (err) {
                reject(new Error('Error reading JSON file: ' + err.message));
                return;
            }

            try {
                const jsonObject = JSON.parse(jsonData);

                 // If JSON data is not an array, wrap it in an array
                 const jsonArray = Array.isArray(jsonObject) ? jsonObject : [jsonObject];

                const builder = new xml2js.Builder({
                    headless: options.headless || false,
                    rootName: options.rootName || 'root',
                    renderOpts: {
                        pretty: true, // Indentation for better readability
                        indent: '    ', // Four spaces for indentation
                        newline: '\n' // Newline character
                    },
                    attrkey: options.attributeKey || '$',
                    charkey: options.characterKey || '_'
                });
                // const xmlData = builder.buildObject(propertyName ? jsonObject[propertyName] : jsonObject);
                const xmlDataArray = jsonArray.map(obj => {
                    return {
                        [propertyName]: builder.buildObject(obj)
                    };
                });
                resolve(xmlDataArray);
            } catch (error) {
                reject(new Error('Error parsing JSON: ' + error.message));
            }
        });
    });
}

module.exports = convertJsonToXml;
