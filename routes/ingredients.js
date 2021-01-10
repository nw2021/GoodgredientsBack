const express = require('express')
const router = express.Router()
require('dotenv').config()
const fetch = require('node-fetch')

// make the post call to Einstein OCR api
router.post('/', async (req, res) => {
    try {
        const body = { 
            sampleLocation: 'https://i.stack.imgur.com/tWJ66.jpg',
            modelId: 'OCRModel' 
        }
 
        let response = await fetch('https://api.einstein.ai/v2/vision/ocr', {
                            method: 'post',
                            body:    JSON.stringify(body),
                            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.einstein_token}` },
                        }).then(res => res.json())


        let jsonArray = response.probabilities
        let retArray = []
        for(let i = 0; i < jsonArray.length; i++) {
            retArray.push(jsonArray[i].label)
        }
        res.status(200).json(retArray)
    } catch (err) {
        res.status(400).json( { message: err.message })
    }
})

module.exports = router