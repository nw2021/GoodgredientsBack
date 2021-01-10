const express = require('express')
const router = express.Router()
require('dotenv').config()
const fetch = require('node-fetch')

// make the post call to Einstein OCR api
router.post('/', async (req, res) => {
    try {
        const body = { 
            sampleLocation: req.body.location,
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

        let finalResult = parseData(retArray)
        res.status(200).json(finalResult)
    } catch (err) {
        res.status(400).json( { message: err.message })
    }
})

function parseData(data) {
    const ingredients_src = require('./ingredients.json');
    let result = [];
    for (let item of data){
        item = item.toLowerCase();
        for (let i of ingredients_src) {
          if (i.label.toLowerCase() == item) {
            result.push(i); 
          }
        }
    }
  return result;
}

module.exports = router