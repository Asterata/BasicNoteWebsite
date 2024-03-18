
const crypto = require('crypto');

// DONT FORGET TO ENCRYPT YOUR NOTES
const encryptionKey = ""; 

function encryptString(text) {
  const iv = crypto.randomBytes(16); // Initialization vector
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return {
    iv: iv.toString('hex'),
    data: encrypted
  };
}

function decryptString(data) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(data.iv, 'hex'));

  let decrypted = decipher.update(data.data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

module.exports = {
  encrypt: encryptString,
  decrypt: decryptString
};