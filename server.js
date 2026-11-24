const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

const dbPath = path.join(__dirname, 'valorant bd.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err.message);
  } else {
    console.log('Conectado ao SQLite com sucesso!');
  }
});

app.get('/api/skins', (req, res) => {
  db.all('SELECT * FROM skins', [], (err, rows) => {
    if (err) {
      res.status(500).json({ erro: err.message });
      return;
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});