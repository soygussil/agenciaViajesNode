import { Testimonial } from "../Models/Testimoniales.js";

const guardarTestimonial = async (req, res) => {
  //Validar...
  const { nombre, correo, mensaje } = req.body;
  const errores = [];

  // if (nombre.trim() === "" && correo.trim() === "" && mensaje.trim() === "") {
  //   console.log("los campos están vacios");
  // }

  if (nombre.trim() === "") {
    errores.push({ mensaje: "El nombre está vacio" });
  }
  if (correo.trim() === "") {
    errores.push({ mensaje: "El Correo está vacio" });
  }
  if (mensaje.trim() === "") {
    errores.push({ mensaje: "El Mensaje está vacio" });
  }

  if (errores.length > 0) {
    //Consultar testimoniales existentes
    const testimoniales = await Testimonial.findAll();
    //Mostrar vista de errores
    res.render("testimoniales", {
      pagina: "Testimoniales",
      errores,
      nombre,
      correo,
      mensaje,
      testimoniales,
    });
  } else {
    //Almacenarlo en la BDD
    try {
      await Testimonial.create({
        nombre,
        correo,
        mensaje,
      });
      res.redirect("/testimoniales");
    } catch (error) {
      console.log(error);
    }
  }
};

export { guardarTestimonial };
