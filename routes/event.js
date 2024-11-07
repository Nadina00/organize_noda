const express = require('express');
const router = express.Router();
const ctrlWrapper = require('../helper/ctrlWrapper');
const {
  eventAdd,
  eventDel,
  eventList
} = require("../controller/event/eventController");

router.post("/", ctrlWrapper(eventAdd));
router.delete("/:id", ctrlWrapper(eventDel));
router.get("/", ctrlWrapper(eventList));

module.exports = router;

