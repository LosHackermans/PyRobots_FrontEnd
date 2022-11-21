import React from "react";

const ProgressBar = (props) => {
    const { rounds } = props.data
    let robotsInSimu = rounds[0].robots.map((robot) => { return robot.id })

    console.log(props.data)
    return (
        <>
            {robotsInSimu.map((robotInSimu, index) => {
                return (
                    <div className="my-3" key={index}>
                        <label key={robotInSimu}>{robotInSimu}</label>
                        <div className="progress my-progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-label="Animated striped example" aria-valuemin="0" aria-valuemax="100" style={{width: `${50}%`}}></div>
                        </div>
                    </div>
                )
            })}
        </>
    );
};

export default ProgressBar;
