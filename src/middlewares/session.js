const session = require('express-session');
const app = express();

// Configura el middleware de express-session
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true
}));

// Aquí configura tus rutas
app.use('/auth', authControllers);
