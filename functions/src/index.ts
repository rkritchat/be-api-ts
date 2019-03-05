import * as functions from 'firebase-functions';
import * as express from 'express'
import * as routers from './routes/Routes'
import * as cors from 'cors'

let app = express()
app.use(cors({ origin: true }))
app.use(routers)

export const helloWorld = functions.https.onRequest(app)
