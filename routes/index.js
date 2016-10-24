var express = require('express');
var router = express.Router();
let models = require('../models')
let Memos = models.Memos
/* GET home page. */
router.get('/p/:page', function(req, res, next) {
  let page = req.params.page
  let set_offset = (page - 1) * 5
  // console.log(`saf`);

  Memos.findAll({
    offset: set_offset,
    limit: 5,
    order: 'id DESC'
  }).then((data_memo) => {
    Memos.findAll().then((data_memo_page) => {
      let max_page = 0;
      if(data_memo_page.length/5 % 1 > 0){
        max_page = Math.floor(data_memo_page.length/5)+1
      }else{
        max_page = Math.floor(data_memo_page.length/5)
      }
      if(req.params.page > max_page){
        res.redirect(`/p/1`)
      }else{
        res.render('index', { title: 'Memo', data_memo: data_memo, data_memo_page: data_memo_page, page: page, max_page: max_page});
      }
    })
  })
});

router.get('/', function(req,res){
  res.redirect('/p/1')
})

router.post('/p/:page/add', function(req, res, next) {
  // console.log('aadsfsd');
  if(req.body.content_memo.length === 0){
    let page = req.params.page
    let set_offset = (page - 1) * 5
    Memos.findAll({
      offset: set_offset,
      limit: 5,
      order: 'id DESC'
    }).then((data_memo) => {
      Memos.findAll().then((data_memo_page) => {
        let max_page = 0;
        if(data_memo_page.length/5 % 1 > 0){
          max_page = Math.floor(data_memo_page.length/5)+1
        }else{
          max_page = Math.floor(data_memo_page.length/5)
        }
        res.render('index', { title: 'Memo', data_memo: data_memo, data_memo_page: data_memo_page, page: page, err:"Input must be filled", max_page: max_page});
      })
    })
  }else{
    Memos.create({
      content: req.body.content_memo
    }).then(() => {
      console.log(`Create Content Memo Success`);
      res.redirect(`/p/${req.params.page}`)
    })
  }
});

router.get('/p/:page/edit/:id', function(req, res, next){
  Memos.findOne({
    where: {
      id: req.params.id
    }
  }).then((data_edit) => {
    res.render('edit', {title: "Edit Memo", data_edit: data_edit, page: req.params.page})
  })
})

router.post('/p/:page/update', function(req, res, next) {
  // console.log(req.body.content_memo_edit);
  Memos.update({
    content: req.body.content_memo_edit
  },{
    where: {
    id: req.body.data_edit_id
  }
  }).then(() => {
    console.log(`Memo Updated`);
    res.redirect(`/p/${req.params.page}`)
  })
})

router.get('/p/:page/delete/:id', function(req, res, next) {
  Memos.destroy({
    where: {
      id: req.params.id
    }
  }).then(()=> {
    console.log(`delete success`);
    res.redirect(`/p/${req.params.page}`)
  })
})

module.exports = router;
