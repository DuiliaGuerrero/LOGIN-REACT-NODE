import {Navigate, Route, Routes} from "react-router-dom";
import { Login } from "../components/Login/login.component";
import { ForgotPassword } from "../components/ForgotPass/forgotpass.component";
import { ResetPass } from "../components/ResetPass/resetpass.component"

export const AppRouter = () => {
    return(
        <>
            <Routes>
                <Route element={<Login/>} path="/login"/>
                <Route element={<ForgotPassword/>} path="/forgotPass"/>
                <Route element={<ResetPass/>} path="/update-user/:id"/>
                <Route path="/*" element={<Navigate to="/login"/>} />
            </Routes>
        </>
    )
}