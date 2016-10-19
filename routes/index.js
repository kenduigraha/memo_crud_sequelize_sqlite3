var express = require('express');
var router = express.Router();
let models = require('../models')
let Memos = models.Memos
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Memo' });
});

router.post('/', (req, res, next) => {
  console.log(req.body.content_memo);
  Memos.create({
    content: req.body.content_memo
  }).then(() => {
    console.log(`Create Content Memo Success`);
  })
  res.redirect('/')
})
module.exports = router;
