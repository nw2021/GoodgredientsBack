const express = require('express')
const router = express.Router()
require('dotenv').config()
const fetch = require('node-fetch')

// handle post request from client
router.post('/', async (req, res) => {
    try {
        const body = { 
            sampleLocation: req.body.location,
            modelId: 'OCRModel' 
        }
        
        // send the client-specified image to the Salesforce Einstein OCR api to extract text from the image
        let response = await fetch('https://api.einstein.ai/v2/vision/ocr', {
                            method: 'post',
                            body:    JSON.stringify(body),
                            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.einstein_token}` },
                        }).then(res => res.json())

        // just get the names of the ingredients from the response, which includes other info that we won't use for now                
        let jsonArray = response.probabilities
        let retArray = []
        for(let i = 0; i < jsonArray.length; i++) {
            retArray.push(jsonArray[i].label)
        }

        // process the ingredient data by comparing to our dataset of harmful chemicals and send back any matches to the client
        let finalResult = processData(retArray)
        res.status(200).json(finalResult)
    } catch (err) {
        res.status(400).json( { message: err.message })
    }
})

// determine any matches to the list of harmful chemicals
function processData(data) {
    const ingredients_src = require('../data/ingredients.json')
    let result = []
    for (let item of data){
        item = item.toLowerCase()
        let itemdone = false
        for (let i of ingredients_src) {
          if (i.label.toLowerCase() == item && itemdone == false) {
            result.push(i)
            itemdone = true 
          }
        }
    }
    return result;
}

module.exports = router