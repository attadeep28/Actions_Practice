const fs = require('fs');
const xml2js = require('xml2js');

/**
 * Converts XML data to JSON format.
 * @param {string} propertyName -Property name 
 * @param {string} xmlFile - Path to the XML file.
 * @param {Object} options - Conversion options.
  * @param {string} [options.rootName] - Root element name for the XML.
  * @param {string} [options.attributeKey='$'] - Key name for XML attributes.
 * @param {string} [options.characterKey='_'] - Key name for XML character data.
 * @param {boolean} [options.explicitArray=true] - Whether to always put child nodes in an array.
 * @param {boolean} [options.mergeAttrs=false] - Whether to merge attributes into the child elements.
 * @param {boolean} [options.ignoreAttrs=false] - Whether to ignore XML attributes.
 * @returns {Promise<string>} A Promise that resolves with the JSON data or rejects with an error.
 */
function convertXmlToJson(xmlFile, propertyName, options={}) {
    return new Promise((resolve, reject) => {
        const parserOptions = {
            attrkey: options.attributeKey || '$',
            charkey: options.characterKey || '_',
            explicitArray: options.explicitArray !== undefined ? options.explicitArray : false,
            mergeAttrs: options.mergeAttrs || false,
            ignoreAttrs: options.ignoreAttrs || false,
            trim: options.trim || false,
            
        };
        const parser = new xml2js.Parser(parserOptions);
        const stream = fs.createReadStream(xmlFile, { encoding: 'utf8' });
        let xmlData = '';

        stream.on('data', (chunk) => {
            xmlData += chunk;
        });

        stream.on('end', () => {
            parser.parseString(xmlData, (err, result) => {
                if (err) {
                    reject(new Error('Error parsing XML: ' + err.message));
                    return;
                }
                
                // const jsonData = JSON.stringify(result, null, 2);
                const jsonData = propertyName ? JSON.stringify({ [propertyName]: result }, null, 2) : JSON.stringify(result, null, 2);
                resolve(jsonData);
            });
        });

        stream.on('error', (err) => {
            reject(new Error('Error reading XML file: ' + err.message));
        });
    });
}

module.exports = convertXmlToJson;





