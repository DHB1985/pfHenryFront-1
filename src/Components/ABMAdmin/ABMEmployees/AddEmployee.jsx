import React from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { addEmployee } from "../../../actions/actionAMBAdmin";

import styles from "./AddEmployee.module.css";

import { enableBtn, disableBtn, formError } from "../../../utils/ABMStyles";
import {
  functionErrorsBtn,
  validateAddEmployee,
} from "../../../utils/adminFormsControllers"; //cambiarla en un utils ya que se puede usar en todos los forms

const AddEmployee = ({ setShowModalAdd, showModalAdd }) => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState(true);
  const [errores, setErrores] = useState({});

  const inputEmployeeData = {
    name: "",
    lastName: "",
    legajo: "",
    telefono: "",
    email: "",
    password: "",
    activo: "",
  };

  const [inputEmployee, setInputEmployee] = useState(inputEmployeeData);

  const handleChange = (event) => {
    let newEmployee = {
      ...inputEmployee,
      [event.target.name]: event.target.value,
    };
    if (event.target.name === "legajo") {
      newEmployee = { ...newEmployee, password: event.target.value };
    }
    setInputEmployee(newEmployee);

    setErrors(functionErrorsBtn(newEmployee));

    newEmployee = {};
  };

  const handleSubmitEmployee = async (event) => {
    event.preventDefault();

    const validateError = validateAddEmployee(inputEmployee);
    setErrores(validateError);

    if (Object.entries(validateError).length <= 0) {
      dispatch(addEmployee(inputEmployee));
      setInputEmployee(inputEmployeeData);

      setShowModalAdd(false);
      setErrors(true);
    }
  };

  const handleClose = () => {
    setInputEmployee(inputEmployeeData);
    setShowModalAdd(false);
    setErrors(true);
  };

  return (
    <div className={styles.modal}>
      <section className={styles.modalmain}>
        <div className="flex justify-center h-10%">
          <h5 className="text-2xl font-bold text-gray-500">
            Agregar Nuevo Empleado
          </h5>
        </div>
        <div className="modal-content py-4 text-left px-6 h-90% ">
          <form>
            <div className="flex mb-4">
              <div className=" w-1/2">
                <label className="text-md text-gray-600">Nombre: </label>
                <input
                  className="h-2 p-4 w-full border-2 border-gray-300 mb-1 rounded-md"
                  type="text"
                  name="name"
                  autoComplete="off"
                  value={inputEmployee.name}
                  onChange={(e) => handleChange(e)}
                  placeholder="Ingrese el nombre...."
                />
                {errores.name && <p className={formError}>{errores.name}</p>}
              </div>

              <div className=" w-1/2">
                <label className="text-md text-gray-600">Apellido: </label>
                <input
                  className="h-2 p-4 w-full border-2 border-gray-300 mb-1 rounded-md"
                  type="text"
                  name="lastName"
                  autoComplete="off"
                  value={inputEmployee.lastName}
                  onChange={(e) => handleChange(e)}
                  placeholder="Ingrese el apellido...."
                />
                {errores.lastName && (
                  <p className={formError}>{errores.lastName}</p>
                )}
              </div>
            </div>
            <div className="flex mb-4">
              <div className=" w-1/2">
                <label className="text-md text-gray-600">Legajo: </label>
                <input
                  className="h-2 p-4 w-full border-2 border-gray-300 mb-1 rounded-md"
                  type="number"
                  name="legajo"
                  autoComplete="off"
                  value={inputEmployee.legajo}
                  onChange={(e) => handleChange(e)}
                  placeholder="Ingrese el legajo...."
                />
                {errores.legajo && (
                  <p className={formError}>{errores.legajo}</p>
                )}
              </div>

              <div className=" w-1/2">
                <label className="text-md text-gray-600">Teléfono: </label>
                <input
                  className="h-2 p-4 w-full border-2 border-gray-300 mb-1 rounded-md"
                  type="number"
                  name="telefono"
                  autoComplete="off"
                  value={inputEmployee.telefono}
                  onChange={(e) => handleChange(e)}
                  placeholder="Ingrese el Teléfono...."
                />
                {errores.telefono && (
                  <p className={formError}>{errores.telefono}</p>
                )}
              </div>
            </div>
            <div className="flex mb-4">
              <div className="w-1/2">
                <label className="text-md text-gray-600">E-mail: </label>
                <input
                  className="h-2 p-4 w-full border-2 border-gray-300 mb-1 rounded-md"
                  type="text"
                  name="email"
                  autoComplete="off"
                  value={inputEmployee.email}
                  onChange={(e) => handleChange(e)}
                  placeholder="Ingrese el e-mail...."
                />
                {errores.email && <p className={formError}>{errores.email}</p>}
              </div>
              <div className="w-1/2">
                <label className="text-md text-gray-600">Activo: </label>
                <select
                  className=" h-1/2 w-full  border-2 border-gray-300  rounded-md"
                  name="activo"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="">Seleccione:</option>
                  <option value={true}>Si</option>
                  <option value={false}>No</option>
                </select>
              </div>
            </div>

            <div className="flex mt-5  justify-center items-center">
              <div className="flex w-2/3 justify-around">
                <button
                  type="submit"
                  className={errors ? disableBtn : enableBtn}
                  onClick={(e) => handleSubmitEmployee(e)}
                  disabled={errors}
                >
                  Guardar
                </button>
                <button
                  className="group relative w-15 h-10 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => handleClose()}
                >
                  Cerrar
                </button>
              </div>
            </div>
            {errores.activo && <p className={formError}>{errores.activo}</p>}
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddEmployee;
