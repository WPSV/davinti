import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import VisualizarContatos from "./pages/VisualizarContatos/VisualizarContatos";
import CadastrarContatos from "./pages/CadastrarContatos/CadastrarContatos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <VisualizarContatos />
      },
      {
        path: "/cadastrar-contatos",
        element: <CadastrarContatos />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);
