/**
*  File: artists.js 
*
*  Description: Handle any routing for the 
*     artists.json data. Uses express to route.
*
*  Class: Comp 3612
*
*  Name: Ben Cacic
*/

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../api', 'artists.json');
const jsonData = fs.readFileSync(jsonPath, 'utf8');
const artistsApi = JSON.parse(jsonData);

// Gets all artists
router.get('/', (req, res) => {
  res.json(artistsApi);
});

// Gets artists by nationality
router.get('/:country', (req, res) => {
    const countryLower = req.params.country.toLowerCase();
    const artistsCountry = artistsApi.filter(a =>
        a.Nationality.toLowerCase().includes(countryLower));
      
    if (artistsCountry.length > 0) {
      res.json(artistsCountry);
    } else {
        res.status(404).json({ message: `No artists from '${countryLower}' have been found` });
    }
  });

module.exports = router;
