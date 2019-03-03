import * as functions from 'firebase-functions';
import * as express from 'express'
import * as routers from './routes/Routes'

let app = express()
app.use(routers)

export const helloWorld = functions.https.onRequest(app)
