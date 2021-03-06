const UserSchema = require("../models/user.model"); 
const ObjectID = require("mongoose").Types.ObjectId; 
 
module.exports.getAllUsers = async (req, res) => { 
    const users = await UserSchema.find().select("-password"); 
    res.status(200).json(users); 
  };

module.exports.getByIdUser = (req, res) => { 
    if (!ObjectID.isValid(req.params.id)) 
      return res.status(400).send("L'Id n'est pas reconnue : " + req.params.id); 
   
    UserSchema.findById(req.params.id, (err, docs) => { 
      if (!err) res.send(docs); 
      else console.log("ID unknown : " + err); 
    }).select("-password"); 
}; 

module.exports.updateUser =  async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) 
      return res.status(400).send("ID inconnue : " + req.params.id);

  const user = await UserSchema.findByIdAndUpdate(req.params.id, 
    { 
     username: req.body.username,
     email: req.body.email,
     password: req.body.password,
     
    
   }, 
   {new: true}
  );

  if (!user) return res.status(404).send('L\'ID de l\'utilisateur n\'est pas reconnue.');

  res.send(user)
}

module.exports.deleteUser =  async (req, res) => {
  const {id} = req.params
  if (!ObjectID.isValid(req.params.id)) 
      return res.status(400).send("ID inconnue : " + req.params.id);

  const user = await UserSchema.findByIdAndRemove(id)

  if (!user) return res.status(404).send('L\'ID de l\'utilisateur n\'est pas reconnue.');

  res.json({ message: "l'utilisateur a été supprimé"})
}
