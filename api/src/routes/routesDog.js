const { Router } = require('express');
const express = require('express');
const { Breed, Temperament } = require('../db');
const { getAll } = require('./controllers/controllers');
const dogs = express.Router();

dogs.use(express.json());

dogs.get("/dogs", async (req, res) => { 
    const { name } = req.query;
    try {
        const allDogs = await getAll();
        
        if (name) {
            const dog = allDogs.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()));
    
            dog.length ? res.send(dog) : res.status(404).send("Dog not found");
        } else {
            return res.send(allDogs);
        };
    } catch (error) {
        res.status(404).json({ error: error.message });
    };
});

dogs.get("/dogs/:idRaza", async (req, res) => {
    try {
        const { idRaza } = req.params;
        const allDogs = await getAll();
        const dog = allDogs.filter((e) => e.id == idRaza);
    
        if (dog.length) return res.json(dog);
        else return res.status(404).send("Dog not found");
    } catch (error) {
        res.status(404).send({error: error.message})
    }
});

dogs.post("/dog", async (req, res) => {
    const { 
        name, 
        min_height, 
        max_height, 
        min_weight, 
        max_weight, 
        life_span,
        temperaments,
        image, 
    } = req.body;
    const mixedHeight = [];
    const mixedWeight = [];
    const minHeight = min_height;
    const maxHeight = max_height;
    const minWeight = min_weight;
    const maxWeight = max_weight;

    mixedHeight.push(minHeight, maxHeight);
    mixedWeight.push(minWeight, maxWeight);
    try {
    
        let dog = await Breed.create({
            name,
            height: mixedHeight,
            weight: mixedWeight,
            life_span,
            image: image || ('../controllers/default.jpg'),
        });
    
        let conbinedTemp = await Temperament.findAll({
            where:  { name: temperaments },
        });
    
        dog.addTemperament(conbinedTemp);
        res.send("Dog succesfully created!");
    } catch (error) {
        res.status(404).send({error: error.message})
    }
    
});

module.exports = dogs;