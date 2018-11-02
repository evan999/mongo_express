const express = require('express');
const profile = require('../../models/Profile');
const router = express.Router();

router.get('/', (req, res) => {
  Profile.find()
    .then(profiles => {
      res.json(profiles);
    })
    .catch(err => console.log(err));
})

// GET route for checking profiles collection

router.get('/:email', (req, res) => {
    const { firstName, lastName, aboutMe, age, email } = req.params;
    Profile.findOne({ email })
      .then(profile => {
        console.log(profile);
        if(!profile){ // profile not found
          return res.status(404).json({message: `Profile not found`}); 
        }
        res.json(profile); // display profile as a json
      })
      .catch(err => res.status(500).json({message: err}));
})

// Create new profile

router.post('/', (req, res) => {
    const { firstName, lastName, aboutMe, age, email } = req.body;
    const newProfile = new Profile({
      firstName,
      lastName,
      aboutMe,
      age,
      email
    })
    
    newProfile.save()
      .then(profile => res.status(201).json(profile))
      .catch(err => res.status(500).json({message: err}));
})

router.delete('/:email', (req, res) => {
  const email = req.params.email;
  Profile.findOne({ email })
    .then(profile => {
      console.log(profile);
      if(!profile){
        return res.status(404).json({message: `Profile not found`});
      }
      profile.remove()
        .then(() => res.status(204).json({message: `Profile successfully deleted`}))
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json({message: err}));
})