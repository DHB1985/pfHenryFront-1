import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashAfil from '../../Pages/DashAfiliado/DashAfil'
import MiCuenta from '../../Pages/MiCuenta/MiCuenta'
import { roles } from '../../utils/roles'
import Credencial from '../Credencial/Credencial'
import FamilyGroupDetail from '../FamilyGroup/FamilyGroupDetail'
import MedicalHistoryDetails from '../MedicalHistory/MedicalHistoryDetails'
import Perfil from '../Perfil/Perfil'
import Footer from '../Footer/Footer'
import NavBarDashboard from '../NavBarDashboard/NavBarDashboard'
import PrivateRouter from '../PrivateRouter/PrivateRouter'
import CartPrest from '../Providers/CartPrest'
import Authorizations from '../../Pages/Authorizations/Authorizations'
import PharmaciesPage from '../../Pages/PharmaciesPage/PharmaciesPage'
import NavbarAfiliado from '../NavBarDashboard/NavbarAfiliado'

const Afiliado = () => {
  return (
    <div>
      <NavbarAfiliado/>
      {/* <NavBarDashboard /> */}
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRouter rol={roles.AFIL}>
              <DashAfil />
            </PrivateRouter>
          }
        />
        

        <Route path="/group" element={<PrivateRouter rol={roles.AFIL}><FamilyGroupDetail /></PrivateRouter>} />
        <Route path="/credencial" element={<PrivateRouter rol={roles.AFIL}><Credencial /></PrivateRouter>}/>
        <Route path="/autorizaciones" element={<PrivateRouter rol={roles.AFIL}><Authorizations /></PrivateRouter>} />
        <Route path="/historial" element={<PrivateRouter rol={roles.AFIL}><MedicalHistoryDetails /></PrivateRouter>} />
        <Route path="/prestadores" element={<PrivateRouter rol={roles.AFIL}><CartPrest /></PrivateRouter>} />
        <Route path="/farmacias" element={<PrivateRouter rol={roles.AFIL}><PharmaciesPage /></PrivateRouter>} />
        <Route path="/perfil" element={<PrivateRouter rol={roles.AFIL}><Perfil/></PrivateRouter>} />

        <Route path='*' element={<div><h1>Recurso no encontrado</h1></div>} />
      </Routes>
      <Footer /> 
    </div>
  );
};

export default Afiliado
