const Dev = require ('../models/Dev')
const axios = require('axios');
const parseStringAsArray = require('../utils/pareseStringAsArray');

const { findConnections, sendMessage } = require('../websocket')

// index, show, stores, update, destroy

module.exports = {
    async index(req,res) {
        const devs = await Dev.find();

        return res.json(devs)
    },

    async store(req,res) {

        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });
        
        if(!dev){
    
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
    
        const { name = login, avatar_url, bio} = apiResponse.data
    
        const techsArray = parseStringAsArray(techs);
    
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
    
        console.log(techsArray)
        
        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
        });

        // Filtrar conexoes max 10km

        const sendSocketMessageTo = findConnections(
            { latitude, longitude },
            techsArray,
        )


        sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }
        return res.json(dev)
    },

    async update() {
        
    },

    async destroy() {},
}