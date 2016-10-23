var express = require('express');
var router = express.Router();
let models = require('../models')
let Memos = models.Memos
/* GET home page. */
router.get('/p/:page/', function(req, res, next) {
  let page = req.params.page
  let set_offset = (page - 1) * 5
  // console.log(`saf`);
  Memos.findAll({
    offset: set_offset,
    limit: 5,
    order: 'id DESC'
  }).then((data_memo) => {
    Memos.findAll().then((data_memo_page) => {
      res.render('index', { title: 'Memo', data_memo: data_memo, data_memo_page: data_memo_page, page: page});
    })
  })
});

router.get('/', function(req,res){
  res.redirect('/p/1')
})

router.post('/p/:page/add', function(req, res, next) {
  console.log('aadsfsd');
  if(req.body.content_memo.length === 0){
    let page = req.params.page
    let set_offset = (page - 1) * 5
    Memos.findAll({
      offset: set_offset,
      limit: 5,
      order: 'id DESC'
    }).then((data_memo) => {
      Memos.findAll().then((data_memo_page) => {
        res.render('index', { title: 'Memo', data_memo: data_memo, data_memo_page: data_memo_page, page: page, err:"Input must be filled"});
      })
    })
  }else{
    Memos.create({
      content: req.body.content_memo
    }).then(() => {
      console.log(`Create Content Memo Success`);
      res.redirect(`/p/${req.params.id}`)
    })
  }
});

router.get('/p/:page/edit/:id', fucntion(req, res){

})

module.exports = router;
