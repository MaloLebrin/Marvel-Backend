const express = require("express");
const router = express.Router();
const axios = require("axios");
const md5 = require("md5");
const uid2 = require("uid2");

const apiKey = "c7e953916c6466cbe0fee89255d30634";
const privateKey = "0d0ae33d622870b924f990ddd4e07fff931248b1"

router.get('/characters', async (req, res) => {
    try {
        const { offset, limit, name } = req.query
        // console.log(req.query);
        const title = name === undefined ? '' : "&nameStartsWith=" + name;
        // console.log(title);
        const ts = uid2(8);
        const hash = md5(ts + privateKey + apiKey)
        const response = await axios.get(
            `http://gateway.marvel.com/v1/public/characters?orderBy=name${title}&limit=${limit}&ts=${ts}&apikey=${apiKey}&hash=${hash}`
        );
        return res.json(response.data);
    } catch (error) {
        return res.status(400).json(error.message);
    }
})
router.get("/character/:id", async (req, res) => {
    try {
        const id = req.params.id;
        // const id = 1011334;
        const date = new Date();
        const ts = Math.floor(date.getTime() / 1000);
        const hash = md5(ts + privateKey + apiKey)

        const response = await axios.get(
            `http://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${apiKey}&hash=${hash}`
        );

        return res.json(response.data);
    } catch (error) {
        return res.status(403).json(error.message);
    }
});
router.get("/character/:id/comics", async (req, res) => {
    try {
        const id = req.params.id;
        const date = new Date();
        const ts = Math.floor(date.getTime() / 1000);
        const hash = md5(ts + privateKey + apiKey)

        const response = await axios.get(
            `http://gateway.marvel.com/v1/public/characters/${id}/comics?ts=${ts}&apikey=${apiKey}&hash=${hash}`
        );

        return res.json(response.data);
    } catch (error) {
        return res.status(403).json(error.message);
    }
})
router.get("/comics", async (req, res) => {
    try {
        const { offset, name } = req.query;
        const title = name === undefined ? '' : "&titleStartsWith=" + name;
        // console.log('title', title);
        const limit = 24;
        const ts = uid2(8);
        const hash = md5(ts + privateKey + apiKey)
        const response = await axios.get(
            `http://gateway.marvel.com/v1/public/comics?${title}&limit=${limit}&ts=${ts}&apikey=${apiKey}&hash=${hash}`
        );
        return res.json(response.data);
    } catch (error) {
        console.log("comics error", error.message);
    }
});
module.exports = router;