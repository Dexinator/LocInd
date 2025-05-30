const express = require('express');
const router = express.Router();
const merchantController = require('../controllers/merchantController');

/**
 * @route GET /api/merchant/feed.xml
 * @desc Genera el feed XML para Google Merchant Center
 * @access Public
 */
router.get('/feed.xml', (req, res) => merchantController.generateXMLFeed(req, res));

/**
 * @route GET /api/merchant/feed.txt
 * @desc Genera el feed TXT (TSV) para Google Merchant Center
 * @access Public
 */
router.get('/feed.txt', (req, res) => merchantController.generateTextFeed(req, res));

/**
 * @route GET /api/merchant/stats
 * @desc Obtiene estadísticas del catálogo de productos
 * @access Public
 */
router.get('/stats', (req, res) => merchantController.getFeedStats(req, res));

module.exports = router; 