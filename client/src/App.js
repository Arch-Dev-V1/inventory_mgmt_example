import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import SetPassword from './components/SetPasswordForm';
import CreateProduct from './components/CreateProduct';
import HomePage from "./components/HomePage";
import ProductList from "./components/ProductList";
import Spinner from './Spinner'
import axios from './axiosConfig';

function App() {
    const [superAdminExists, setSuperAdminExists] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSuperAdmin = async () => {
            try {
                const response = await axios.get('/api/auth/check-superadmin');
                console.log(response);
                setSuperAdminExists(response.data.exists);
                setLoading(false);
            } catch(error) {
                console.error('Error checking super admin:', error);
            }
        };
        checkSuperAdmin();
    }, []);

    if(loading) {
        return <Spinner></Spinner>
    }
    
    return (
        <Router>
            <Routes>
                {
                    <>
                    <Route path="/" element={superAdminExists ? <LoginForm/> : <RegisterForm/>}></Route>
                    <Route path="/home" element={<HomePage></HomePage>} />
                    <Route path='/login' element={<LoginForm></LoginForm>}></Route>
                    <Route path='/register' element={<RegisterForm></RegisterForm>}></Route>
                    <Route path='/set-password' element={<SetPassword></SetPassword>}></Route>
                    <Route path='/create-product' element={<CreateProduct/>}></Route>
                    <Route path='/products' element={<ProductList/>}></Route>
                    </>
                }
            </Routes>
        </Router>
    )
}

export default App;