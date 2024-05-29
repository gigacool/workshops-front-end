
const fs = require('fs');



let collection = (new Array(10).fill(null).map((_, index) => {
        return {
            id: index, 
            value: Math.random()*100,
            count: Math.floor(Math.random()*1000)
        }
    }))

let result = {
    collection:  collection.map((item)=> item.id),
    map: collection.reduce((reducer, item)=>{
        reducer[item.id] = item;
        return reducer
    }, {})
}


    
    fs.writeFile('discovery/resource.json',JSON.stringify(result, null, 0), 'utf-8', (error) => {
        if (error){
            console.error(error);
        }
    } )