const express = require('express');
const profile = require('../../models/Profile');
const profileRouter = express.Router();

// Read all profiles

profileRouter.get('/', (req, res) => {
  Profile.find()
    .then(profiles => {
      res.json(profiles);
    })
    .catch(err => console.log(err));
})

// Read one profile by email

profileRouter.get('/:email', (req, res) => {
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

profileRouter.post('/', (req, res) => {
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

// Update one profile

profileRouter.put('/:email', (req, res) => {
  const { email } = req.params;
  const { firstName, lastName, aboutMe, age } = req.body;
  
  Profile.findOne({ email })
    .then(profile => {
       if(profile){
          Profile.findOneAndUpdate(
            { email }, 
            {$set: {firstName, lastName, aboutMe, age}}, 
            {new: true})
            .then(updatedProfile => {
              res.json(updatedProfile)
            })
            .catch(err => res.status(500).json({message: err}));  
       }
    })
})


// Delete one profile

profileRouter.delete('/:email', (req, res) => {
  const email = req.params.email;
  Profile.findOne({ email })
    .then(profile => {
      if(!profile){
        return res.status(404).json({message: `Profile for ${email} not found`})
      }
      profile.remove()
        .then(() => res.status(204).json({message: `Profile for ${email} successfully deleted`}))
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json({message: err}));
})

module.exports = profileRouter;