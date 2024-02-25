const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// Check the directory is empty or not
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Create contacts.json if it hasn't been created
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
  // read the data
  const data = fs.readFileSync(dataPath, "utf8");
  const contacts = JSON.parse(data);
  return contacts;
};

const saveContact = (name, email, phone) => {
  const contact = { name, email, phone };
  const contacts = loadContact();

  // check duplicate
  const duplicate = contacts.find((contact) => contact.name === name);
  if (duplicate) {
    console.log(
      chalk.red.inverse.bold(
        "Already have same name contact, use another name!"
      )
    );
    return false;
  }

  // Check email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Email Invalid!"));
      return false;
    }
  }

  // Check phone number
  if (!validator.isMobilePhone(phone, "id-ID")) {
    console.log(chalk.red.inverse.bold("Number phone is Invalid!"));
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync(dataPath, JSON.stringify(contacts));

  console.log(chalk.green.inverse.bold("Thankyou for input the contact!."));
};

// Method function for list contact
const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.inverse.bold("Contact list :"));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.name} - ${contact.phone}`);
  });
};

// Method function Detail contact
const detailContact = (name) => {
  const contacts = loadContact();

  // for every user search by name either uppercase or lowercase
  const contact = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );

  // if not found
  if (!contact) {
    console.log(chalk.red.inverse.bold(`'${name}' Not found!`));
    return false;
  }
  // if found
  console.log(chalk.cyan.inverse.bold(contact.name));
  console.log(contact.phone);
  if (contact.email){
    console.log(contact.email);
  }
};

// Delete contact method
const deleteContact = (name) => {
  const contacts = loadContact();

  // filter out contact with the specified name
  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase !== name);

  // update then write the new data
  if (filteredContacts.length < contacts.length) {
    fs.writeFileSync(dataPath, JSON.stringify(filteredContacts));
    console.log(chalk.green.inverse.bold(`Contacts with name ${name} have been deleted.`));
  } else {
    console.log(chalk.red.inverse.bold(`No contacts found with name ${name}.`));
  }
};

module.exports = { saveContact, listContact, detailContact, deleteContact };

// Codingan awalnya/before:

// const readline = require("node:readline");
// const fs = require("fs");

// // interface output
// const { stdin: input, stdout: output } = require("node:process");
// const rl = readline.createInterface({ input, output });

// // Check the directory is empty or not
// const dirPath = "./data";
// if (!fs.existsSync(dirPath)) {
//   fs.mkdirSync(dirPath);
// }

// // Create contacts.json if it hasn't been created
// const dataPath = "./data/contacts.json";
// if (!fs.existsSync(dataPath)) {
//   fs.writeFileSync(dataPath, "[]", "utf-8");
// }

// // Prompt question
// const askQuestion = (prompt) => {
//   return new Promise((resolve, reject) => {
//     rl.question(prompt, resolve);
//   });
// };

// const saveContact = (name, email, phone) => {
//   const contact = { name, email, phone };

//   // read the data
//   const data = fs.readFileSync(dataPath, "utf8");
//   const contacts = JSON.parse(data);

//   // check duplicate
//   const duplicate = contacts.find((contact) => contact.name === name);
//   if (duplicate) {
//     console.log("Already have same name contact, use another name!");
//     return false;
//   }

//   contacts.push(contact);

//   fs.writeFileSync(dataPath, JSON.stringify(contacts));

//   console.log("Thankyou for input the contact!.");
//   rl.close();
// };

// module.exports = { askQuestion, saveContact };
