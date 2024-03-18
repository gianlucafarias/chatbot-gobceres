const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.POSTGRES_DB_HOST,
  user: process.env.POSTGRES_DB_USER,
  database: process.env.POSTGRES_DB_NAME,
  password: process.env.POSTGRES_DB_PASSWORD,
  port: process.env.POSTGRES_DB_PORT,
});

// Ruta de ejemplo para obtener historial
app.get('/history/:phone', async (req, res) => {
    const { phone } = req.params;
  
    try {
      const result = await pool.query('SELECT * FROM public.history WHERE phone = $1 ORDER BY created_at DESC LIMIT 1', [phone]);
      const history = result.rows[0];
      
      if (history) {
        history['refSerialize'] = history.refserialize;
        delete history.refserialize;
      }
  
      res.json(history);
    } catch (error) {
      console.error('Error al obtener historial:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  // Ruta de ejemplo para guardar historial
  app.post('/history', async (req, res) => {
    const { ref, keyword, answer, refSerialize, phone, options } = req.body;
  
    try {
      await pool.query('INSERT INTO public.history (ref, keyword, answer, refserialize, phone, options, created_at) VALUES ($1, $2, $3, $4, $5, $6, current_timestamp)',
        [ref, keyword, answer, refSerialize, phone, options]);
      
      res.status(201).json({ message: 'Historial creado con éxito' });
    } catch (error) {
      console.error('Error al guardar historial:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Servidor API escuchando en http://localhost:${port}`);
  });
  