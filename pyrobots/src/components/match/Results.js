const Results = (props) => {
    const results = props.results;
    if (!results) return;
    return (<div data-test-id="results" className="my-form mb-2">
    <h1>
        {(results.length > 1) ? "Tie" : "Won"}
    </h1>
        {results.map((element) => <p key={element.User}>{element.User} with the robot {element.Robot}</p>)}
    </div>)
}

export default Results;