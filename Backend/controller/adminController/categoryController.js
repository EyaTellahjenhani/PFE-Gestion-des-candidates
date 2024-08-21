const Category = require("../../models/categorySchema");

exports.getAllCategory = async (req, res) => {
  try {
    const result = await Category.find({isActive: true}).sort({ _id: -1 });
    if (result.length < 1)
      return res.status(404).json({ message: "Aucune catégorie trouvée." });
    res.status(201).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};




exports.createCategory = async (req, res) => {
  try {
    if (!req.body.title)
      return res.status(400).json({ message: "Titre de la catégorie est requis." });
  
  const category = await Category.find(req.body);
  if (category.length > 0)
    return res.status(409).json({ message: "Cette catégorie existe déjà." });
  
  const newCategory = new Category(req.body);

    await newCategory.save();
    res.status(201).json({ message: "Catégorie créée avec succès." ,
      category: newCategory
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};














exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (category.length < 1)
    return res
      .status(404)
      .json({ message: "Pas d’category avec cet identifiant" });

  category.isActive = false;
  await category.save();

  res.status(200).json({
     message: "category supprimée avec succès."});
};