const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/pareseStringAsArray');

module.exports = {
    async index(req, res) {
        console.log(req.query)
        // Buscar todos devs num raio de 10km
        // Filtrar 

        const { latitude, longitude, techs } = req.query;
        
        const techsArray = parseStringAsArray(techs);

        const dev = await Dev.find({
            techs: {
                $in:techsArray,
            },
            location: {
                $near: {
                  $geometry: {
                      type: 'Point',
                      coordinates: [longitude, latitude]
                  },
                  $maxDistance: 10000,
                },
            },
        });
        console.log(techsArray)
        return res.json(dev)
    }
}