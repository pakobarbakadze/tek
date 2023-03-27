import express from 'express'
const router = express.Router()

import { createPayment } from '../controllers/stripeController.js'

router.route('/create-payment').post(createPayment)

export default router