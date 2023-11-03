import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './style/style.css';

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
    <div className='detail-background'>
      <span></span>
    <div className='display-total'>
      <h1>facebook / react</h1>
      <div className='dispay-issue'>
        <section className='detail-contents'>
          <h2>{issueDetail.title}</h2>
          <img className='creator-img' src={issueDetail.user.avatar_url} alt={`${issueDetail.user.login}'s avatar`} />
          <p className='creator-ifm'>Written by {issueDetail.user.login} on {new Date(issueDetail.created_at).toLocaleDateString()}</p>
          </section>
          <p className='creator-issue'>{issueDetail.body}</p>
      </div>
    </div>
    </div>
  );
};

export default IssueDetailPage;