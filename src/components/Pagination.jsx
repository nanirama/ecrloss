import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from "styled-components";

const Pagination = ({ data }) => {
  const {
    previousPagePath,
    nextPagePath,
    numberOfPages,
    paginationPath,
  } = data;

  if (numberOfPages > 1) {
    let pages = [];
    for (let i = 0; i < numberOfPages; i++) {
      pages.push({
        label: i + 1,
        linkURL: i === 0 ? paginationPath : `${paginationPath}/${i + 1}`,
      });
    }

    return (
      <div>
         <PagiNation>
        {previousPagePath ? (
          <Link to={previousPagePath} className="nextprevbtn"> Previous</Link>
        ) : null}
        {pages.map((page) => (
          <Link
            to={page.linkURL}
            activeClassName="active"
          >
            {page.label}
          </Link>
        ))}
       {nextPagePath ? <Link to={nextPagePath} className="nextprevbtn">Next </Link> : null}
        </PagiNation>
      </div>
    );
  }

  return null;
};

Pagination.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Pagination;

const PagiNation = styled.div`
margin:64px 0;
text-align:center;
@media (max-width: 767px) {
   margin:40px 0 20px 0;
}
a{
   color:#808080;
   padding: 5px 16px;
   font-weight: bold;
   display:inline-block;
   font-size:18px;
   @media (max-width: 800px) {
    margin-bottom:20px;
}
   &:hover{
      color:#4E50F7;  
   }
}
a.active{
  color:#4E50F7;
}
.nextprevbtn{
  background-color:#4E50F7 !important;
  color:#ffffff !important;margin-left: 16px;padding: 8px 16px;font-size: 14px;
}
`;
