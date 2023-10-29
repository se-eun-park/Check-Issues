import React from "react";
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import IssueListPage from "./IssueListPage";
import IssueDetailPage from './IssueDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IssueListPage/>} />
        <Route path="/issuelist/:issueId" element={<IssueDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
