const jwt = require('jsonwebtoken');
const jwtMiddleware = (req, resp, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) return resp.status(401).json({ error: "token not found" })

    const token = authorization.split(' ')[1];
    if (!token) return resp.status(401).json({ error: "unauthorized" })
    try {
     const decoded = jwt.verify(token,process.env.SECRATE_KEY)
      req.user = decoded.userdata;
     next()
     
    } catch (error) {
        resp.status(401).json({ error: 'invalid  token' })
        console.log(error)
    }


}
// generate token 
const generatetoken = (userdata)=>{
    return jwt.sign({userdata},process.env.SECRATE_KEY,{expiresIn:3000});
}
module.exports={generatetoken,jwtMiddleware}