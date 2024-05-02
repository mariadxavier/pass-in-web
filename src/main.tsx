import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './app.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { AttendeeList } from './components/attendee-list.tsx';
import { Eventos } from './routes/eventos.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element : <App/>,
    children: [
      {
        path: "/",
        element : <AttendeeList/> 

      },
      {
        path: "/eventos",
        element : <Eventos/>    
      }
    ]   
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
