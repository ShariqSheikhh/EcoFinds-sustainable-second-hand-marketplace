const { query, getOne, run } = require('../utils/db');

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await query('SELECT * FROM categories ORDER BY name');
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await getOne('SELECT * FROM categories WHERE id = ?', [req.params.id]);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ message: 'Error fetching category' });
  }
};

// Create a new category (Admin only)
exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });

  try {
    const existing = await getOne('SELECT id FROM categories WHERE name = ?', [name]);
    if (existing) return res.status(400).json({ message: 'Category exists' });

    const result = await run(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [name, description || null]
    );

    const newCategory = await getOne('SELECT * FROM categories WHERE id = ?', [result.id]);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ message: 'Error creating category' });
  }
};

// Update a category (Admin only)
exports.updateCategory = async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;

  try {
    const category = await getOne('SELECT * FROM categories WHERE id = ?', [id]);
    if (!category) return res.status(404).json({ message: 'Not found' });

    if (name && name !== category.name) {
      const exists = await getOne('SELECT id FROM categories WHERE name = ? AND id != ?', [name, id]);
      if (exists) return res.status(400).json({ message: 'Name taken' });
    }

    await run(
      'UPDATE categories SET name = ?, description = ? WHERE id = ?',
      [name || category.name, description !== undefined ? description : category.description, id]
    );

    const updated = await getOne('SELECT * FROM categories WHERE id = ?', [id]);
    res.json(updated);
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ message: 'Error updating category' });
  }
};

// Delete a category (Admin only)
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const inUse = await getOne('SELECT 1 FROM items WHERE category_id = ? LIMIT 1', [id]);
    if (inUse) return res.status(400).json({ message: 'Category in use' });

    await run('DELETE FROM categories WHERE id = ?', [id]);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ message: 'Error deleting category' });
  }
};
