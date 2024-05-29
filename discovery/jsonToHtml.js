const fs = require('fs');

function transform(data){
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
            <body>
                <table> 
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>value</th>
                            <th>count</th>
                        </tr>
                    </thead>
                    <tbody>
                    ${data.collection.map((id)=> {
                        return `
                            <tr>    
                                <td>${id}</td>
                                <td>${data.map[id].value}</td>
                                <td>${data.map[id].count}</td>
                            </tr>
                        `
                    }).join('')}
                    </tbody>
                </table>
            
            </body>
        </html>
    
    `;
}


fs.readFile('discovery/resource.json', 'utf-8', (err, data)=> {
    if (err){
        console.error(err);
        return;
    }
    let json = JSON.parse(data);
    fs.writeFile('discovery/index.html', transform(json), 'utf-8', (err)=> {
        if (err){
            console.error(err)
        }
    });
    
})