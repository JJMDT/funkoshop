
module.exports = {

  isLogged: (req, res, next) => {
    if (req.session && req.session.isLogged) {
          res.locals.isLogged = true; // Variable global disponible en las vistas
          next(); // Si hay una sesión, continuar con la siguiente función en la cadena de middleware
        } else {
          res.locals.isLogged = false; // Variable global disponible en las vistas
          res.redirect('/auth/login'); // Si no hay sesión, redirigir a la página de inicio de sesión
        }
  },

}

// sessionMiddleware.js

// module.exports = (req, res, next) => {
//   // Verificar si existe una sesión
//   if (req.session && req.session.isLogged) {
//     res.locals.isLogged = true; // Variable global disponible en las vistas
//     next(); // Si hay una sesión, continuar con la siguiente función en la cadena de middleware
//   } else {
//     res.locals.isLogged = false; // Variable global disponible en las vistas
//     res.redirect('/auth/login'); // Si no hay sesión, redirigir a la página de inicio de sesión
//   }
// };
