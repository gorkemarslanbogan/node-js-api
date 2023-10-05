const dbConnection = require('./dbConnection');



function VeriEkle(testVerisi, callback) {
  const { username, password, firstname, lastname, api_key } = testVerisi;
  const sql = 'INSERT INTO users (username, password, firstname, lastname, api_key) VALUES (?, ?, ?, ?, ?)';
  const values = [username, password, firstname, lastname, api_key];

  dbConnection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Veri eklenirken hata oluştu:', err);
      callback(false);
    } else {
      console.log('Veri başarıyla eklendi:', result);
      callback(true);
    }
  });
}

function getKullanicilarJSON(callback) {
  const sql = 'SELECT * FROM users';

  dbConnection.query(sql, (err, results) => {
    if (err) {
      console.error('Verileri alırken hata oluştu:', err);
      callback(err, null);
      return;
    }

    const kullanicilarJSON = JSON.stringify(results);

    callback(null, kullanicilarJSON);
  });
}

module.exports = { VeriEkle, getKullanicilarJSON };

