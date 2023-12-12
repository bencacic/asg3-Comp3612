/**
*  File: galleries.js 
*
*  Description: Handle any routing for the 
*     galleries.json data. Uses express to route.
*
*  Class: Comp 3612
*
*  Name: Ben Cacic
*/

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../api', 'galleries.json');
const jsonData = fs.readFileSync(jsonPath, 'utf8');
const galleriesApi = JSON.parse(jsonData);

// Gets all galleries
router.get('/', (req, res) => {
  res.json(galleriesApi);
});

// Gets galleries by country of origin
router.get('/:country', (req, res) => {
    const countryLower = req.params.country.toLowerCase();
    const galleriesCountry = galleriesApi.filter(g =>
        g.GalleryCountry.toLowerCase().includes(countryLower));

    if (galleriesCountry.length > 0) {
      res.json(galleriesCountry);
    } else {
        res.status(404).json({ message: `No galleries from '${countryLower}' have been found` });
    }
  });

module.exports = router;
