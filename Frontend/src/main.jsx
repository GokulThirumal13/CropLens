import { createRoot } from 'react-dom/client'
import { BrowserRouter, Router } from "react-router-dom";

import Routers from './Routers.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routers/>
  </BrowserRouter>
)
