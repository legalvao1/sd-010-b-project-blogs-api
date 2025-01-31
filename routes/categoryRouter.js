const express = require('express');
const categoryController = require('../controllers/categoryController');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/', validateJWT, categoryController.createCategory);
router.get('/', validateJWT, categoryController.getCategories);

module.exports = router;