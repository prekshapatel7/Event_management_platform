const express = require("express");

const router = express.Router();

const auth =
require("../middleware/authMiddleware");

const {
 createEvent,
 getEvents,
 deleteEvent
}
=
require("../controllers/eventController");

router.get("/", getEvents);

router.post(
 "/create",
 auth,
 createEvent
);

router.delete(
 "/:id",
 auth,
 deleteEvent
);

module.exports = router;