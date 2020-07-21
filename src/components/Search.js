import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
	const [term, setTerm] = useState("programming");
    const [results, setResults] = useState([]);


	useEffect(() => {
		const search = async () => {
            const { data } = await axios.get("https://en.wikipedia.org/w/api/php", {
				params: {
					action: "query",
                    list: "search",
                    format: "json",
					origin: "*",
					srsearch: term,
				},
			});
			setResults(data);
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
