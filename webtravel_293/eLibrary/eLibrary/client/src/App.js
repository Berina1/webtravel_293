import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { ThemeContext } from "./context/themeContext";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Single from "./pages/Single";
import { useContext } from "react";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Home from "./pages/Home";
import Evropa from "./pages/Evropa";
import Azija from "./pages/Azija";
import Afrika from "./pages/Afrika";
import Ljetna from "./pages/Ljetna";
import Zimska from "./pages/Zimska";
import Historijska from "./pages/Historijska";
import Prirodna from "./pages/Prirodna";
import Users from "./pages/Users";



const Layout = ( ) => {

  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const {theme} = useContext(ThemeContext);

 

  return (
    <div className={`App ${theme}`}> 
      <Scrollbars style={{ width: '100%', height: '100vh' }} autoHide >
      <Navbar/>
      <Outlet/>
      
      </Scrollbars>
    </div>
  )
}






const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/trip/:id",
        element: <Single/>,
      },
      {
        path: "/write",
        element: <Write/>,
      },
      {
        path: "/users",
        element: <Users/>,
      },
      {
        path: "/profile",
        element: <Profile/>,
      },
      {
        path: "/Evropa",
        element: <Evropa/>,
      },
      {
        path: "/Afrika",
        element: <Afrika/>,
      },
      {
        path: "/Azija",
        element: <Azija/>,
      },
      {
        path: "/Ljetna",
        element: <Ljetna/>,
      },
      {
        path: "/Zimska",
        element: <Zimska/>,
      },
      {
        path: "/Historijska",
        element: <Historijska/>,
      },
      {
        path: "/Prirodna",
        element: <Prirodna/>,
      },
      
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      
      
    ],
  },
  
]);

function App() {
  return (
    <div className="app">
      <div className="container">
     <RouterProvider router={router} />
     </div>
    </div>
  );
}

export default App;
