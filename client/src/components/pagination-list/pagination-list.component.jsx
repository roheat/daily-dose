import React from "react";
import { Link } from "react-router-dom";

const PaginationList = props => {
  if (props.articlesCount <= 10) return null;

  const range = [];
  for (let i = 0; i < Math.ceil(props.articlesCount / 10); i++) range.push(i);

  const setPage = page => props.onSetPage(page);
  return (
    <nav>
      <ul className="pagination">
        {range.map(r => {
          const isCurrent = r === props.currentPage;
          return (
            <li
              className={`page-item ${isCurrent && "active"}`}
              onClick={() => setPage(r)}
              key={r.toString()}
            >
              <Link className="page-link" to="">
                {r + 1}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default PaginationList;
