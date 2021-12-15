import React from 'react';

import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Link } from 'gatsby';

import { linksResolver } from '../../utils/linksResolver';

import styled from "styled-components";

const RelatedPapers = ({ papers }) => (
  <Links>
    {papers.map((paper) => (
      <li
        key={shortid.generate()}
      >
        {paper.type ? (
          <Link to={linksResolver(paper)}>
            {paper.document.data.title.text}
          </Link>
        ) : (
          <a href={paper.url} target={paper.target}>
            {paper.url}
          </a>
        )}
      </li>
    ))}
  </Links>
);

RelatedPapers.propTypes = {
  papers: PropTypes.array.isRequired,
};

export default RelatedPapers;

const Links = styled.ul`
list-style:none;
padding:0;
margin-bottom: 64px;
li{
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: bold;
}
a{
  color:#7A6B6B;
}
@media (max-width: 767px) {
  margin-bottom: 30px;
}


`;
