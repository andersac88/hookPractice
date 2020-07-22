import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
	const [term, setTerm] = useState("cat");
    const [results, setResults] = useState([]);

	useEffect(() => {
		const search = async () => {
            const { data } = await axios.get(`https://en.wikipedia.org/w/api/php`, {
				params: {
					action: "query",
					origin: '*',
                    format: "json",
					srsearch: term,
					list: "search",
					
				},
			});
			setResults(data);
			console.log(data)
		};

		search();
	}, [term]);

	const renderedResutls = results.map((results) => {
		return (
			<div className="item">
				<div className="content">
					<div className="header">{results.title}</div>
					{results.snippet}
				</div>
			</div>
		);
	});

	return (
		<div>
			<div className="ui form">
				<div className="field">
					<label>Enter Search Term</label>
					<input
						value={term}
						onChange={(e) => setTerm(e.target.value)}
						s
						className="input"
					></input>
				</div>
			</div>
			<div className="ui celled list">{renderedResutls}</div>
		</div>
	);
};

export default Search;
