import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getconsultaMedica } from "../../actions/professionalsActions";
import AffiliateData from "./AffiliateData";
import GeneracionRecetas from "./GeneracionRecetas";
import ProfessionalData from "./ProfessionalData";

const IndexProfessional = () => {
  const dispatch = useDispatch();

  const { consultaMedicaData, professionalData } = useSelector(
    (state) => state.professionals
  );

  /****** Variables y funciones para buscar la consulta medica Func 1******/
  const dataAffiliateStruct = { DNI: "", token: "" };

  const [dataAffiliate, setDataAffiliate] = useState(dataAffiliateStruct);

  const handleChange = (event) => {
    const data = {
      ...dataAffiliate,
      [event.target.name]: event.target.value,
    };

    setDataAffiliate(data);
  };

  const handleSendInfo = () => {
    dispatch(getconsultaMedica(dataAffiliate));
  };

  /****** Fin Variables y funciones para buscar la consulta medica Func 1******/

  /****** Variables y funciones para llenar consulta medica Func 2******/

  const inputdataStruct = {
    afiliadoID: "",
    especID: "",
    profesionalID: "",
    diagnostico: "",
    fechaConsulta: "",
  };

  const [inputData, setInputData] = useState(inputdataStruct);

  const handleChangeDiag = (event) => {
    const data = {
      ...inputData,
      [event.target.name]: event.target.value,
    };

    setInputData(data);
  };

  /****** Fin Variables y funciones para llenar consulta medica Func 2******/

  /****** Variables y funciones para la generación de recetas Func 3******/

  const [recetasModal, setRecetasModal] = useState(false);

  /****** Variables y funciones la generación de recetas Func 3******/

  return (
    <div>
      {/*Busqueda Consulta Medica Func 1*/}
      <div>
        <label>DNI Afiliado: </label>
        <input
          type="number"
          name="DNI"
          autoComplete="off"
          value={dataAffiliate.DNI}
          onChange={(e) => handleChange(e)}
          placeholder="Ingrese el DNI...."
        />
      </div>

      <div>
        <label>Token Consulta: </label>
        <input
          type="number"
          name="token"
          autoComplete="off"
          value={dataAffiliate.token}
          onChange={(e) => handleChange(e)}
          placeholder="Ingrese el Token...."
        />
      </div>

      <div>
        <label>Token Consulta: </label>
        <button name="searchBtn" onClick={(e) => handleSendInfo(e)}>
          Buscar
        </button>
      </div>

      {/*Fin Busqueda Consulta Medica */}

      {/* Botonera */}
      <button>Historial Medico</button>

      <button name="recetasModal" onClick={() => setRecetasModal(true)}>Generar Receta</button>
      {/* Fin Botonera */}

      {/* Generar Receta */}

      {recetasModal && (
        <GeneracionRecetas
          affiliateData={consultaMedicaData.afiliadoID}
          professionalData={professionalData._id}
          setRecetasModal={setRecetasModal}
        />
      )}
      {/* Fin Generar Receta */}

      {/*  Historial Medico */}
      {/* Fin  Historial Medico */}

      {/* Datos Personales Afiliado */}
      {consultaMedicaData.afiliadoID && (
        <AffiliateData affiliateData={consultaMedicaData.afiliadoID} />
      )}
      {/* Fin Datos Personales Afiliado */}

      {/* Datos Personales Medico */}
      <ProfessionalData professionalData={professionalData} />
      {/* Fin Datos Personales Medico */}

      {/* Diagnostico Func 2*/}
      <div>
        <label>Diagnóstico: </label>
        <textarea
          rows="4"
          cols="50"
          className="resize-none"
          name="diagnostico"
          autoComplete="off"
          value={inputData.diagnostico}
          onChange={(e) => handleChangeDiag(e)}
          placeholder="Ingrese el Diagnostico...."
        />
      </div>
      {/* Fin Diagnostico */}
    </div>
  );
};

export default IndexProfessional;
