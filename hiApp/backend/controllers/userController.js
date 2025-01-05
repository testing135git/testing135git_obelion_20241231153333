const Profile = require('../models/Profile');

// Controller to handle getting a user profile by ID
async function getProfile(req, res) {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the profile' });
  }
}

// Controller to handle creating a new user profile
async function createProfile(req, res) {
  try {
    const { name, email, phone } = req.body;
    const newProfile = await Profile.create({ name, email, phone });
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while creating the profile' });
  }
}

// Controller to handle updating a user profile by ID
async function updateProfile(req, res) {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const { name, email, phone } = req.body;
    await profile.update({ name, email, phone });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while updating the profile' });
  }
}

// Controller to handle deleting a user profile by ID
async function deleteProfile(req, res) {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    await profile.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the profile' });
  }
}

module.exports = {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
};
