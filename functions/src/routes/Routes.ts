import * as express from 'express'
import * as emailRoute from '../routes/EmailRoute'
import * as userRoute from '../routes/UserRoute'

let router = express.Router();

router.get('/', (req,res)=>{
    return res.send('Server is running')
})

router.use('/email', emailRoute)

router.use('/user', userRoute)

export = router