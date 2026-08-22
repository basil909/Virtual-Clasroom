import { Router } from 'express'
import { PRICING_PLANS } from '../data/pricing.js'

export const pricingRoutes = Router()

pricingRoutes.get('/', (_req, res) => {
  res.json({ plans: PRICING_PLANS })
})
