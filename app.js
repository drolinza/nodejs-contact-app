// script awal:
// const { askQuestion, saveContact } = require("./contacts"); // bisa ditulis dg mendestructuring object saja, tanpa perlu menulis lagi satu persatu alamat file contacts

// const question2 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question("Input your email: ", (email) => {
//       resolve(email);
//     });
//   });
// };

// rl.question("Input your name: ", (name) => {
//   rl.question("Input you number phone: ", (phone) => {
//     const contact = { name, phone };

//     // read the data
//     const data = fs.readFileSync("data/contacts.json", "utf8");
//     const contacts = JSON.parse(data);

//     contacts.push(contact);

//     fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

//     console.log("Thankyou for input the contact!.");
//     rl.close();
//   });
// });

// main function
// const contacts = require("./contacts");

// const main = async () => {
//   const name = await contacts.askQuestion("Input your name: ");
//   const email = await contacts.askQuestion("Input your email: ");
//   const phone = await contacts.askQuestion("Input your number phone: ");

//   contacts.saveContact(name, email, phone);
// };

// main();





// Make command for add contact data like this :
// node app add --name="dina" --email="dina@gmail.com" --phone="098765432"

// mengambil argument dari command line
// kita ambil argument setelahnya index ke 2
// console.log(process.argv[2]);

// const command = process.argv[2];
// if (command === "add") {
//     // perintah yg dilakukan ketika sama dg 'add'
// } else if (command === "remove") {

// } else if (command === "list") {

// }







/** YARGS
 * Pakai module npmjs yargs utk mengelola command line terminal argument setelah nama filenya
 * krn kita kasih flagnya `--` langsung dikasih objectnya
 * parameternya kita buat object supaya bisa diisi byk command
 * Buildernya bisa kita buat object juga supaya bisa memasukkan tiap2 item data yg kita dibutuhkan, misal `name`, name juga berisi object utk menuliskan option2 nya, (utk liat option2 bisa cek di docs yargs-nya! bagian .options[key,[opt]], ada cth options 'alias', 'describe' dll yg bisa kita gunakan)
 * */

const yargs = require("yargs");
const contacts = require("./contacts");

// Add contact
yargs.command({
    command: "add",
    describe: "Add new Contact",
    builder: {
      name: {
        describe: "Full name",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      phone: {
        describe: "Number Phone",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      contacts.saveContact(argv.name, argv.email, argv.phone);
    },
  })
  .demandCommand();

// List (result name and number phone)
yargs.command({
  command: "list",
  describe: "Display all contacts name & number phone",
  handler() {
    contacts.listContact();
  },
});

// Detail (search by name)
yargs.command({
  command: "detail",
  describe: "Display details contact by name",
  builder: {
    name: {
      describe: "Full name",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailContact(argv.name);
  },
});

// Delete (by name)
yargs.command({
  command: "delete",
  describe: "Delete contact by name",
  builder: {
    name: {
      describe: "Full name",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.name);
  },
});

yargs.parse();
