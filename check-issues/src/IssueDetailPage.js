import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const IssueDetailPage = () => {
  const { issueId } = useParams();
  const [issueDetail, setIssueDetail] = useState(null);

  useEffect(() => {
    const fetchIssueDetail = async () => {
      try {
        const response = await axios.get(`https://api.github.com/repos/facebook/react/issues/${issueId}`);
        setIssueDetail(response.data);
      } catch (error) {
        console.error("Error fetching issue detail:", error);
      }
    };
    
    fetchIssueDetail();
  }, [issueId]);

  if (!issueDetail) return <div>Loading...</div>;

  return (
    <div>
    <header>
      <h1>facebook / react</h1>
    </header>
    
      <h2>{issueDetail.title}</h2>
      <p>Written by {issueDetail.user.login} on {new Date(issueDetail.created_at).toLocaleDateString()}</p>
      <img src={issueDetail.user.avatar_url} alt={`${issueDetail.user.login}'s avatar`} />
      <p>{issueDetail.body}</p>
    </div>
  );
};

export default IssueDetailPage;