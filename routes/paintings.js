/**
*  File: paintings.js 
*
*  Description: Handle any routing for the 
*     paintings-nested.json data. Uses express to route.
*
*  Class: Comp 3612
*
*  Name: Ben Cacic
*/

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../api', 'paintings-nested.json');
const jsonData = fs.readFileSync(jsonPath, 'utf8');
const paintingsApi = JSON.parse(jsonData);

// Gets all paintings
router.get('/', (req, res) => {
  res.json(paintingsApi);
});

// Gets painting by ID
router.get('/:id', (req, res) => {
  const { id: paintingId } = req.params;
  const painting = paintingsApi.filter(p => p.paintingID == paintingId);

  if (painting.length > 0) {
    res.json(painting);
  } else {
    res.status(404).json({message: 'Painting does not exist '});
  }
});

// Gets paintings by gallery ID
router.get('/gallery/:id', (req, res) => {
  const { id: galleryId } = req.params;
  const paintingsGallery = paintingsApi.filter(p => p.gallery.galleryID == galleryId);

  if (paintingsGallery.length > 0) {
    res.json(paintingsGallery);
  } else {
    res.status(404).json({message: 'No paintings have been found under that gallery '});
  }
});

// Gets paintings by artist ID
router.get('/artist/:id', (req, res) => {
  const { id: artistId } = req.params;
  const paintingsArtist = paintingsApi.filter(p => p.artist.artistID == artistId);

  if (paintingsArtist.length > 0) {
    res.json(paintingsArtist);
  } else {
    res.status(404).json({message: 'No paintings have been found under that artist '});
  }
});

// Gets paintings by the entered year range
router.get('/year/:min/:max', (req, res) => {
  const { min: minYear } = req.params;
  const { max: maxYear } = req.params;
  const paintingsYearRange = paintingsApi.filter(p => {
    const year = p.yearOfWork;
    return year >= minYear && year <= maxYear;
  });

  if (paintingsYearRange.length > 0) {
    res.json(paintingsYearRange);
  } else {
    res.status(404).json({message: 'No paintings were found in that range '});
  }
});

// Gets paintings by title
router.get('/title/:text', (req, res) => {
  const textLower = req.params.text.toLowerCase();
  
  const paintingsTitle = paintingsApi.filter(p =>
    p.title.toLowerCase().includes(textLower)
  );

  if (paintingsTitle.length > 0) {
    res.json(paintingsTitle);
  } else {
    res.status(404).json({ message: `No paintings have been found to contain '${textLower}' in the title` });
  }
});

// Gets paintings by colour
router.get('/color/:text', (req, res) => {
  const colorText = req.params.text.toLowerCase();
  
  const paintingsByColor = paintingsApi.filter(p =>
    p.details.annotation.dominantColors.some(color =>
      typeof color.name === 'string' && color.name.toLowerCase().includes(colorText)
    )
  );

  if (paintingsByColor.length > 0) {
    res.json(paintingsByColor);
  } else {
    res.status(404).json({ message: `No paintings have been found to have '${colorText}' as a dominant color` });
  }
});

module.exports = router;