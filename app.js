const express = require('express');
const app = express();
const PORT = 2000
app.use(express.static('public'));


app.get('/home', (req,res)=> res.sendFile(__dirname + '/public_html/index.html'));
app.get('/shop', (req,res)=> res.sendFile(__dirname + '/public_html/pages/shop/shop.html'));
app.get('/items', (req,res)=> res.sendFile(__dirname + '/public_html/pages/shop/item.html'));
app.listen(PORT, () => console.log(`servidor corriendo en el puerto ${PORT}`));
