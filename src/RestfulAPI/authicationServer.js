require("dotenv").config();

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

app.post('/token', (req, res) =>{
    const refreshToken = req.body.token
    if(refreshToken == null) return res.sendStatus(401)
    if(refreshToken.includes(refreshToken)) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
        if(err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name})
        res.json({accessToken: accessToken})
    })
})

app.post('/login', (req, res) =>{
    
    //authenticate user
    const username  = req.body.username
    const user= { name: username }

    //getting access token
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    res.json({ accessToken: accessToken, refreshToken: refreshToken})

})

app.delete('/logout', (req, res)=>{
    refreshToken = refreshToken.filter(token => token !== req.body.token)
    res.send(204)
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
}

app.listen(4000);