var express = require('express');
var router = express.Router();

const {
    index,
    newSuperv,
    getSuperv,
    updateSuperv,
    deleteSuperv,
    getSupervDealers,
    newSupervDealer
} = require('../controllers/superv')

router.get('/', index); 
router.post('/', newSuperv);
router.get('/:supervId',getSuperv);
router.put('/:supervId',updateSuperv);
router.delete('/:supervId',deleteSuperv);

router.get('/:supervId/dealer',getSupervDealers);
router.post('/:supervId/dealer',newSupervDealer)
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
