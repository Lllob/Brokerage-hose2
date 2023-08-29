const router = require('express').Router(); //ot nod-moduele/express

router.get('/', (req, res) => {
    res.send("App is Working");
    //res.render('home', { title: 'Home'})
});

module.exports = router; //otivame v config/routes.js