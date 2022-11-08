const contacts = require("../../models/contacts");
const { addSchema } = require("../../schema/contacts");
const { RequestError } = require("../../helpers/RequestError");

const updateContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "Missing fields");
    }

    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw RequestError(404, "Not found");
    }

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
