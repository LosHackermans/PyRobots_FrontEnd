import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const Lobby = () => {
    let { id } = useParams();
    const [robots, setRobots] = useState(null);

    useEffect(() => {
        const ws = new WebSocket("ws://" + process.env.REACT_APP_BACKEND_URL.split("//")[1] + "/lobby/" + id);
        ws.onmessage = function (event) {
            setRobots(JSON.parse(event.data));
        }
    }, []);

    if (!robots) return;
    return (
        <div className="container">
            <div className="row justify-content-between pt-5 mt-5 mr-1">
                <div className="col-6 mb-3">
                    <div className="box">
                        <h1>{robots.Creator.Owner} 👑</h1>
                        <h2>{robots.Creator.Robot_name}</h2>
                    </div>
                </div>
                {robots.Players.map((element) =>
                    <div className="col-6 mb-3">
                        <div className="box" key={element.Player}>
                            <h1>{element.Player}</h1>
                            <h2>{element.Robot_name}</h2>
                        </div>
                    </div>)
                }
                <button className="my-btn">?</button>
            </div>
        </div>
    )
}

export default Lobby;