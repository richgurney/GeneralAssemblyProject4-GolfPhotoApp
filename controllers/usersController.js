var User   = require('../models/user');

function usersIndex(req, res) {
  User.find(function(err, users){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json(users);
  });
}

function usersShow(req, res){
  var id = req.params.id;
  User.findById({_id: id})
    .populate("tournaments")
    .exec(function(err, users){
      if (err) return res.status(404).json({message: 'Something went wrong.'});
        res.status(200).send(users);
  })
}

// function usersShow(req, res){
//   User.findById(req.params.id, function(err, user){
//     if (err) return res.status(404).json({message: 'Something went wrong.'});
//     res.status(200).json({ user: user });
//   });
// }

function usersUpdate(req, res){
  // console.log(req.body)
  User.findById(req.params.id,  function(err, user) {
    if (err) return res.status(500).json({message: "Something went wrong!"});
    if (!user) return res.status(404).json({message: 'No user found.'});

    if (req.body.user.local.fullname) user.local.fullname = req.body.user.local.fullname;
    if (req.body.user.local.email) user.local.email = req.body.user.local.email;

    user.save(function(err, user) {
      // console.log(user)
     if (err) return res.status(500).json({message: "Something went wrong!"});

      res.status(201).json({message: 'User successfully updated.', user: user});
    });
  });
}

function usersDelete(req, res){
  User.findByIdAndRemove({_id: req.params.id}, function(err){
   if (err) return res.status(404).json({message: 'Something went wrong.'});
   res.status(200).json({message: 'User has been successfully deleted'});
  });
}

module.exports = {
  usersIndex:  usersIndex,
  usersShow:   usersShow,
  usersUpdate: usersUpdate,
  usersDelete: usersDelete
};
