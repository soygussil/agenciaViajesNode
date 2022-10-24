import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";
const app = express();

//Conectamos la base de datos
db.authenticate()
  .then(() => console.log("bases de datos conectada"))
  .catch((error) => console.log(error));

//definimos puerto
const port = process.env.PORT || 4000;
//habilitar pug
app.set("view engine", "pug");
//Obtener el año actual
app.use((req, res, next) => {
  const year = new Date();
  res.locals.actualYear = year.getFullYear();
  res.locals.nombresitio = "Agencia de Viajes";
  next();
});
//Agregar Body parser para leer datos form
app.use(express.urlencoded({ extended: true }));

//Definir carpeta publica
app.use(express.static("public"));
app.use("/", router);

app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
