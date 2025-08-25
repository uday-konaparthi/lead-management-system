const Lead = require('../db/leadSchema');
const { faker } = require('@faker-js/faker');

// Create a new lead
const handleCreateLead = async (req, res) => {
  try {
    const newLead = new Lead({ ...req.body, user_id: req.userId });
    await newLead.save();
    res.status(201).json(newLead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all leads (with pagination and filtering)
const fetchLeads = async (req, res) => {
  try {
    let { page = 1, limit = 20, search = "", status, source, score, lead_value, is_qualified, first_name, last_name } = req.query;

    const query = { user_id: req.userId };

    // Search (case-insensitive, contains) on email, company, or city
    if (search) {
      const searchRegex = new RegExp(search, "i");
      query.$or = [
        { email: { $regex: searchRegex } },
        { company: { $regex: searchRegex } },
        { city: { $regex: searchRegex } },
      ];
    }

    // Enum filters example (status, source)
    if (status) {
      const statusArr = status.split(",");
      query.status = { $in: statusArr };
    }
    if (source) {
      const sourceArr = source.split(",");
      query.source = { $in: sourceArr };
    }

    if (score) {
      query.score = Number(score);
    }

    if (is_qualified !== undefined) {
      query.is_qualified = is_qualified === "true";
    }

    const total = await Lead.countDocuments(query);

    const leads = await Lead.find(query)
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .exec();

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      data: leads,
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get a single lead by id
const fetchLeadById = async (req, res) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id, user_id: req.userId });
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a lead by id
const updateLeadById = async (req, res) => {
  try {
    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, user_id: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.status(200).json(lead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a lead by id
const deleteLeadById = async (req, res) => {
  const leadId = req.params.id;

  try {
    const deletedLead = await Lead.findByIdAndDelete(leadId);

    if (!deletedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    return res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    console.error("Error deleting lead:", error);
    return res.status(500).json({ message: "Server error deleting lead" });
  }
};


// dummy lead schema for seeding
const generateFakeLeads = (count, userId) => {
  const sources = ['website', 'facebook_ads', 'google_ads', 'referral', 'events', 'other'];
  const statuses = ['new', 'contacted', 'qualified', 'lost', 'won'];

  return Array.from({ length: count }).map(() => ({
    user_id: userId,
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    phone: faker.phone.number(),
    company: faker.company.name(),
    city: faker.location.city(),
    state: faker.location.state(),
    source: faker.helpers.arrayElement(sources),
    status: faker.helpers.arrayElement(statuses),
    score: faker.number.int({ min: 0, max: 100 }),
    lead_value: faker.commerce.price(1000, 10000, 0),
    last_activity_at: faker.date.recent(30),
    is_qualified: faker.datatype.boolean(),
  }));
}

// seeding dummy leads
const seedLeads = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId)
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    await Lead.deleteMany({ user_id: userId }); // Clear this user's leads

    const fakeLeads = generateFakeLeads(150, userId);
    await Lead.insertMany(fakeLeads);

    res.status(201).json({ message: `${fakeLeads.length} leads seeded for user.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  handleCreateLead,
  fetchLeads,
  fetchLeadById,
  updateLeadById,
  deleteLeadById,
  seedLeads
};
