import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { postRecetaMedica } from "../../actions/professionalsActions";
import { validateReceta } from "../../utils/professionalFormsCOntrollers";

const GeneracionRecetas = ({
  affiliateData,
  professionalData,
  setRecetasModal,
}) => {
  const dispatch = useDispatch();
  const tipoReceta = ["Farmacia", "Estudio"];
  const [errores, setErrores] = useState({});

  const inputRecetaStruct = {
    afiliadoID: "",
    profesionalID: "",
    tipoReceta: "",
    descripcion: "",
  };

  const [inputReceta, setInputReceta] = useState(inputRecetaStruct);

  useEffect(() => {
    setInputReceta({
      ...inputReceta,
      profesionalID: professionalData,
      afiliadoID: affiliateData._id,
    });
  }, []);

  const handleChange = (event) => {
    const data = {
      ...inputReceta,
      [event.target.name]: event.target.value,
    };

    setInputReceta(data);
  };

  const handleSendInfo = () => {
    const validateError = validateReceta(inputReceta);
    console.log(validateError);
    setErrores(validateError);
    if (Object.entries(validateError).length <= 0) {
      dispatch(postRecetaMedica(inputReceta));
      setRecetasModal(false);
    }
  };

  const handleClose = () => {
    setRecetasModal(false);
    setInputReceta(inputRecetaStruct);
  };

  return (
    <section className="w-full flex flex-col gap-8 justify-center items-center">
      <article className="grid grid-cols-2 gap-2 justify-items-center w-64">
        <label className="col-span-2">
          Nombre y Apellido: {affiliateData.nombre} {affiliateData.apellido}
        </label>
        {/* <label>Nombre: </label> */}
        <label>DNI: {affiliateData.DNI}</label>
        <label>Activo: {affiliateData.activo ? "Si" : "No"}</label>
        <label className="col-span-2">
          E-mail: {affiliateData.correoElectronico}
        </label>
      </article>

      <article className="flex flex-col">
        <label>Seleccione el tipo de receta: </label>
        <select
          id="recetaType"
          name="tipoReceta"
          onChange={(e) => handleChange(e)}
        >
          <option value="">Seleccione</option>
          {tipoReceta.map((e) => {
            return <option value={e}>{e}</option>;
          })}
        </select>
        {errores.tipoReceta && (
          <p className="absolute text-red-700">{errores.tipoReceta}</p>
        )}
        <div className="flex flex-col">
          <label>Receta: </label>
          <textarea
            rows="4"
            cols="50"
            name="descripcion"
            className="resize-none"
            autoComplete="off"
            value={inputReceta.descripcion}
            onChange={(e) => handleChange(e)}
            placeholder="Ingrese lo recetado...."
          />
          {errores.descripcion && (
            <p className="absolute text-red-700">{errores.descripcion}</p>
          )}
        </div>
      </article>

      <button onClick={handleSendInfo} name="crearReceta">
        Crear
      </button>
      <button onClick={handleClose} name="close">
        Cerrar
      </button>
    </section>
  );
};

export default GeneracionRecetas;
