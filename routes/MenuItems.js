const router = require('express').Router()
const { 
    getAllMenuItems, 
    getMenuItemById, 
    createMenuItem, 
    deleteMenuItemById 
} = require('../controllers/MenuItems')

router.get('/all', getAllMenuItems)
router.get('/:id', getMenuItemById)
router.post('/', createMenuItem)
router.delete('/:id', deleteMenuItemById)

module.exports = router