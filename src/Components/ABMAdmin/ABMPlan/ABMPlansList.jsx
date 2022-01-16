import React from "react";

import { useDispatch } from "react-redux";

import {
  getAllPlansData,
  getPlanData,
  deletePlan,
} from "../../../actions/actionAMBAdmin";

import styles from "./ABMPlans.module.css";

const ABMPlansList = ({
  allPlansData,
  setShowModalUpdate,
  setShowModalAdd,
}) => {
  const dispatch = useDispatch();

  const handleEditPlan = async (event) => {
    await dispatch(getPlanData(event.target.value));
    setShowModalUpdate(true);
  };

  const handleDeletePlan = async (event) => {
    let response = await dispatch(deletePlan(event.target.value));

    await dispatch(getAllPlansData());
  };
  console.log("<<<<<<<<<<< plans data gggggggg<<<<<<<", allPlansData);
  return (
    

      <div className={styles.divScroll}>
        <div class="bg-gray-50 min-h-screen  ">
          <div>
            <div class="p-4">
              <div class="bg-white p-6 rounded-md">
                <div>
                  <div className=" flex justify-end">
                    <button
                      className="group relative justify-items-end w-30 flex  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      title="Agregar Especialidad"
                      onClick={() => setShowModalAdd(true)}
                    >
                      Agregar Plan
                    </button>
                  </div>
                  <div className="mt-3.5">
                    <div>
                      <div class=" flex justify-between bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-4 text-white font-bold text-md">
                        <div className="w-1/6  flex justify-center">
                          <span>Código Plan</span>
                        </div>
                        <div className="w-1/6  flex justify-center">
                          <span>Nombre </span>
                        </div>
                        <div className="w-1/6  flex justify-center">
                          <span>Precio</span>
                        </div>
                        <div className="w-1/6  flex justify-center">
                          <span>Descripción</span>
                        </div>
                        <div className="w-1/6  flex justify-center">
                          <span>Activo </span>
                        </div>

                        <div className="w-1/6  flex justify-center">
                          <span>Editar</span>
                        </div>
                      </div>
                      {allPlansData &&
                        allPlansData.map((element) => {
                          return (
                            <div key={element._id} className={styles.tabla}>
                              <div class="flex justify-between  py-1 px-4 items-center border-t text-sm font-normal mt-4 space-x-4">
                                <div class="w-1/6 flex justify-center ">
                                  <span>{element.codePlan}</span>
                                </div>
                                <div class="w-1/6 flex justify-center ">
                                  <span>{element.name}</span>
                                </div>
                                <div class="w-1/6 flex justify-center ">
                                  <span>{element.precio}</span>
                                </div>
                                <div class="w-1/6 flex justify-center ">
                                  <span>{element.descripcion}</span>
                                </div>
                                <div class="w-1/6 flex justify-center ">
                                  <span>
                                    {element.planActivo ? "Si" : "No"}
                                  </span>
                                </div>

                                <div class="w-1/6 flex justify-around  ">
                                  <button
                                    key={"delete" + element._id}
                                    title="Delete"
                                    value={element._id}
                                    onClick={(e) => handleDeletePlan(e)}
                                  >
                                    Eliminar
                                  </button>
                                  <button
                                    title="Edit"
                                    key={"edit" + element._id}
                                    value={element._id}
                                    onClick={(e) => handleEditPlan(e)}
                                  >
                                    Editar
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default ABMPlansList;
