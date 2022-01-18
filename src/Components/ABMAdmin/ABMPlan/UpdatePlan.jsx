import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  updatePlan,
  getAllPlansData,
  resetDataUpdate,
} from "../../../actions/actionAMBAdmin";

import styles from "./UpdatePlan.module.css";

const functionErrors = (data) => {
  const arrayKeys = Object.keys(data);
  const arrayData = arrayKeys.filter((element, index) => data[element] !== "");
  if (arrayKeys.length === arrayData.length) {
    return false;
  } else {
    return true;
  }
}; //cambiarla en un utils ya que se puede usar en todos los forms

const UpdatePlan = ({ setShowModalUpdate, showModalUpdate }) => {
  const dispatch = useDispatch();
  const { updateData } = useSelector((state) => state.ABMAdmin);

  const [errors, setErrors] = useState(false);

  let [updatePlanData, setUpdatePlanData] = useState({
    id: "",
    name: "",
    precio: "",
    descripcion: "",
    planActivo: false,
  });

  useEffect(() => {
    setUpdatePlanData({
      id: updateData._id,
      name: updateData.name,
      precio: updateData.precio,
      descripcion: updateData.descripcion,
      planActivo: updateData.planActivo,
    });
    functionErrors(updatePlanData);
  }, [updateData, dispatch]);

  const [type, setTypeArr] = useState("");
  const [description, setdescriptionArr] = useState("");

  const handleDeleteDescr = (event) => {
    const newDesc = updatePlanData.descripcion;

    newDesc.splice(event.target.value, 1);

    setUpdatePlanData({
      ...updatePlanData,
      descripcion: newDesc,
    });

    setErrors(functionErrors(updatePlanData));
  };

  const handleChangeDescription = (event) => {
    if (event.target.name === "type") {
      const newType = event.target.value;
      setTypeArr(newType);
    }

    if (event.target.name === "description") {
      const newDescription = event.target.value;
      setdescriptionArr(newDescription);
    }
  };

  const handleAddDescription = (event) => {
    // event.preventDefault();
    const newDesc = [type, description];
    if (type !== "" && description !== "") {
      setUpdatePlanData({
        ...updatePlanData,
        descripcion: [...updatePlanData.descripcion, newDesc],
      });
      setTypeArr("");
      setdescriptionArr("");
      setErrors(functionErrors(updatePlanData));
    }
  };

  const handleUpdatePlan = async (event) => {
    let updatedPlan = {
      ...updatePlanData,
      [event.target.name]: event.target.value,
    };

    setUpdatePlanData(updatedPlan);

    setErrors(functionErrors(updatedPlan));
  };

  const handleSubmitUpdatePlan = async (event) => {
    event.preventDefault();
    let response = await dispatch(updatePlan(updatePlanData));
    alert(response.success);
    setUpdatePlanData({
      id: "",
      name: "",
      precio: "",
      descripcion: "",
      planActivo: false,
    });
    setShowModalUpdate(false);
    dispatch(getAllPlansData());
    dispatch(resetDataUpdate({}));
    setErrors(true);
  };

  const handleClose = () => {
    setUpdatePlanData({
      id: "",
      name: "",
      precio: "",
      descripcion: "",
      planActivo: false,
    });
    setShowModalUpdate(false);
    dispatch(resetDataUpdate({}));
    setErrors(false);
  };

  return (
    <div>
      <section className={styles.modalmain}>
        <div className="flex justify-center">
          <h5 className="text-2xl font-bold text-gray-500">Editar Plan</h5>
        </div>
        <div className="flex justify-center">
          <h5 className="text-lg font-semibold text-black">
            {updatePlanData.name}
          </h5>
        </div>

        <div className="modal-content py-4 text-left px-6 ">
          <form id="updatePlan">
            <div>
              <label className="text-md text-gray-600">Precio: </label>
              <input
                className="h-3 p-6 w-full border-2 border-gray-300 mb-5 rounded-md"
                type="text"
                name="precio"
                autoComplete="off"
                value={updatePlanData.precio}
                onChange={(e) => handleUpdatePlan(e)}
                placeholder="Ingrese el precio...."
              />
            </div>

            {/* <div>
              <label className="text-md text-gray-600">Descripción: </label>
              <input
                className="h-3 p-6 w-full border-2 border-gray-300 mb-5 rounded-md"
                type="text"
                name="descripcion"
                autoComplete="off"
                value={updatePlanData.descripcion}
                onChange={(e) => handleUpdatePlan(e)}
                placeholder="Ingrese la Descripcion...."
              />
            </div> */}
            <div className="flex justify-between mt-8">
              <div className="flex w-1/3 items-center">
                <label className="text-md text-gray-600">Activo: </label>
                <select
                  id="activo"
                  name="planActivo"
                  onChange={(e) => handleUpdatePlan(e)}
                  value={updatePlanData.planActivo}
                  defaultValue={0}
                >
                  <option value="">Seleccione</option>
                  <option value="false">No</option>
                  <option value="true">Si</option>
                </select>
              </div>
            </div>
          </form>

          <label className="text-md text-gray-600">Tipo: </label>
          <input
            className="h-2 p-4  w-full border-2 border-gray-300 mb-2 rounded-md"
            type="text"
            name="type"
            autoComplete="off"
            value={type}
            onChange={(e) => handleChangeDescription(e)}
            placeholder="Ingrese la Descripcion...."
          />

          <label className="text-md text-gray-600">Descripción: </label>
          <input
            className="h-2 p-4  w-full border-2 border-gray-300 mb-2 rounded-md"
            type="text"
            name="description"
            autoComplete="off"
            value={description}
            onChange={(e) => handleChangeDescription(e)}
            placeholder="Ingrese la Descripcion...."
          />

          <div>
            {updatePlanData.descripcion &&
              updatePlanData.descripcion.map((element, index) => {
                return (
                  <div key={"divDesc" + index}>
                    <label key={"labelTipo" + index}>{element[0]}: </label>
                    <label key={"labelDesc" + index}>{element[1]}</label>
                    <button
                      value={index}
                      name={"btnDel" + index}
                      id={index}
                      onClick={(e) => handleDeleteDescr(e)}
                    >
                      xxxxxxxx
                    </button>
                  </div>
                );
              })}
          </div>

          <button name="descripcion" onClick={(e) => handleAddDescription(e)}>
            Agregar
          </button>

          <div className="flex w-2/3 justify-around">
            {errors ? (
              <button
                className="group relative w-15 h-10 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-400  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={errors}
              >
                Guardar
              </button>
            ) : (
              <button
                key="submitFormButton"
                onClick={(e) => handleSubmitUpdatePlan(e)}
                className="group relative w-15 h-10 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Guardar
              </button>
            )}
          </div>
          <button
            onClick={() => handleClose()}
            className="group relative w-15 h-10 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cerrar
          </button>
        </div>
      </section>
    </div>
  );
};

export default UpdatePlan;