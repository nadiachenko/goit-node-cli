import fs from "fs/promises"
import path from "path"
import { nanoid } from "nanoid"

const contactsPath = path.resolve("db", "./contacts.json")

async function listContacts() {
  const result = await fs.readFile(contactsPath, "utf-8")
  return JSON.parse(result);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId)
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts()
  const index = contacts.findIndex(contact => contact.id === contactId)
  if (index === -1) {
    return null
  }
  const [result] = contacts.splice(index, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return result;
}

async function addContact(id, name, email, phone) {
  const newUser = {
    id: nanoid(),
    name,
    email,
    phone
  }
  const contacts = await listContacts();
  contacts.push(newUser)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newUser;
}

export { listContacts, getContactById, addContact, removeContact };
