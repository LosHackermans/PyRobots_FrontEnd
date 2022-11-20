import React, { useState, useEffect } from "react";

const ProgressBar = (props) => {
    let robotsInSimu = props.data.rounds[0].robots.map((robot) => { return robot.id })
    let robot = props.data.rounds.map((round) => { return(round)}).filter((robot, index) => robot.id === robotsInSimu[index])

    console.log(robot)

    return (
        <>
            {robotsInSimu.map((robotInSimu, index) => {
                return (
                    <div className="my-3" key={index}>
                        <label key={robotInSimu}>{robotInSimu}</label>
                        <div className="progress my-progress">
                            <div className="progress-bar" style={{ width: 20 }}></div>
                        </div>
                    </div>
                )
            })}
        </>
    );
};

export default ProgressBar;
