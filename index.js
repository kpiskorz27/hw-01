const { Command } = require("commander");
require("colors");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      await listContacts();
      break;

    case "get":
      if (id) {
        await getContactById(id);
      } else {
        console.warn("Please provide a contact ID!".red);
      }
      break;

    case "add":
      if (name && email && phone) {
        await addContact(name, email, phone);
      } else {
        console.warn("Please provide name, email, and phone!".red);
      }
      break;

    case "remove":
      if (id) {
        await removeContact(id);
      } else {
        console.warn("Please provide a contact ID!".red);
      }
      break;

    default:
      console.warn("Unknown action type!".red);
  }
}

invokeAction(argv);
