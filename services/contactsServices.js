import ContactModel from '../db/contacts.model.js';
import { Types as MongooseTypes } from 'mongoose';

export async function listContacts() {
  return ContactModel.find({});
}

export async function getContactById(contactId) {
  return ContactModel.findById(contactId);
}

export async function removeContact(contactId) {
  return ContactModel.findOneAndDelete({
    _id: new MongooseTypes.ObjectId(contactId),
  });
}

export async function addContact(name, email, phone) {
  const newContact = new ContactModel({
    name,
    email,
    phone,
  });

  await newContact.save();

  return newContact;
}

export async function updateContact(id, updatePayload) {
  return ContactModel.findByIdAndUpdate(
    { _id: new MongooseTypes.ObjectId(id) },
    updatePayload,
    { new: true, runValidators: true }
  );
}
