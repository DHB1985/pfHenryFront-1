import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlanes } from "../../actions/actionPlanes";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { motion } from "framer-motion";
import { SpinnerCircular } from "spinners-react";

function Plans() {
  const dispatch = useDispatch();
  const { planes, isLoading } = useSelector((state) => state.planes);
  useEffect(() => {
    dispatch(getPlanes());
  }, [dispatch]);
  const [active, setActive] = useState({
    Bronce: false,
    Plata: false,
    ORO: false,
    Platinum: false,
  });

  const toggleClass = ({ target }) => {
    const name = target.name;
    const modal = active[name];
    setActive({
      ...active,
      [name]: !modal,
    });
  };

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1 }}
      className="flex justify-evenly"
    >
      {isLoading ? (
        <SpinnerCircular
          color="#fff"
          style={{ margin: "auto", paddingTop: "20px" }}
        />
      ) : (
        planes.length &&
        planes.map((plan) => (
          <div
            key={plan._id}
            className="relative flex flex-col items-center p-6 m-10 w-80 h-80 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-3xl justify-evenly"
          >
            <h2 className="text-5xl text-center text-white ">
              Plan {plan.name}
            </h2>
            {/* <Link to="/contact"> */}
            <button
              name={plan.name}
              onClick={toggleClass}
              className="p-2 text-lg bg-white rounded-md"
            >
              Conocer más
            </button>
            {/* </Link> */}
            {active[plan.name] && (
              <Modal plan={plan} toggleClass={toggleClass} />
            )}
          </div>
        ))
      )}
    </motion.div>
  );
}

export default Plans;
