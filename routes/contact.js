const express = require('express');
const router = express.Router();
const ctrlWrapper = require('../helper/ctrlWrapper');
const {
  contactAdd,
  contactDel,
  contactsList
} = require("../controller/contact/contactController");

router.post("/", ctrlWrapper(contactAdd));
router.delete("/:id", ctrlWrapper(contactDel));
router.get("/", ctrlWrapper(contactsList));

module.exports = router;

