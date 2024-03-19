const ExcelJS = require("exceljs");

async function ReadDataFromExcel(filePath) {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(1);

    const rows = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) {
        rows.push(row.values);
      }
    });

    return rows;
  } catch (error) {
    console.error("Error occurred while reading Excel file:", error);
    return null;
  }
}

module.exports = {
  ReadDataFromExcel,
};
