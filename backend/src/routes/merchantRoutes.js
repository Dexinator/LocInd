const express = require('express');
const router = express.Router();
const merchantController = require('../controllers/merchantController');

/**
 * @route GET /api/merchant/feed.xml
 * @desc Genera el feed XML para Google Merchant Center
 * @access Public
 */
router.get('/feed.xml', merchantController.generateXMLFeed);

/**
 * @route GET /api/merchant/feed.txt
 * @desc Genera el feed TXT (TSV) para Google Merchant Center
 * @access Public
 */
router.get('/feed.txt', merchantController.generateTextFeed);

/**
 * @route GET /api/merchant/stats
 * @desc Obtiene estadísticas del catálogo de productos
 * @access Public
 */
router.get('/stats', merchantController.getFeedStats);

module.exports = router; 