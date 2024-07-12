const { default: axios } = require('axios');
require("dotenv").config(); 
const express = require('express')
const app = express();





app.get('/categories/:categoryname/products', async (req, res) => {
    const payload = {
      companyName: "GLA-Bazaar",
      clientID: "2c1ad481-5aac-4f5a-8e2d-731fa1cf8eb0",
      clientSecret: "eMPVeOfpaHVaWLRf",
      ownerName: "Shyama Agrawal",
      ownerEmail: "shyama.agrawal_cs21@gla.ac.in",
      rollNo: "2115000990",
    };

    const response = await axios.post("http://20.244.56.144/test/auth", payload);
    // console.log(response.data)

    let { categoryname } = req.params;
    let n = req.query.n || 10;
    const token = response.data.access_token;
    // console.log(token)
    const products = await axios.get(
        `http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products?top=${n}&minPrice=1&maxPrice=10000`,
        {
            headers: {
                Authorization:`Bearer ${token}`
            }
        }
    );
    console.log(products.data)

    res.send('category')
})

app.listen(8080, () => {
    console.log('Server connected to port 8080');
})