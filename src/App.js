import './App.css';
import { Outlet } from "react-router-dom";
import Logo from "./davinti.jpg";

function App() {
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <img src={Logo} alt="Davinti" />
      </div>
      <Outlet />
    </>
  );
}

export default App;
