const express = require('express');
const router = express.Router();

const User = require('../../model/user');

router.get('/:email', (req, res)=>{
    User.find({email: req.params.email})
    .then((user)=>{res.json(user);return} );
})

router.post('/',  (req, res) => {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    });
    User.create(newUser).then(()=>res.json({success: true}))
    // newUser.save(user=>res.json(user));
});
  
router.put('/',  (req, res) => {
    User.updateOne({email: req.body.email}, {password: req.body.newPassword}).then(()=>res.json({success: true}))
    // newUser.save(user=>res.json(user));
});

  
router.delete('/:email',(req, res) => {
    // User.findById(req.params.id)
    // .then(user=>user.remove().then(()=>res.json({success: true}))).
    // catch(err=>{res.status(404).json({success: false})
    // })
    User.remove({email: req.params.email}, function (err, user) {
        if (err) {
            res.status(404).json({success: false})
          } else {
            res.json({success: true})
        }
    });
});
  

module.exports = router;