const Offre = require("../../models/offreSchema");

exports.getAllActiveOffres = async (req, res) => {
  try {

  const {
    title,
    location,
    category,
    type
  } = req.query;


  // Construire un objet de filtre en fonction des critères de recherche fournis
  const filter = {};
  if (title) {
    filter.title = { $regex: title, $options: 'i' }; // Utilise une expression régulière pour la recherche insensible à la casse
  }
  if (location) {
    filter.location = location;
  }
  if (category) {
    filter.category = category;
  }
  if (type) {
    filter.contractType = type;
  }
 
  filter.isActive = true;

    const result = await Offre.find(filter)
    .populate(
      "category location",
      "title"
    ).
    populate("candidates","fullName email phonenum").
    sort({ _id: -1 });
    
    if (result.length < 1)
      return res.status(404).json({ message: "Aucune offre n'est disponible pour le moment." });
    res.status(201).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


exports.getAllArchiveOffres = async (req, res) => {
  const {
    title,
    location,
    category,
    type
  } = req.query;



  // Construire un objet de filtre en fonction des critères de recherche fournis
  const filter = {};
  if (title) {
    filter.title = { $regex: title, $options: 'i' }; // Utilise une expression régulière pour la recherche insensible à la casse
  }
  if (location) {
    filter.location = location;
  }
  if (category) {
    filter.category = category;
  }
   if (type) {
    filter.contractType = type;
  }

 
  filter.isActive = false;
  try {
    const result = await Offre.find(filter)
    .populate(
      "category location",
      "title"
    )
    .populate("candidates","fullName email phonenum")
    .sort({ _id: -1 });
    if (result.length < 1)
      return res.status(404).json({ message: "Aucune offre n'est archivée pour le moment." });
    res.status(201).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getOffreById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Offre.findById(id).populate("category location", "title");
    if (!result)
      return res.status(404).json({ message: "Aucune offre trouvée." });
    res.status(201).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createOffre = async (req, res) => {
  const newOffre = new Offre(req.body);

  if (!newOffre.title ||!newOffre.description ||!newOffre.category ||!newOffre.location || !newOffre.contractType || !newOffre.educationLevel)
    return res
     .status(400)
     .json({ message: "Veuillez renseigner tous les champs obligatoires." });

  try {
    await newOffre.save();
    res.status(201).json({ message: "Offre créée avec succès." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateOffre = async (req, res) => {
  const { id } = req.params;
  const updatedOffre = req.body;
  const offre = await Offre.findById(id);
  if (offre.length < 1)
    return res
      .status(404)
      .json({ message: "Pas d’offre avec cet identifiant" });

  await Offre.findByIdAndUpdate(id, { ...updatedOffre, id }, { new: true });

  res.status(201).json({ message: "Mise à jour de l’offre réussie." });
};

exports.deleteOffre = async (req, res) => {
  const { id } = req.params;
  const offre = await Offre.findById(id);
  if (offre.length < 1)
    return res
      .status(404)
      .json({ message: "Pas d’offre avec cet identifiant" });

  offre.isActive = false;
  offre.archivedAt = Date.now();
  await offre.save();

  res.status(200).json({ message: "Offre Archiver avec succès." });
};


exports.getAllOffres =async (req, res) => {
  try {
    const result = await Offre.find()
    .populate(
      "category location",
      "title"
    )
    .populate("candidates","fullName email phonenum")
    .sort({ _id: -1 });
    res.status(201).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

}