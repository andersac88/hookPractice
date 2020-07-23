import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
	const [term, setTerm] = useState("cat");
	const [debouncedTerm, setDebouncedTerm] = useState(term);
	const [results, setResults] = useState([]);

	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedTerm(term);
		}, 1000);

		return () => {
			clearTimeout(timerId);
		};
	}, [term]);

	useEffect(() => {
		const search = async () => {
			const { data } = await axios.get(`https://en.wikipedia.org/w/api.php`, {
				params: {
					action: "query",
					origin: "*",
					format: "json",
					srsearch: debouncedTerm,
					list: "search",
				},
			});
			setResults(data.query.search);
		};
		search();
	}, [debouncedTerm]);

	const renderedResults = results.map((results, i) => {
		return (
			<div key={i} className="item">
				<div className="right floated content">
					<a
						className="ui button"
						href={`https://en.wikipedia.org?curid=${results.pageid}`}
					>
						Go
					</a>
				</div>
				<div className="content">
					<div className="header">{results.title}</div>
					<span dangerouslySetInnerHTML={{ __html: results.snippet }}></span>
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
						className="input"
					></input>
				</div>
			</div>
			<div className="ui celled list">{renderedResults}</div>
		</div>
	);
};

export default Search;
