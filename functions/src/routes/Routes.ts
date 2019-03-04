import * as express from 'express'
import * as emailRoute from '../routes/EmailRoute'
import * as userRoute from '../routes/UserRoute'
import * as taskRoute from '../routes/TaskRoute'

let router = express.Router();

router.get('/', (req,res)=>{
    return res.send('Server is running')
})

router.use('/email', emailRoute)

router.use('/user', userRoute)

router.use('/task', taskRoute)

export = router