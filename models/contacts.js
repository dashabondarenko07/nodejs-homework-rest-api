const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.log(error);
  }
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const result = JSON.parse(data);
  return result;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const id = contactId.toString();
  const oneContacts = contacts.find((item) => item.id === id);
  return oneContacts;
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const id = contactId.toString();
    const index = contacts.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContacts = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContacts);
  await updateContacts(contacts);
  console.log(newContacts);
  return newContacts;
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const id = contactId.toString();
    const index = contacts.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    contacts[index] = { id, ...body };
    await updateContacts(contacts);
    return contacts[index];
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
