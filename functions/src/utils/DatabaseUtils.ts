import * as admin from 'firebase-admin'
import { BeConstant } from '../constant/BeConstant'

let con = admin.initializeApp(BeConstant.DATABASE_CONFIG)

export = con