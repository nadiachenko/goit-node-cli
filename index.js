
import * as manageContacts from './contacts.js';
import yargs from "yargs"
import { program } from "commander";

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const allContacts = await manageContacts.listContacts();
            console.log(allContacts)
            break;

        case "getContactById":
            const oneContact = await manageContacts.getContactById(id);
            console.log(oneContact)
            break;

        case "addContact":
            const newContact = await manageContacts.addContact(id, name, email, phone);
            console.log(newContact)
            break;

        case "removeContact":
            const deletedContact = await manageContacts.removeContact(id);
            console.log(deletedContact)
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

program
    .option("-a, --action <type>")
    .option("-i, --id <type>")
    .option("-n, --name <type>")
    .option("-e, --email <type>")
    .option("-p, --phone <type>");

program.parse();

const options = program.opts();
invokeAction(options)
