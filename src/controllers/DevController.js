const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },

  async destroy(request, response) {
    const { github_username } = request.body;

    const dev = await Dev.findOneAndRemove({
      github_username
    });

    return response.json({});
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      let { name = login, avatar_url, bio } = apiResponse.data;
      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    return response.json(dev);
  },

  async update(request, response) {
    const {
      github_username,
      name,
      techs,
      latitude,
      longitude,
      avatar_url,
      bio
    } = request.body;
    console.log(dev);

    let techsArray = null;
    if (techs) techsArray = parseStringAsArray(techs);

    let dev = await Dev.findOneAndUpdate(
      { github_username },
      { name, latitude, longitude }
    );

    return response.json(dev);
  }
};
