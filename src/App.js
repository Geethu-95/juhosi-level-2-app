import LoginForm from './Components/loginForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderEntry from './Components/orderEntry';
import PasswordChange from './Components/passwordChange';

function App() {


  
  return (
    <>
     
      <BrowserRouter>
        <Routes>
          <Route >
            <Route path="/home" element={<LoginForm />} />
            <Route path="/orderEntry" element={<OrderEntry />} />
            <Route path="/changePassword" element={<PasswordChange/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
