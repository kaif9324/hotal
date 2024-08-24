const express = require('express');
const router = express.Router();
const user_schema = require('../module/RstuData');
const { generatetoken, jwtMiddleware } = require('../jwt');

router.post('/signup', async (req, resp) => {
    try {
        const data = req.body;
        const newfamily = new user_schema(data)
        const response = await newfamily.save()
        console.log('data saved successfully ')
        const payload = {
            id: response.id,
            username: response.username
        }
        const token = generatetoken(payload);
    
        console.log('token is ', token)
       
        resp.status(200).json({ response: response, token: token })  
    } catch (err) {
        console.log(err)
        resp.status(500).json({ err: 'internel server error' })
    }
})
//login route 
router.post('/login', async (req, resp) => {
    try {
        const { username, password } = req.body;
        const user = await user_schema.findOne({ username: username });

        if (!user || !(await user.comparePassword(password))) {
            return resp.status(401).json({ error: "invalid username or password" })
        }
        const payload ={
            id:user.id,
            username:user.username
        }
        const token = generatetoken(payload)
        resp.json({ token })

    } catch (err) {
        console.log(err)
        resp.status(500).json({ error: "internel server error" })
    }

})
//profile 
router.get('/profile',jwtMiddleware, async (req,resp)=>{
    try{
        const userdata = req.user;
        const userID= userdata.id;
        const user = await user_schema.findById(userID);
        if(!user){
            resp.status(404).json({error:"user not found"})
        }
        resp.status(200).json({user})


        // const userdata = req.user;
        // console.log('user data from token ',userdata);
        // console.log(userdata)
        // const userID = userdata.id;
        // console.log("user id ",userID);
        // const user = await user_schema.findById(userID)
        // if(!user){
        //     resp.status(404).json({error:"user not found"})
        // }
        // resp.status(200).json({ user });
        
    }catch(error){
        console.log(error) 
        // console.error('Error in profile route:', err.message);
        resp.status(200).json({error:"internel server error"})
    }
  
})

router.get('/', jwtMiddleware, async (req, resp) => {
    try {
        // fetch all data 
        const data = await user_schema.find();
        console.log('data fetched')
        resp.status(200).json(data)
    } catch (err) {
        throw err
    }
})
module.exports = router;