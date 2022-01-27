import React, { 
  // useEffect, 
  useState, Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
// import { useSelector } from 'react-redux'


const Modal = ({ toggleClass, plan }) => {

  // const [active, setActive] = useState(true)

  const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-80 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-80 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block h-full overflow-hidden transition-all transform border-t border-l border-solid shadow-xl bg-gradient-to-b from-white-rgba to-white-rgba2 rounded-3xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border-t-gray-200 border-l-gray-200">
              <div className="px-4 pt-5 pb-5 sm:p-6">
                <div className="flex-col sm:flex backdrop-filter backdrop-blur-lg">
                  <div className="flex flex-col items-start justify-center mt-6 sm:mt-0 sm:ml-4">
                    <h2 className='self-center p-4 text-3xl font-bold text-primary'>Detalles Plan {plan.name}</h2>

                    {
                      plan.descripcion && plan.descripcion.map((desc, index) => (
                        <div key={index}>
                          <p className='text-left text-white'>
                            <span className='pr-1 text-xl font-bold'>{desc[0]}: </span>
                            {desc[1]}
                          </p>
                        </div>
                      ))
                    }
                  </div>
                  <div>
                    <h3 className='text-3xl font-bold text-white'>${plan.precio}</h3>
                  </div>
                  <button name={plan.name} onClick={toggleClass} className="self-end p-1 bg-white border-2 rounded-md w-14 text-primary hover:bg-primary border-primary hover:text-white hover:border-2 hover:border-white">Cerrar</button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>

    // <div className='absolute bg-white'>
    //     <h2>{plan.name}</h2>
    //     {
    //         plan.descripcion && plan.descripcion.map((desc, index) => (
    //             <div key={index}> <p> <span>{desc[0]}</span> {desc[1]} </p> </div>
    //         ))
    //     }
    // </div>
  )
}

export default Modal