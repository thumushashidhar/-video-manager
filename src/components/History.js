import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const History = () => {
  const [history, setHistory] = useState(null);
    useEffect(() =>
    {
        const fetchdata = async () =>
        {
          await axios
            .get("http://localhost:8000/history")
            .then((res) => {
              setHistory(res.data);
              console.log(history);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        fetchdata();
    
  },[]);
  return (
    <>
      <ol className="list-group list-group">
        {history && history.map((hist, index) => {
          return (
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">{hist.title}</div>
                {hist.link}
              </div>
              <span className="badge bg-primary rounded-pill">{hist.time}</span>
            </li>
          );
        })}
      </ol>
    </>
  );
};

export default History;
