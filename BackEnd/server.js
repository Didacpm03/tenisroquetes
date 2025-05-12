// Importar dependencias
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { createClient } = require('@supabase/supabase-js');

// Inicializar la app
const app = express();
const port = 5000;

// Configurar Supabase
const supabaseUrl = 'https://skjjfdhfthgasnysbrck.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrampmZGhmdGhnYXNueXNicmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NDExMzYsImV4cCI6MjA2MjExNzEzNn0.KgOKqRmSEAAc9h0dcZH5H9YLuSwvWriCR5DWY2bp-c4';
const supabase = createClient(supabaseUrl, supabaseKey);

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Ruta de prueba
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Ruta de registro
app.post('/register', async (req, res) => {
  const { username, first_name, last_name, email, password } = req.body;

  // Validar que todos los campos estén presentes
  if (!username || !first_name || !last_name || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    // Encriptar contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insertar en la tabla correcta
    const { data, error } = await supabase
      .from('Usersdos') // <--- este es el nombre correcto de tu tabla
      .insert([
        {
          username,
          first_name,
          last_name,
          email,
          password: hashedPassword,
        },
      ]);

    // Manejo de error en Supabase
    if (error) {
      console.error('Error al registrar usuario:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: '✅ Usuario registrado correctamente' });
  } catch (err) {
    console.error('Error en el servidor:', err);
    res.status(500).json({ error: '❌ Error en el servidor' });
  }
});

// Ruta de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validar que los campos estén presentes
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
  }

  try {
    // Buscar el usuario por email
    const { data: users, error } = await supabase
      .from('Usersdos')
      .select('*')
      .eq('email', email)
      .single();

    // Manejo de error o usuario no encontrado
    if (error || !users) {
      console.error('Error o usuario no encontrado:', error);
      return res.status(401).json({ error: '❌ Email o contraseña incorrectos' });
    }

    console.log('Usuario encontrado:', users); // Agregar logs para ver el usuario encontrado

    // Comparar contraseñas
    const passwordMatch = await bcrypt.compare(password, users.password);

    if (!passwordMatch) {
      console.log('Contraseña incorrecta'); // Agregar log para ver si la comparación falla
      return res.status(401).json({ error: '❌ Email o contraseña incorrectos' });
    }

    // Login exitoso
    res.status(200).json({
      message: '✅ Login exitoso',
      user: { id: users.user_id, username: users.username, email: users.email },
    });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: '❌ Error en el servidor' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`✅ Servidor corriendo en puerto ${port}`);
});
