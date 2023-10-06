const crypto = require('crypto');

class PasswordHash {
    static hashPassword(password){
        return crypto.createHash('sha256').update(password).digest('hex');
    }

    static verifyPassword(password, hashedPassword) {
        const hashedInputPassword = this.hashedPassword(password);
        return hashedPassword == hashedInputPassword;
    }
}