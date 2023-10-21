import React, {useState, useEffect, useRef, useCallback} from "react";
import IssueApi from './IssueApi';
import { Link } from 'react-router-dom';


const IssueListPage = () => {
  const [pageNumber, setpageNumber] = useState(1);
  const {issue, error} = IssueApi(pageNumber);
  const adImageURL = "https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100";
  const observer = useRef();

  const lastIssueElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && issue.length < 120) {
        setpageNumber(prevpageNumber => prevpageNumber + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [pageNumber, observer]);

  return (
    <div>
    <header>
      <h1>facebook / react</h1>
    </header>

    <table>
      <thead>
        <tr>
          <th>이슈번호</th>
          <th>이슈제목</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>코멘트수</th>
        </tr>
      </thead>
      <tbody>
      {issue.map((item, index) => {
          if (issue.length === index + 1) {
            return (
              <tr ref={lastIssueElementRef} key={item.id}>
                <td>{item.number}</td>
                <td><Link to={`/issuelist/${item.number}`}>{item.title}</Link></td>
                <td>{item.user.login}</td>
                <td>{new Date(item.created_at).toLocaleDateString()}</td>
                <td>{item.comments}</td>
              </tr>
              );
          } else {
            return (
              <React.Fragment key={item.id}>
                <tr>
                <td>{item.number}</td>
                <td><Link to={`/issuelist/${item.number}`}>{item.title}</Link></td>
                <td>{item.user.login}</td>
                <td>{new Date(item.created_at).toLocaleDateString()}</td>
                <td>{item.comments}</td>
                </tr>

              {(index + 1) % 5 === 0 && (
                <tr>
                  <td colSpan="5">
                    <a href="https://www.wanted.co.kr/" target="_blank" rel="noopener noreferrer">
                      <img src={adImageURL} alt="Advertisement" />
                    </a>
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
              }
        })}
      </tbody>
    </table>
  </div>

  );
}

export default IssueListPage;




