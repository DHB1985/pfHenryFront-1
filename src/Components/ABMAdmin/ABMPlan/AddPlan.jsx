import React from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { addPlan, getAllPlansData } from "../../../actions/actionAMBAdmin";

import styles from "./addPlan.module.css";

const functionErrors = (data) => {
  const arrayKeys = Object.keys(data);
  const arrayData = arrayKeys.filter((element, index) => data[element] !== "");

  if (arrayKeys.length === arrayData.length) {
    return false;
  } else {
    return true;
  }
}; //cambiarla en un utils ya que se puede usar en todos los forms

const AddPlan = ({ showModalAdd, setShowModalAdd }) => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState(true);

  let [inputPlan, setInputPlan] = useState({
    name: "",
    codePlan: "",
    precio: "",
    descripcion: "",
    planActivo: false,
  });

  const showHideClassName = showModalAdd ? "displayblock" : "displaynone";

  const handleChange = (event) => {
    let newPlan = {
      ...inputPlan,
      [event.target.name]: event.target.value,
    };
    setInputPlan(newPlan);

    setErrors(functionErrors(newPlan));

    newPlan = {};
  };

  const handleSubmitPlan = async (event) => {
    event.preventDefault();
    let response = await dispatch(addPlan(inputPlan));
    alert(response.success);
    setInputPlan({
      name: "",
      codePlan: "",
      precio: "",
      descripcion: "",
      planActivo: false,
    });
    await dispatch(getAllPlansData());
    setErrors(true);
    setShowModalAdd(false);
  };

  const handleClose = () => {
    setInputPlan({
      name: "",
      codePlan: "",
      precio: "",
      descripcion: "",
      planActivo: false,
    });
    setErrors(true);
    setShowModalAdd(false);
  };

  return (
    <div className={styles[showHideClassName]}>
      <section className={styles.modalmain}>
        <div className="flex justify-center">
          <h5 className="text-2xl font-bold text-gray-500">
            Agregar Nuevo Plan
          </h5>
          <br />
        </div>
        <div className="modal-content py-4 text-left px-6 ">
          <form onSubmit={(e) => handleSubmitPlan(e)} id="addPlan">
            <div>
              <label className="text-md text-gray-600">Codigo: PLN-</label>
              <input
                className="h-2 p-4 mb-2.5 w-full border-2 border-gray-300  rounded-md"
                type="text"
                name="codePlan"
                autoComplete="off"
                value={inputPlan.codePlan}
                onChange={(e) => handleChange(e)}
                placeholder="Ingrese el Codigo...."
              />
            </div>

            <div>
              <label className="text-md text-gray-600">Nombre: </label>
              <input
                className="h-2 p-4 mb-2.5 w-full border-2 border-gray-300  rounded-md"
                type="text"
                name="name"
                autoComplete="off"
                value={inputPlan.nombre}
                onChange={(e) => handleChange(e)}
                placeholder="Ingrese el nombre...."
              />
            </div>

            <div>
              <label className="text-md text-gray-600">Precio: </label>
              <input
                className="h-2 p-4 mb-2.5 w-full border-2 border-gray-300 rounded-md"
                type="text"
                name="precio"
                autoComplete="off"
                value={inputPlan.precio}
                onChange={(e) => handleChange(e)}
                placeholder="Ingrese el precio...."
              />
            </div>

            <div>
              <label className="text-md text-gray-600">Descripción: </label>
              <input
                className="h-2 p-4  w-full border-2 border-gray-300 mb-5 rounded-md"
                type="text"
                name="descripcion"
                autoComplete="off"
                value={inputPlan.descripcion}
                onChange={(e) => handleChange(e)}
                placeholder="Ingrese la Descripcion...."
              />
            </div>
            <div className="flex justify-between ">
              <div className="flex w-1/3 items-center">
                <label className="text-md text-gray-600">Activo: </label>
                <select
                  id="activo"
                  name="planActivo"
                  onChange={(e) => handleChange(e)}
                  defaultValue={0}
                >
                  <option value="false">No</option>
                  <option value="true">Si</option>
                </select>
              </div>

              <div className="flex w-2/3 justify-around">
                {errors ? (
                  <button
                    className="group relative w-15 h-10 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-400  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    type="submit"
                    key="submitFormButton"
                    form="addSpeciality"
                    disabled={errors}
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    type="submit"
                    key="submitFormButton"
                    form="addSpeciality"
                    className="group relative w-15 h-10 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Guardar
                  </button>
                )}
                <button
                  onClick={() => handleClose()}
                  className="group relative w-15 h-10 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddPlan;
