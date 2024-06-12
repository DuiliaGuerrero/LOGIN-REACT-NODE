import {Navigate, Route, Routes} from "react-router-dom";
import { Login } from "../components/Login/login.component";
import { ForgotPassword } from "../components/ForgotPass/forgotpass.component";

export const AppRouter = () => {
    return(
        <>
            <Routes>
                <Route element={<Login/>} path="/Login"/>
                <Route element={<ForgotPassword/>} path="/ForgotPass"/>
                <Route path="/*" element={<Navigate to="/Login"/>} />
            </Routes>
        </>
    )
}