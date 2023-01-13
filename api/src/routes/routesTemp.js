const { Router } = require('express');
const { Temperament } = require('../db.js');
const { API_KEY } = process.env;
const express = require('express');
const axios = require('axios');
const temperaments = express.Router();
const urLink = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

temperaments.use(express.json());

temperaments.get("/temperament", async (req, res) => {
    const apiTemp = await axios.get(urLink);
    const temperaments = apiTemp.data.map((e) => e.temperament);
    const temps = temperaments.toString().split(",");

    temps.forEach((e) => {
        let i = e.trim();
        Temperament.findOrCreate({
            where: { name: i },
        });
    });

    const allTemp = await Temperament.findAll();
    res.send(allTemp);
});

module.exports = temperaments;