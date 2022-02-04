import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from 'gatsby';
import { linksResolver } from '../../utils/linksResolver';

import styled from "styled-components";

const Grants = ({ organisations }) => (
  <Links sx={{ listStyle: 'none', mb: 5 }}>
    {organisations.map((organisation) => (
      <li key={shortid.generate()} sx={{ mb: 3 }}>
        <Link to={linksResolver(organisation.website)}>
          <ClientLogos>
          <GatsbyImage image={getImage(organisation.logo)} />
          </ClientLogos>
        </Link>
      </li>
    ))}
  </Links>
);

Grants.propTypes = {
  organisations: PropTypes.array.isRequired,
};

export default Grants;

const Links = styled.ul`
list-style:none;
padding:0;
margin-bottom: 64px;
@media (max-width: 767px) {
  margin-bottom: 30px !important;;
}
img{
  width:auto;
  max-width:100%;
}
`;
const ClientLogos = styled.div`
  width:auto;
  max-width:100%;
  .gatsby-image-wrapper{
    margin:4px 0px 18px;
  }
`;
