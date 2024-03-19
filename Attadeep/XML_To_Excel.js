const fs = require("fs");
const { promisify } = require("util");
const parseString = promisify(require("xml2js").parseString);
const ExcelJS = require("exceljs");

async function xmlToExcel(xmlData, outputFile, worksheetName = "Sheet1") {
  try {
    // Parse XML data
    const parsedData = await parseString(xmlData);

    // Extract data from XML
    const rows = parsedData.root.row;
    const headers = Object.keys(rows[0]);

    // Create a workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(worksheetName);

    // Set headers
    worksheet.columns = headers.map((header) => ({ header, key: header }));

    // Add rows
    rows.forEach((row) => worksheet.addRow(row));

    // Save workbook to file
    await workbook.xlsx.writeFile(outputFile);

    console.log(`Excel file "${outputFile}" created successfully.`);
  } catch (error) {
    console.error("Error occurred while converting XML to Excel:", error);
  }
}

// Example usage
const xmlData = `
<root>
  <row>
    <ID>1</ID>
    <Name>John</Name>
    <Age>30</Age>
  </row>
  <row>
    <ID>2</ID>
    <Name>Alice</Name>
    <Age>25</Age>
  </row>
</root>
`;

const outputFile = "output.xlsx";
const worksheetName = "Sheet1";

xmlToExcel(xmlData, outputFile, worksheetName);
