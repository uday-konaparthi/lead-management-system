const express = require('express');
const {seedLeads, handleCreateLead, fetchLeads, fetchLeadById, updateLeadById, deleteLeadById} = require("../controllers/leadController.js");
const { protectRoute } = require("../middleware/protectRoute.js");

const router = express.Router();

//api/leads
router.post('/seed', protectRoute, seedLeads); //for seeding dummy data
router.get('/', protectRoute, fetchLeads);
router.get('/:id', protectRoute, fetchLeadById);
router.post('/', protectRoute, handleCreateLead);
router.put('/:id', protectRoute, updateLeadById);

router.delete('/:id', protectRoute, deleteLeadById);

module.exports = router;
