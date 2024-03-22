const Contact = require("../models/contact");
const { logDelete } = require("../utils/logger");

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.getAllContacts();
    res.status(200).json({ result: contacts, message: "" });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor!" });
  }
};

exports.getAllContactsFiltered = async (req, res) => {
  try {
    const { nome, numero } = req.query;
    const contacts = await Contact.getAllContactsFiltered({ nome, numero });
    res.status(200).json({ result: contacts, message: "" });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor!" });
  }
};

exports.insertContact = async (req, res) => {
  try {
    const { nome, idade, numeros } = req.body;
    await Contact.insertContact({ nome, idade, numeros });
    res.status(201).json({ result: "", message: "Contato cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor!" });
  }
};

exports.deleteContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContact = await Contact.deleteContactById(id);
    const table = "contato";
    const contacts = await Contact.getAllContacts();
    res.json({ result: contacts, message: "Contato deletado com sucesso!" });

    const dateTime = new Date().toLocaleString();
    logDelete(dateTime, table, deletedContact);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor!" });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const { idContato, nome, idade, idTelefone, currentTelefone, numeros } = req.body;
    await Contact.updateContact({ idContato, nome, idade, idTelefone, currentTelefone, numeros });
    res.status(200).json({ result: "", message: "Contato atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Telefone já existente!" });
  }
};

exports.deleteTelefoneById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTelefone = await Contact.deleteTelefoneById(id);
    const table = "telefone";
    const contacts = await Contact.getAllContacts();
    res.json({ result: contacts, message: "Telefone deletado com sucesso!" });

    const dateTime = new Date().toLocaleString();
    logDelete(dateTime, table, deletedTelefone);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor!" });
  }
};

