const contacts = require("../../models/contacts");
const { addSchema } = require("../../schema/contacts");
const { RequestError } = require("../../helpers/RequestError");

const addContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "Missing required name field");
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
