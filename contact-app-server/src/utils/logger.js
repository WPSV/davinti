const fs = require("fs");

const logFilePath = "C:/Users/William Pedro/Desktop/logDelete.txt";

const logDelete = (dateTime, table, registroDeletado) => {
  const logData = `${dateTime}: DELETE FROM ${table} WHERE id = ${registroDeletado.id}.\n`;

  fs.appendFile(logFilePath, logData, (error) => {
    if (error) {
      console.error("Erro ao escrever no arquivo de log:", error);
    } else {
      console.log("Informações registradas no arquivo de log.");
    }
  });
};

module.exports = { logDelete };