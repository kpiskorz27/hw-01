const fs = require("node:fs").promises;
const path = require("node:path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

//Pobiera i wyświetla listę wszystkich kontaktów.
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (error) {
    console.error("Błąd podczas odczytu kontaktów:", error);
  }
}

//Pobiera kontakt na podstawie podanego ID.
async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    if (contact) {
      console.log(contact);
    } else {
      console.warn(`Kontakt z ID ${contactId} nie został znaleziony.`);
    }
  } catch (error) {
    console.error("Błąd podczas odczytu kontaktów:", error);
  }
}

//Usuwa kontakt na podstawie podanego ID.
async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    let contacts = JSON.parse(data);
    const updatedContacts = contacts.filter((c) => c.id !== contactId);

    if (contacts.length === updatedContacts.length) {
      console.warn(`Kontakt z ID ${contactId} nie został znaleziony.`);
      return;
    }

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    console.log(`Kontakt z ID ${contactId} został usunięty.`);
  } catch (error) {
    console.error("Błąd podczas usuwania kontaktu:", error);
  }
}

//Dodaje nowy kontakt do zbioru.
async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const newContact = {
      id: (contacts.length + 1).toString(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Nowy kontakt został dodany:", newContact);
  } catch (error) {
    console.error("Błąd podczas dodawania kontaktu:", error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
