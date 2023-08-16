import express from 'express'
import hotelControllers from '../controllers/hotelControllers.js'
const router = express.Router()

router.post('/',hotelControllers.createDoc )
router.post('/update/:id',hotelControllers.updateDocById)
router.delete('/delete/:id', hotelControllers.deleteDocById)
router.get('/alldoc', hotelControllers.getAllDoc)



export default router