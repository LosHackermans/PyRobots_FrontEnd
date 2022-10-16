import {
    Navigate,
    useLocation
} from "react-router-dom";
import axios from "axios"

export const setToken = (token) => {
    // set token in localStorage
    localStorage.setItem('userToken', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
}

export const fetchToken = (token) => {    // fetch the token
    return localStorage.getItem('userToken');
}

export function RequireToken({ children }) {
    let auth = fetchToken();
    let location = useLocation();

    if (!auth) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return children;
}