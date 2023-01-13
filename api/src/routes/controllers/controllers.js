const axios = require('axios');
const { API_KEY } = process.env;
const { Breed, Temperament } = require('../../db');
const urLink = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const getApi = async() => {
    const api = await axios.get(urLink);
    const info = await api.data.map((e) => {
        let temperamentArray = [];
        let heightArr = [];
        let weightArr = [];

        if (e.temperament) temperamentArray = e.temperament.split(", ");

        if (e.height.metric) heightArr = e.height.metric.split(" - ");

        if (e.weight.metric) weightArr = e.weight.metric.split(" - ");

        return {
            id: e.id,
            name: e.name,
            height: heightArr,
            weight: weightArr,
            temperaments: temperamentArray,
            life_span: e.life_span,
            image: e.image.url,
        };
    });

    return info;
};

const getDb = async() => {
    let dogsDB = await Breed.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }, 
    });
    return dogsDB;
};

const getAll = async() => {
    const dataApi = await getApi();
    const dataDb = await getDb();
    const mixedData = [...dataApi, ...dataDb];

    return mixedData;
};

module.exports = {
    getApi,
    getDb,
    getAll
}