const path = require('path');

const express = require('express');
const textController = require('../controllers/text');
const router = express.Router();

router.get('/', textController.newText);

router.get('/list', textController.getList);

router.post('/save', textController.postText);

router.get('/text/:textid', textController.getTextId);

router.post('/deleteText', textController.postDeleteText);


module.exports = router;