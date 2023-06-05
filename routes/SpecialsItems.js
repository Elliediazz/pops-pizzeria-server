const router = require('express').Router()
const { 
    getAllSpecialsItems, 
    getSpecialsItemById, 
    createSpecialsItem, 
    deleteSpecialsItemById 
} = require('../controllers/SpecialsItems')

router.get('/all', getAllSpecialsItems)
router.get('/:id', getSpecialsItemById)
router.post('/', createSpecialsItem)
router.delete('/:id', deleteSpecialsItemById)

module.exports = router