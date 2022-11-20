const Results = (props) => {
    const results = props.results;
    if (!results) return;
    return (<div className="my-form mb-2">
        {(results.length > 1) ? <h1>Empataron</h1> : <div>Gano</div>}
        {results.map((element) => <div className="row" key={element.User}><p>{element.User} con el robot{element.Robot}</p></div>)}
    </div>)
}

export default Results;