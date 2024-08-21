const User = require("../../models/userSchema");
const generateToken = require("../../utils/auth");
const  generator = require('generate-password');
const sendEmail = require("../../utils/sendEmail");





exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Veuillez remplir tous les champs" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Aucun compte trouvé avec cet email" });
    }
    if (!user.isAdmin){
      return res.status(401).json({ message: "Vous n’êtes pas un administrateur" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe invalide" });
    }else
    {
    if (!user.emailConfirmed) {
      return res.status(400).json({ message: "Veuillez confirmer votre email pour continuer" });
    }

    if (!user.isActive) {
      return res.status(400).json({ message: "Votre compte a été désactivé" });
    }

    generateToken(res, user.id);
    res.status(200).json({
      message: "Connexion réussie.",
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullName,
        isAdmin: user.isAdmin,
     
      },
    });
  }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}


exports.addAdminAccount = async (req, res) => {
  try{
    const { fullName, email, phonenum } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({message:"Un utilisateur existe déjà avec ce mail"});
    } else if (!fullName || !email || !phonenum) {
      res.status(400).json({message:"Veuillez remplir tous les champs"});
    }
    else{
      const password = generator.generate({
        length: 10,
        numbers: true
      });

      const user = await User.create({
        fullName,
        email,
        password,
        phonenum,
        isAdmin: true,
        isActive: true,
        emailConfirmed: true,
      });

      if (user) {
        try {
          await sendEmail({
            email: email,
            subject: "Information sur le compte:",
            message: `Les informations de votre compte sont: <br> Email : ${email} <br> Mot de Passe : ${password}`,
          });
        } catch (error) {
          console.log(error);
        }
  
        res.status(201).json({
          message: "Administrator ajouté avec succès",
        });
      } else {
        res.status(400).json({ message: "Erreur lors de l'ajout d'un administrateur" });
      }
    }
  }catch (error)
  {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllAdmin = async (req, res) => {

  const {email} = req.query;

  const filter = {}

  if (email){
   filter.email = { $regex: email, $options: 'i' }
  }

  filter.isAdmin = true;
  filter._id= { $ne: req.user._id };



  const admins = await User.find(filter);
  try{

  if (admins.length < 1) {
    return res.status(404).json({ message: "Aucun autre administrateur trouvé que vous." });
  }
  else
  {
    res.status(200).json(admins);
  }
}catch (error)
  {
    res.status(500).json({ message: error.message });
  }


}


