const Offre = require("../../models/offreSchema");

exports.getAllOffre = async (req, res) => {
  try {
    const result = await Offre.find({ isActive: true }).populate(
      "category location",
      "title"
    ).sort({ _id: -1 });
    if (result.length < 1)
      return res.status(404).json({ message: "Aucune offre trouvée." });
    res.status(201).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



exports.getOffreById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Offre.findOne({_id: id , isActive:true}).populate("category location", "title");
    if (!result){
      return res.status(404).json({ message: "Aucune offre trouvée." });
    }else{
    res.status(201).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




