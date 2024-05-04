import path from 'path';
import { fileURLToPath } from 'url';
import fsPromises from 'fs/promises';
import { nanoid } from 'nanoid';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contactsPath = path.resolve(
  path.join(__dirname, '../db', 'contacts.json')
);

export async function listContacts() {
  const json = await fsPromises.readFile(contactsPath, 'utf-8');
  return JSON.parse(json);
}

export async function getContactById(contactId) {
  const list = await listContacts();
  const contact = list.find(contact => contact.id === contactId);
  return contact || null;
}

export async function removeContact(contactId) {
  const list = await listContacts();

  const idx = list.findIndex(contact => contact.id === contactId);
  if (idx === -1) {
    return null;
  }

  const [removedContact] = list.splice(idx, 1);
  await fsPromises.writeFile(contactsPath, JSON.stringify(list));

  return removedContact;
}

export async function addContact(name, email, phone) {
  const list = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  list.push(newContact);
  await fsPromises.writeFile(contactsPath, JSON.stringify(list));

  return newContact;
}

export async function updateContact(id, updatePayload) {
  const list = await listContacts();
  const idx = list.findIndex(contact => contact.id === id);

  if (idx === -1) {
    return null;
  }

  const updateContact = Object.assign(list[idx], updatePayload);
  await fsPromises.writeFile(contactsPath, JSON.stringify(list));

  return updateContact;
}
