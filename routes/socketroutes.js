import express from "express"
import {socketController} from '../controllers/socketcontroller.js'
const router = express.Router()
router.get('/seismicdata',socketController)
export default router