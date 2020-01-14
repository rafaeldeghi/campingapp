const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {
    async index(req, res) {
        const { activitie } = req.query;

        const spots = await spot.find({ activities: activitie })

        return res.json(spots);
    },

  async store(req, res) {
    const { filename } = req.file;
    const { place, price, activities } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);

    if (!user) {
        return res.status(400).json({ error: 'User does not exist' });
    }

    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      place,
      price,
      activities: activities.split(',').map(tech => tech.trim()),
    })

    return res.json(spot)
  }
};