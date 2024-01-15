const Category = require('../models/category');
const slugify = require('slugify');
const shortid = require('shortid');

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter(cat => cat.parentId == undefined);
  } else {
    category = categories.filter(cat => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList
};

exports.addCategory = async (req, res) => {
  try {

    const categoryObj = {
      name: req.body.name,
      slug: `${slugify(req.body.name)}-${shortid.generate()}`,
    };

    if (req.file) {
      categoryObj.categoryImage = process.env.API + '/public/' + req.file.filename;
    }

    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId;
    }

    const cat = new Category(categoryObj);
    const category = await cat.save();

    if (category) {
      return res.status(201).json({ category });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({})

    if (categories) {
      const categoryList = createCategories(categories);
      return res.status(200).json({ categoryList });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

exports.updateCategories = async (req, res) => {
  try {
    const { _id, name, parentId, type } = req.body;
    const updatedCategories = [];
    if (name instanceof Array) {
      const { } = req.body;
      for (let i = 0; i < name.length; i++) {
        const category = {
          name: name[i],
          type: type[i]
        };
        if (parentId[i] !== "") {
          category.parentId = parentId[i];
        }

        const updatedCategory = await Category.findOneAndUpdate({ _id: _id[i] }, category, { new: true });
        updatedCategories.push(updatedCategory);
      }
      return res.status(201).json({ updatedCategories: updatedCategories });
    } else {
      const category = {
        name,
        type
      };
      if (parentId !== "") {
        category.parentId = parentId;
      }
      const updatedCategory = await Category.findOneAndUpdate({ _id: _id }, category, { new: true });
      return res.status(201).json({ updatedCategory });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

exports.deleteCategories = async (req, res) => {
  try {
    const { ids } = req.body.payload;
    const deletedCategories = [];
    for (let i = 0; i < ids.length; i++) {
      const deletedCategory = await Category.findOneAndDelete({ _id: ids[i]._id });
      deletedCategories.push(deletedCategory);
    }
    if (deletedCategories.length == ids.length) {
      res.status(201).json({ message: 'Categories removed' });
    } else {
      res.status(400).json({ message: 'Something went wrong deleting categories' });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}