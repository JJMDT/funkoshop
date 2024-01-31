const bcryp = require("bcrypt");
const  {conn} = require("../config/conn");
//const conexion = require('../src/config/conn')
//const session = require("express-session");
//const { fields } = require("../middlewares/uploadFiles");

const authControllers = {
  login: async (req, res) => {
      res.render("auth/login");
  },

  doLogin: async (req, res) => {
 
    const data = req.body;
    const [userData] = await conn.execute(
      "select * from user where email = ?",
      [data.email]
    );

    if (userData && userData.length > 0) {
      const isMatch = await bcryp.compare(data.password, userData[0].password);

      if (!isMatch) {
        res.redirect("/auth/login");
        console.log("clave incorrecta ");
      } else {
        req.session.loggedin = true;
        req.session.user_id = userData[0].user_id;
        req.session.name = userData[0].name;
        req.session.lastname = userData[0].lastname;
        req.session.email = userData[0].email;
        console.log(`bienvenido ${data.email}`);
        res.render('admin/profile', {
          loggedin: req.session.loggedin || false, // Asegúrate de que loggedin esté definida, incluso si es falsa
          name: req.session.name // Asegúrate de que name esté definida, incluso si es una cadena vacía
        })
      }
    } else {
      console.log("usuario no registrado ");
      res.redirect("/auth/login");
    }
  },

  register: (req, res) => {
    res.render("auth/register");
  },
  doRegister: async (req, res) => {
    const data = req.body;

    try {
      const [existingUser] = await conn.query(
        "select * from user where email = ?",
        [data.email]
      );
      if (existingUser && existingUser.length > 0) {
        return res.status(400).send("El usuario ya está registrado");
      }
      const hashedPassword = await bcryp.hash(data.password, 12);
      const sql = `
      INSERT INTO user (name, lastname, email, password, create_time) 
      VALUES (?, ?, ?, ?, NOW())
  `;
      const values = [data.name, data.lastname, data.email, hashedPassword];
      try {
        const [result] = await conn.execute(sql, values);
        console.log("Usuario registrado:", result);
        res.redirect("/auth/login");
      } catch (error) {
        console.error("Error al registrar usuario:", error);

        res.status(500).send("Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error al hashear la contraseña:", error);
      res.status(500).send("Error al registrar usuario");
    }
  },
  logout: async (req, res) => {
    if (req.session.loggedin === true) {
      // Aquí es req, no res
      req.session.destroy((err) => {
        console.log("la session fue cerrada")
        if (err) {
          console.error("Error al cerrar sesión:", err);

          res.status(500).send("Error al cerrar sesión");
        } else {

          res.redirect("/auth/login");
        }
      });
    } else {
      console.log(req.session.loggedin);
      res.redirect("/auth/login");
    }
  },
};
module.exports = authControllers;
