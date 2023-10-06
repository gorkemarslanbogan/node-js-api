const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const UserController = require('./controller/UserController');

app.get('/kullanicilar', UserController.getAllUsers);
app.post('/kullanici-ekle', UserController.createUser);
app.get('/kullanicilar/:id', UserController.getUserById);

app.listen(port, () => {
  console.log(`API dinleniyor: http://localhost:${port}`);
});

