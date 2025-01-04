import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home"
import Form from "../Form/Form"
import Auth from "../Auth/Auth"
import Update from "../Update/Update"
import './App.css'
import Context from '../state'
import { useState } from "react";

const App = () => {
    const [user, setuser] = useState({
        user_token: null,
        user_name: null,
        user_id: null
    })
    return (
        <>
            <Context.Provider value={{ user, setuser }}>
                <Routes>
                    <Route path="/login" element={<Auth />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/update" element={<Update />} />
                </Routes>
            </Context.Provider>
        </>
    );
}

export default App;