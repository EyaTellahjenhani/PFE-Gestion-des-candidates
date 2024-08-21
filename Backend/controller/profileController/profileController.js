const User = require("../../models/userSchema");
const cloudinary = require('cloudinary').v2;

exports.getUserInformation = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).exec();
        if (user) {
            res.status(200).json(
                user
            );
        } else {
            res.status(404).json({
                message: "Utilisateur non trouvé",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération de l'utilisateur",
            error: error.message,
        });
    }
};

exports.updateUserInformation = async (req, res) => {
    
    try {
        const user =  await User.findById(req.user.id);
          if(user){
           user.fullName = req.body.fullName || user.fullName;
           user.email = req.body.email || user.email;
           user.phonenum = req.body.phonenum || user.phonenum;
           user.diplome = req.body.diplome || user.diplome;
           user.educationLevel = req.body.educationLevel || user.educationLevel;
           user.university = req.body.university || user.university;
             if (req.body.picture){
                 if (user.picture.public_id){
                     await cloudinary.uploader.destroy(user.picture.public_id);
                 }
                 
                 const result = await cloudinary.uploader.upload(req.body.picture, {
                     folder: "profile/"+user._id,
                     width: 150,
                     allowed_formats : ['jpg','png','jpeg'],
                     crop: "scale",
                 });
                 
                 user.picture = {
                     url: result.secure_url,
                     public_id: result.public_id,
                 };
 
             }
 
           user.save();
 
           res.status(200).json({
                 message: "Les informations de votre profil ont été modifiées avec succès",
                 user: user,
           });
         }else{
             res.status(404).json({
                 message: "Profile non trouvé",
             });
             }
 
     } catch (error) {
         res.status(500).json({
             message: "Erreur lors de la modificationde de votre profil",
             error: error.message,
         });
     }
    
};

exports.changePassword = async  (req, res) => {
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;

    if (confirmPassword === newPassword) {
        try {
            const user = await User.findById(req.user.id);
            user.password = newPassword;
            await user.save();
            
            res.status(200).json({message:"Votre mot de passe a été modifié avec succès"});
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la modification du mot de passe", error: error.message });
        }
    } else {
        res.status(400).json({ message: "Les mots de passe ne correspondent pas" });
    }
}


