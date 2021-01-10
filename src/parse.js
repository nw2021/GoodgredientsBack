
let data = ["sodium hydroxymethylglycinate", "Hydroquinone"];
const ingredients_src = require('./ingredients.json');
let result = [];

function parseData(data) {
    for (let item of data){
        item = item.toLowerCase();
        console.log(item);
        for (let i of ingredients_src) {
          if (i.label.toLowerCase() == item) {
            result.push(i); 
          }
        }
    }
  return result;
}