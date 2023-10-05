const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',     // Sunucu adresi (hostname)
    port: 3306,            // Sunucu portu
    user: 'root',          // Kullanıcı adı
    password: 'goRkem&01', // Şifre
    database: 'sys' // Veritabanı adı (isteğe bağlı)
  });

db.connect(err => {
  if (err) {
    console.error('Veritabanına bağlanırken hata oluştu: ' + err.stack);
    return;
  }
  console.log('Veritabanına bağlandı, threadId: ' + db.threadId);
});

module.exports = db;
