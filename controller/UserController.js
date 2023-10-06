
const db = require('../config/dbConnection');
const HttpStatusCodes = require('../utils/HttpResponses');
const PasswordHash = require('../utils/PasswordHash');

exports.createUser = (req, res) => {
    const { username, password, firstname, lastname, api_key } = req.body;
    const hashedPassword = PasswordHash.hashPassword(password);

    const insertQuery = 'INSERT INTO users (username, password, firstname, lastname, api_key) VALUES (?, ?, ?, ?, ?)';
    const values = [username, hashedPassword, firstname, lastname, api_key];
  
    db.query(insertQuery, values, (err, results) => {
      if (err) {
        console.error('Kullanıcı oluşturma hatası:', err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code).json({ error: HttpStatusCodes.INTERNAL_SERVER_ERROR.message });
      }
      return res.status(HttpStatusCodes.CREATED.code).json({ message: HttpStatusCodes.CREATED.message });
    });
  };
  

  exports.getAllUsers = (req, res) => {
    const query = 'SELECT * FROM users';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Kullanıcıları getirme hatası:', err);
        return res.status(500).json({ error: "HttpStatusCodes.INTERNAL_SERVER_ERROR.message" });
      }
  
      return res.status(200).json(results);
    });
  };  
  

  exports.getUserById = (req, res) => {
    const userId = req.params.id;
    const query = 'SELECT * FROM users WHERE id = ?';
    const values = [userId];
  
    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Kullanıcı getirme hatası:', err);
            return res.status(500).json({ error: "Internal Server Error" }); 
          }
          if (results.length === 0) {
            return res.status(404).json({ error: "Not Found" }); 
          }
          return res.status(200).json(results[0]);
    });
  };
  
  exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const { username, password, firstname, lastname, api_key } = req.body;
    const query = 'UPDATE users SET username = ?, password = ?, firstname = ?, lastname = ?, api_key = ? WHERE id = ?';
    const values = [username, password, firstname, lastname, api_key, userId];
  
    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Kullanıcı güncelleme hatası:', err);
        return res.status(500).json({ error: HttpStatusCodes.INTERNAL_SERVER_ERROR.message });
      }
  
      if (results.affectedRows === 0) {
        return res.status(HttpStatusCodes.NOT_FOUND.code).json({ error: 'Kullanıcı bulunamadı.' });
      }
  
      return res.status(200).json({ message: 'Kullanıcı güncellendi.' });
    });
  };
  
  exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    const query = 'DELETE FROM users WHERE id = ?';
    const values = [userId];
  
    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Kullanıcı silme hatası:', err);
        return res.status(500).json({ error: HttpStatusCodes.INTERNAL_SERVER_ERROR.message });
      }
  
      if (results.affectedRows === 0) {
        return res.status(500).json({ error: 'Kullanıcı bulunamadı.' });
      }

      return res.status(200).json();
    });
  };

  exports.updatePassword = (req, res) => {
    const userId = req.params.id;
    const  {newPassword} = req.body;
    const hashedNewPassword = PasswordHash.hashPassword(newPassword);
    const query = 'UPDATE users SET password = ? WHERE id = ?';
    const values = [hashedNewPassword, userId];
    db.query(query, values, (err, results) => {
      if(err){
        console.log('Şifre Güncelleme Hatası', err);
        return res.status(500).json({error: 'Şifre Güncelleme Hatası.'});
      }
      if (results.affectedRows === 1) {
        return res.status(200).json({ message: 'Şifre başarıyla güncellendi.' });
      } else {
        return res.status(404).json({ error: 'Kullanıcı bulunamadı veya şifre güncellenemedi.' });
      }
    });
  }