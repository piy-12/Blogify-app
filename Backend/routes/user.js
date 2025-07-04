const {Router} = require('express');
const User = require('../models/user');
const bcrypt = require("bcrypt");
const { createTokenForUser } = require('../services/authentication');
const {checkForAuthentication}=  require("../middleware/auth");


const router = Router();

router.delete("/user/:id", checkForAuthentication(), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");


    if (req.user._id !== user._id.toString()) {
      return res.status(403).send("Unauthorized: You can only delete your own account");
    }

    await user.deleteOne(); 

    res.status(200).send("User and their comments/blogs deleted.");
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).send("Server error while deleting user");
  }
});



router.post('/signup', async (req,res)=> {
    const {fullName, email, password} = req.body;
    const exist = await User.findOne({email});
    if(exist) return res.json({
      guide: "User Already Exist. Please Sign in"
    })
    const hashedPassword =await bcrypt.hash(password,10);
    const newUser =  await User.create ({
      fullName,
      email,
      password: hashedPassword,
    });

 
    res.status(200).json({
    message: "User registered successfully",
    user: newUser
  });
});


router.post('/signin', async (req, res)=> {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if(!user) return res.status(404).json({message: "User Doesn't Exist. Create Account First"});
  try{
  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch){
    return res.status(400).json({message: "Invalid Email or Password"});
  }
  const token = createTokenForUser(user);
  return res.status(200).json({message: "signin succesfully",
    token,
    user,
  });
}
  catch(error){
      return res.status(400).json({ message: "Invalid Passoword" });
  }
});

module.exports = router;