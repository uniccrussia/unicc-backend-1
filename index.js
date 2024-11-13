const express = require('express')
const path = require('path');
const fs = require('fs');
var cors = require('cors')
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/submit-form', (req, res) => {
    // Extract form data from request body
    const formData = req.body;

    const fs = require('fs').promises; // Use promises with fs
    const path = require('path');
    
    // Define the path to the JSON file
    const filePath = path.join(__dirname, 'data.json');
    
    // Function to read existing data from the JSON file
    async function readData() {
        try {
            const data = await fs.readFile(filePath, 'utf8');
            return JSON.parse(data); // Parse the JSON data
        } catch (error) {
            // Return an empty array if file not found or parsing error
            if (error.code === 'ENOENT') return []; // File not found
            throw new Error('Error reading or parsing data: ' + error.message);
        }
    }
    
    // Function to write data back to the JSON file
    async function writeData(data) {
        try {
            await fs.writeFile(filePath, JSON.stringify(data, null, 2));
            console.log('Data appended successfully.');
        } catch (error) {
            throw new Error('Error writing data: ' + error.message);
        }
    }
    
    // Main function to append new data
    async function appendData(newData) {
        try {
            const jsonData = await readData(); // Read existing data
            jsonData.push(newData); // Append new data
            await writeData(jsonData); // Write updated data
        } catch (error) {
            console.error(error.message);
        }
    }

    
    // Call the function to append new data
    appendData(formData);

    res.json({
        success:true,
        message:"User Registration Successfull",
        data:formData,
    })
    
});

app.post("/login" ,  async(req, res) =>{
    const data = req.body
    
    const fs = require('fs').promises; // Use promises with fs
    const path = require('path');

    const filePath = path.join(__dirname, 'data.json');

        
    // Function to read existing data from the JSON file
    async function readData() {
        try {
            const data = await fs.readFile(filePath, 'utf8');
            return JSON.parse(data); // Parse the JSON data
        } catch (error) {
            // Return an empty array if file not found or parsing error
            if (error.code === 'ENOENT') return []; // File not found
            throw new Error('Error reading or parsing data: ' + error.message);
        }
    }

    const jsonData = await readData();

    const filterData = jsonData.filter((user) => user.name === data.name)

    console.log(filterData)

    if(filterData.length === 0){
        res.json({
            success:false,
            message:"User Not Found. Plase Registration",
            data:{}
        })
    }
    
    res.json({
        success:true,
        message:"User Login Successfully",
        data
    })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})