const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");
/**
 * Convert JSON data to Excel file.
 * @param {Array} data - Array of objects representing the data.
 * @param {Object} options - Options for customization.
 * @param {string} [options.fileName="output"] - Name of the output file (without extension).
 * @param {string} [options.worksheetName="Sheet1"] - Name of the worksheet in the Excel file.
 * @param {number} [options.columnWidth=20] - Width of columns in the Excel file.
 * @param {string} [options.fileFormat="xlsx"] - Format of the output file ("xlsx" or "csv").
 */
const jsonToExcel = async (data, options = {}) => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Data should be a non-empty array.");
  }

  const {
    fileName = "output",
    worksheetName = "Sheet1",
    columnWidth = 20,
    fileFormat = "xlsx",
  } = options;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(worksheetName);

  const keys = Object.keys(data[0]);
  const columns = keys.map((key) => ({
    header: key,
    key: key,
    width: columnWidth,
  }));
  worksheet.columns = columns;

  data.forEach((row) => {
    worksheet.addRow(row);
  });

  const fileExtension = fileFormat === "csv" ? ".csv" : ".xlsx";
  const filePath = path.join(__dirname, `${fileName}${fileExtension}`);

  try {
    if (fileFormat === "csv") {
      await workbook.csv.writeFile(filePath);
    } else {
      await workbook.xlsx.writeFile(filePath);
    }
    console.log("Excel file created successfully.");
  } catch (error) {
    console.error("Error occurred while writing to Excel file:", error);
  }
};

module.exports = {
  jsonToExcel,
};
