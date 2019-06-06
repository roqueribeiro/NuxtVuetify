const express = require('express')
const app = express()
const axios = require('axios')
const baseUrl = 'https://api.mercadolibre.com'

app.get('/products', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  try {
    const response = await axios.get(
      `${baseUrl}/sites/MLB/search`,
      {
        params: {
          q: req.query.search,
          limit: req.query.limit || 4
        }
      },
      { useCache: true }
    )
    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json(error)
  }
})

app.get('/productAttributes/:id', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  try {
    const response = await axios.get(`${baseUrl}/items/${req.params.id}`, {
      useCache: true
    })
    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json(error)
  }
})

app.get('/productDescription/:id', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  try {
    const response = await axios.get(
      `${baseUrl}/items/${req.params.id}/description`,
      { useCache: true }
    )
    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = {
  path: '/api',
  handler: app
}
