const express = require('express');
const user = require('../../models/User');
const router = express.Router(); // Intialize Router

// router.get('/', (req, res) => res.json({message: "Welcome to User route"}));

router.get('/', (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => console.log(err));
})

// url /api/users/?name=evan
// url /api/users/evan
// url /api/users/evan?comment=id


router.get('/:name', (req, res) => {
  const { name, password, avatar } = req.params;
  User.findOne({ name })
    .then(user => {
      console.log(user);
      if(!user){
        return res.status(404).json({message: `User: ${name} not found`});
      }
      res.json(user);
    })
    .catch(err => res.status(500).json({message: err}));
})

router.post('/', (req, res) => {
  const { name, password, avatar } = req.body;
  const newUser = new User({
    name,
    password,
  })

  newUser.avatar = avatar;
  
  newUser.save(); // save newly added user to database
})

module.exports = router;