require('dotenv').config()
const app = require('./app.js')
const logger = require('./utils/logger.js')
const config = require('./utils/config.js')

const PORT = process.env.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
