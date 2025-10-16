import express from 'express'
import dotenv from 'dotenv'
import Stripe from 'stripe'

dotenv.config()

const app = express()
const port = process.env.PORT || 4242
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''
const stripe = new Stripe(process.env.STRIPE_API_KEY || '', { apiVersion: '2024-06-20' })

// Stripe requires raw body to verify signatures
app.post('/webhook/stripe', express.raw({ type: '*/*' }), (req, res) => {
  const sig = req.headers['stripe-signature']
  let event

  try {
    if (webhookSecret) {
      event = Stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
    } else {
      event = JSON.parse(req.body.toString())
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      console.log('Pro purchase confirmed:', session.id)
      // TODO: mark user as Pro in your database using session.customer / client_reference_id
      break
    }
    default:
      console.log('Unhandled event type:', event.type)
  }

  res.json({ received: true })
})

app.get('/', (_req, res) => {
  res.send('Developer Utility Hub webhook server is running.')
})

app.listen(port, () => {
  console.log(`Webhook server listening on http://localhost:${port}`)
})