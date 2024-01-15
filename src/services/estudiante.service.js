// services/estudiante.service.js
import exceljs from "exceljs";

export const cargarDesdeExcel = async (buffer) => {
  const workbook = new exceljs.Workbook();
  await workbook.xlsx.load(buffer);

  const worksheet = workbook.getWorksheet(1);

  const estudiantes = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber !== 1) {
      // Ignorar la primera fila si contiene encabezados

      const cedulaEst = row.getCell(1).text;
      const nombreEst = row.getCell(2).text;
      const emailEst = row.getCell(3).text;
      const idCarreraPer = row.getCell(4).value;

      console.log(
        `Fila ${rowNumber}: cedulaEst=${cedulaEst}, nombreEst=${nombreEst}, emailEst=${emailEst}, idCarreraPer=${idCarreraPer}`
      );

      const parsedIdCarreraPer = parseInt(idCarreraPer);

      if (!isNaN(parsedIdCarreraPer) && cedulaEst && nombreEst && emailEst) {
        estudiantes.push({
          cedulaEst,
          nombreEst,
          emailEst,
          idCarreraPer: parsedIdCarreraPer,
        });
      } else {
        console.error(
          `Error al cargar estudiantes desde el archivo Excel: Validation failed for parameter 'cedulaEst' or missing values.`
        );
      }
    }
  });

  return estudiantes;
};
