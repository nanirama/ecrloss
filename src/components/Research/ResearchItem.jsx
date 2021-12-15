import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import ResearchCover from './ResearchCover';

import styled from "styled-components";

const ResearchItem = ({ research, basePath }) => {
  const {
    uid,
    data: { title, subtitle, cover },
  } = research;
  let researchURL = `${basePath}/${uid}`;

  return (
    <Box>
    <Link to={researchURL}>
      {cover && <ResearchCover
        title={title.text}
        subtitle={subtitle}
        cover={cover}
      />}
    </Link>
    </Box>
  );
};

ResearchItem.propTypes = {
  research: PropTypes.object.isRequired,
  basePath: PropTypes.string.isRequired,
};

export default ResearchItem;

const Box = styled.div`
padding:16px 16px 15px 16px;
`;
