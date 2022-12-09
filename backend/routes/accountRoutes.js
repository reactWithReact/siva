const router = require("express").Router();
const { getAccount } = require("../controller/accountController");

// route for getting the managere by the manager Id
router.get("/:managerId",getAccount);

module.exports = router;

