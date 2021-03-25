const bcrypt = require('bcrypt');

const SALT_ROUNDS = bcrypt.genSaltSync(process.env.SALT_ROUNDS);
const password = process.env.PASSWORD;
const hashedString = bcrypt.hashSync(password, SALT_ROUNDS);

const isMatch = bcrypt.compareSync('isTheSuperSecretPassword_Yellow?', hashedString);