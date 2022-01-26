import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  updateSpecialityAct,
  resetDataUpdate,
} from "../../../actions/actionAMBAdmin";

import styles from "./UpdateSpeciality.module.css";
import {
  functionErrorsBtn,
  validateEspeciality,
} from "../../../utils/adminFormsControllers";
import { enableBtn, disableBtn, formError } from "../../../utils/ABMStyles";

const UpdateSpeciality = ({ setShowModalUpdate }) => {
  const dispatch = useDispatch();
  const { updateData } = useSelector((state) => state.ABMAdmin);

  const [errors, setErrors] = useState(false);
  const [errores, setErrores] = useState({});

  const updateSpecialityDataStruct = {
    id: "",
    nombre: "",
    descripcion: "",
    activa: "",
  };

  const [updateSpecialityData, setUpdateSpecialityData] = useState(
    updateSpecialityDataStruct
  );

  useEffect(() => {
    setUpdateSpecialityData({
      id: updateData._id,
      nombre: updateData.nombre,
      descripcion: updateData.descripcion,
      activa: updateData.activa,
    });
  }, [updateData]);

  const handleUpdateSpeciality = (event) => {
    let updatedSpeciality = {
      ...updateSpecialityData,
      [event.target.name]: event.target.value,
    };

    setUpdateSpecialityData(updatedSpeciality);

    setErrors(functionErrorsBtn(updatedSpeciality));
  };

  const handleSubmitUpdateSpeciality = () => {
    const validateError = validateEspeciality(updateSpecialityData);
    setErrores(validateError);

    if (Object.entries(validateError).length <= 0) {
      dispatch(updateSpecialityAct(updateSpecialityData));
      setUpdateSpecialityData(updateSpecialityDataStruct);
      setShowModalUpdate(false);
      setErrors(true);
      dispatch(resetDataUpdate());
    }
  };

  const handleClose = () => {
    setUpdateSpecialityData(updateSpecialityDataStruct);
    setShowModalUpdate(false);
    dispatch(resetDataUpdate());
    setErrors(true);
  };

  return (
    <div className={styles.modal}>
      <section className={styles.modalmain}>
        <div className="flex justify-center h-10%">
          <h5 className="text-2xl font-bold text-gray-500">
            Modificar Especialidad
          </h5>
        </div>
        <div className="modal-content py-4 text-left px-6 h-90%">
          <form>
            <div className="mb-8">
              <label className="text-md text-gray-600">Nombre: </label>
              <input
                className="h-3 p-6 w-full border-2 border-gray-300  rounded-md"
                type="text"
                name="nombre"
                autoComplete="off"
                value={updateSpecialityData.nombre}
                onChange={(e) => handleUpdateSpeciality(e)}
                placeholder="Ingrese el nombre...."
              />
              {errores.nombre && (
                <p className={formError}>{errores.nombre}</p>
              )}
            </div>

            <div>
              <label className="text-md text-gray-600">Descripción: </label>
              <textarea
                className="h-3 p-6 w-full border-2 border-gray-300  rounded-md resize-none"
                rows="8"
                cols="50"
                name="descripcion"
                autoComplete="off"
                value={updateSpecialityData.descripcion}
                onChange={(e) => handleUpdateSpeciality(e)}
                placeholder="Ingrese la Descripcion...."
              />
              {errores.descripcion && (
                <p className={formError}>{errores.descripcion}</p>
              )}
            </div>

            
          </form>
          <div className="flex justify-between items-end mt-8">
              <div className="flex w-1/3  ">
                <label className="text-md text-gray-600">Activo: </label>
                <select
                  className=" h-1/2 w-full  border-2 border-gray-300  rounded-md"
                  id="activa"
                  name="activa"
                  onChange={(e) => handleUpdateSpeciality(e)}
                  value={updateSpecialityData.activa}
                >
                  <option value="">Seleccione</option>
                  <option value="false">No</option>
                  <option value="true">Si</option>
                </select>
                {errores.activa && (
                  <p className="absolute text-red-700">{errores.activa}</p>
                )}
              </div>
           
          <div className="flex w-2/3 justify-around  ">
            <button
              onClick={handleSubmitUpdateSpeciality}
              key="submitFormButton"
              className={errors ? disableBtn : enableBtn}
              disabled={errors}
            >
              Guardar
            </button>

            <button
              onClick={() => handleClose()}
              className="group relative w-15 h-10 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cerrar
            </button>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpdateSpeciality;
