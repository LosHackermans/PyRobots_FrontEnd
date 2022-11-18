import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const proccessResults = (resutlList) => {
    if (resutlList.length > 1) {
        return (
            <>
                <div>Empataron</div>
                {resutlList.map((element) => <><div>{element.user}</div> <div>{element.robot}</div></>)}
            </>
        )
    }
    else {
        return (
            <>
                <div>Gano</div>
                {resutlList.map((element) => <><div>{element.user}</div> <div>{element.robot}</div></>)}
            </>
        )
    }
}

const ButtonLobby = (props) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [result, setResult] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const getProfile = async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile`)
            .then(function (response) {
                setUser(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const leaveMatch = async () => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/abandon/${id}`)
            .then(function (response) {
                if (response.data.detail) navigate('/matches');
            })
            .catch(function (error) {
                setError(error);
            });
    }

    const beginMatch = async () => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/start/${id}`)
            .then(function (response) {
                if (response.data.result) {
                    setResult(response.data.Result);
                }
                if (response.data.detail) {
                    setError(response.data.detail)
                }
            })
            .catch(function (error) {
                setError(error);
            });
    }

    useEffect(() => {
        getProfile();
    }, []);

    if (!user) return;
    if (user.username === props.owner) {
        return (
            <>
                {
                    result &&
                    proccessResults(result)
                }
                <button className="my-btn w-auto" onClick={beginMatch}>Iniciar Partida</button>
                {error && <div>{error}</div>}
            </>
        )
    }
    else {
        return (
            <>
                <button className="my-btn w-auto" onClick={leaveMatch}>Abandonar</button>
                {error && <div>{error}</div>}
            </>
        )
    }

}

export default ButtonLobby;