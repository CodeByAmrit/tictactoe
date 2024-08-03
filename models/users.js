const { con } = require('./schema');
const { setUser } = require('../services/oauth');
const { json } = require('body-parser');

async function createUser(req, res) {
  const { first_name, last_name, email, password } = req.body;

  try {
    const [rows] = await con.execute(
      'INSERT INTO users (Name, email, password) VALUES (?, ?, ?)',
      [`${first_name} ${last_name}`, email, password]
    );

    res
      .status(201)
      .send(
        `<script>alert("User Created Successfully. Id = ${email}"); window.location.href = "/";</script>`
      );
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal server error');
  }
}

async function createScore(req, res) {
  const id = req.params.id;
  let { first_name, dateTime, result } = req.body;

  try {
    const [rows] = await con.execute(
      'INSERT INTO scoreSchema (name, dateTime, result, playerId) VALUES (?, ?, ?, ?)',
      [first_name, dateTime, result, id]
    );

    console.log(rows);
    

    res.status(201).json({ record: { name: first_name, dateTime, result, playerId: id } });
  } catch (error) {
    console.error('Error creating score:', error);
    res.status(500).send('Internal server error');
  }
}

async function getScore(req, res) {
  const { id } = req.params;

  try {
    const [rows] = await con.execute('SELECT * FROM scoreSchema WHERE playerId = ?', [id]);

    if (rows.length === 0) {
      return res.status(401).json({ status: false, result: 'not found' });
    }
    return res.json({ result: rows });
  } catch (error) {
    console.error('Error getting scores:', error);
    return res.status(500).send('Internal server error');
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const [rows] = await con.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

    if (rows.length === 0) {
      return res
        .status(401)
        .send(
          `<script>alert("email or password is not correct"); window.location.href = "/";</script>`
        );
    }
    const token = setUser(rows);    
    res.cookie('uid', token, { httpOnly: true });
    return res.redirect('/');
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).send('Internal server error');
  }
}

module.exports = { createUser, loginUser, createScore, getScore };
