const Location = require("../../models/locationSchema");

exports.getAllLocations = async (req, res) => {
  try {
    const result = await Location.find({isActive: true}).sort({ _id: -1 });
    if (result.length < 1)
      return res.status(404).json({ message: "Aucune emplacement trouvée." });
    res.status(201).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
exports.createLocation = async (req, res) => {
  try {
  if (!req.body.title)
    return res.status(400).json({ message: "Le champs et obligatoir." });
    const location = await Location.find(req.body);
    if (location.length > 0)
      return res.status(409).json({ message: "Cette localisation existe déjà." });
    
    const newLocation = new Location(req.body);
  
      await newLocation.save();
      res.status(201).json({ message: "Loacalisation créée avec succès." ,
        location: newLocation
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }

  }


exports.deleteLocation = async (req, res) => {
  const { id } = req.params;
  const location = await Location.findById(id);
  if (location.length < 1)
    return res
      .status(404)
      .json({ message: "Pas d’Location avec cet identifiant" });

  location.isActive = false;
  await location.save();

  res.status(200).json({
     message: "Location supprimée avec succès."});
};
