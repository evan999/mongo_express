const express = require('express');
const profile = require('../../models/Profile');
const router = express.Router();

router.get('/', (req, res) => {
    Profile.find()
        .then(profile => {
            res.json(profile);
        })
        .catch(err => console.log(err));
})

router.get('/:email', (req, res) => {
    const { firstName, lastName, aboutMe, age, email } = req.params;
    Profile.findOne({ email })
      .then(profile => {
        console.log(profile);
        if(!profile){
          return res.status(404).json({message: 'Profile not found'})
        }
        res.json(profile);
      })
      .catch(err => res.status(500).json({message: err}));
})