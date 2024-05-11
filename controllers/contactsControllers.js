import * as contactsServices from '../services/contactsServices.js';
import { toController } from '../utils/api.js';

const getAllContacts = async (_, res) => {
  const contacts = await contactsServices.listContacts();
  res.status(200).json(contacts);
};

const getOneContact = async (req, res) => {
  const contact = await contactsServices.getContactById(req.params.id);

  if (contact) {
    res.status(200).json(contact);
    return;
  }

  res.status(404).json({ message: 'Not found' });
};

const deleteContact = async (req, res) => {
  const removedContact = await contactsServices.removeContact(req.params.id);

  if (removedContact) {
    res.status(200).json(removedContact);
    return;
  }

  res.status(404).json({ message: 'Not found' });
};

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const addedContact = await contactsServices.addContact(name, email, phone);
  res.status(201).json(addedContact);
};

const updateContact = async (req, res) => {
  const updatedContact = await contactsServices.updateContact(
    req.params.id,
    req.body
  );

  if (!updatedContact) {
    res.status(404).json({ message: 'Not found' });
    return;
  }

  res.status(200).json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  const { favorite } = req.body;

  const updatedContact = await contactsServices.updateContact(req.params.id, {
    favorite,
  });

  if (!updatedContact) {
    res.status(404).json({ message: 'Not found' });
    return;
  }

  res.status(200).json(updatedContact);
};

export default {
  getAllContacts: toController(getAllContacts),
  getOneContact: toController(getOneContact),
  deleteContact: toController(deleteContact),
  createContact: toController(createContact),
  updateContact: toController(updateContact),
  updateStatusContact: toController(updateStatusContact),
};
