const pool = require("../database");

class Contact {
  static async getAllContacts() {
    const result = await pool.query("SELECT contato.id as idcontato, contato.nome, contato.idade, telefone.id as idtelefone, telefone.numero FROM contato JOIN telefone ON contato.id = telefone.idcontato;");
    return result.rows;
  }

  static async getAllContactsFiltered(contact) {
    const sql = "SELECT contato.id as idcontato, contato.nome, contato.idade, telefone.id as idtelefone, telefone.numero FROM contato JOIN telefone ON contato.id = telefone.idcontato WHERE contato.nome LIKE '%' || $1 || '%' AND telefone.numero LIKE '%' || $2 || '%';";
    const values = [contact.nome, contact.numero];
    const result = await pool.query(sql, values);
    return result.rows;
  }

  static async insertContact(contact) {
    const sqlContato = "INSERT INTO contato(nome, idade) VALUES ($1, $2) RETURNING *;";
    const valuesContato = [contact.nome, contact.idade];
    const resultContact = await pool.query(sqlContato, valuesContato);

    const resultsTelefones = {};
    for (let index = 0; index < contact.numeros.length; index++) {
      const numero = contact.numeros[index];
      const sqlTelefone = "INSERT INTO telefone(idcontato, numero) VALUES ($1, $2);";
      const valuesTelefone = [resultContact.rows[0].id, numero];
      const resultTelefone = await pool.query(sqlTelefone, valuesTelefone);
      resultsTelefones[index] = resultTelefone.rows[0];
    };
  }

  static async deleteContactById(id) {
    const sql = "DELETE from contato WHERE id=$1 RETURNING *;";
    const values = [id];
    const result = await pool.query(sql, values);
    return result.rows[0];
  }

  static async updateContact(contact) {
    const sqlContato = "UPDATE contato SET nome=$1, idade=$2 WHERE id=$3;";
    const valuesContato = [contact.nome, contact.idade, contact.idContato];
    await pool.query(sqlContato, valuesContato);

    const sqlUpdateTelefone = "UPDATE telefone SET numero=$1 WHERE id=$2;";
    const valuesUpdateTelefone = [contact.currentTelefone, contact.idTelefone];
    await pool.query(sqlUpdateTelefone, valuesUpdateTelefone);

    const resultsTelefones = {};
    for (let index = 0; index < contact.numeros.length; index++) {
      const numero = contact.numeros[index];
      const sqlInsertTelefone = "INSERT INTO telefone(idcontato, numero) VALUES ($1, $2);";
      const valuesInsertTelefone = [contact.idContato, numero];
      const resultInsertTelefone = await pool.query(sqlInsertTelefone, valuesInsertTelefone);
      resultsTelefones[index] = resultInsertTelefone.rows[0];
    };
  }

  static async deleteTelefoneById(id) {
    const sql = "DELETE from telefone WHERE id=$1 RETURNING *;";
    const values = [id];
    const result = await pool.query(sql, values);
    return result.rows[0];
  }
}

module.exports = Contact;