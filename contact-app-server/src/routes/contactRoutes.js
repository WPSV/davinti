const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/ContactController');

router.get('/contacts', ContactController.getAllContacts);
router.get('/contacts/filtered', ContactController.getAllContactsFiltered);
router.post('/contact', ContactController.insertContact);
router.delete('/contact/delete/:id', ContactController.deleteContactById);
router.delete('/telefone/delete/:id', ContactController.deleteTelefoneById);
router.put('/contact/update', ContactController.updateContact);

module.exports = router;