var express = require('express');
var router = express.Router();
let models = require('../models')
let Memos = models.Memos
/* GET home page. */
router.get('/p/:id', function(req, res, next) {
  let id = req.params.id
  let set_offset = (id - 1) * 5
  // console.log(`saf`);
  Memos.findAll({
    offset: set_offset,
    limit: 5
  }).then((data_memo) => {
    Memos.findAll().then((data_memo_page) => {
      res.render('index', { title: 'Memo', data_memo: data_memo, data_memo_page: data_memo_page, page_id: req.params.id});
    })
  })
});

router.get('/', function(req,res){
  res.redirect('/p/1')
})

// router.get('/p/:id', function(req, res, next) {
//   let id = req.params.id
//   let set_offset = (id - 1) * 5
//   /*
//   1 : 0 - 4
//   2 : 5 - 9
//   3 : 10 - 14
//   */
//   Memos.findAll({
//     offset: set_offset,
//     limit: 5
//   }).then((data_memo) => {
//     res.render('index', { title: 'Memo', data_memo: data_memo });
//   })
// });

// router.post('/', (req, res, next) => {
//   console.log(req.body.content_memo);
//   Memos.create({
//     content: req.body.content_memo
//   }).then(() => {
//     console.log(`Create Content Memo Success`);
//   })
//   res.redirect('/')
// })

router.post('/?p/:id?/add', function(req, res, next) {
  // res.render('index', { title: 'Memo' });
  // console.log('masuk sini');
  // res.redirect('/test')
  // console.log(req.body.content_memo);
  Memos.create({
      content: req.body.content_memo
    }).then(() => {
      console.log(`Create Content Memo Success`);
      res.redirect(`/p/${req.params.id}`)
    })
});

module.exports = router;
