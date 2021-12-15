import React from 'react';

import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { linksResolver } from '../../utils/linksResolver';

import styled from "styled-components";

function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}

const Authors = ({ authors }) => (
  <Links>
    {authors.map((author) => {
      const { title, name, photo } = author;
      return (
        <li key={shortid.generate()}>
          <Flex as={Link} to={linksResolver(author.linkURL)}>
            <Image>
            <GatsbyImage image={getImage(photo)} alt={name} />
            </Image>
            <Box>
              <h6>{name}</h6>
              <p>{truncateString(title, 100)}</p>
            </Box>
          </Flex>
        </li>
      );
    })}
  </Links>
);

Authors.propTypes = {
  authors: PropTypes.array.isRequired,
};

export default Authors;

const Links = styled.ul`
list-style:none;
padding:0;
margin-bottom: 64px;
li{
  margin-bottom: 16px;
  p{
    margin:0;
  }
}
@media (max-width: 767px) {
  margin-bottom: 30px;
}

`;
const Flex = styled.div`
display:flex;
&:nth-child(1) div{
  width:32px;
}
`;
const Image = styled.div`
img{
  width:32px;
  height:32px;
}
`;
const Box = styled.div`
-moz-box-flex: 1;
flex-grow: 1;
margin: 0px 0px 0px 16px;
color:#3C3C3B;
h6{
  font-size: 12px;
  font-weight: bold;
  line-height:18px;
}
p{
  font-size: 12px;
  line-height:18px;
  margin:0;
}
`;

