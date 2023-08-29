const router = require('express').Router(); //ot nod-moduele/express
const { search } = require('../services/create') //logikata


router.get('/search', async (req, res) => {
  let inputText = req.query.text; //inputa <name="text">
  let inputPay = req.query.platform; //inputa <name="payment">
  let searching = await search(inputText, inputPay);
  
  res.json(searching)
})

module.exports = router;