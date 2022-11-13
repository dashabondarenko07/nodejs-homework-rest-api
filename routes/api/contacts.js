const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", ctrl.addContact);

router.put("/:contactId", ctrl.updateContact);

router.patch("/:contactId/favorite", ctrl.updateStatusContact);

router.delete("/:contactId", ctrl.removeContact);

module.exports = router;
