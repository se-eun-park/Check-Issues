import {useState, useEffect} from "react";
import axios from 'axios';

const IssueApi = (pageNumber) => {
    const [issue, setIssue] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchIssue = async () => {
            try {
                const response = await axios.get(`https://api.github.com/repos/facebook/react/issues?per_page=30&page=${pageNumber}&sort=comments`, {
                  headers: { Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}` },
                });
                setIssue((prevIssue) => {
                    return [...prevIssue, ...response.data];
                });
            } catch(error) {
                console.log(error);
                setError(true);
            }
        }
        fetchIssue()
    }, [pageNumber]);

    return {issue, error}
}

export default IssueApi;