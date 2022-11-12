const { Contact } = require("../../models");

const listContacts = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

module.exports = listContacts;
