import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import styled from "styled-components";

const ResearchCover = ({ title, subtitle, cover }) => (
  <ResearchBlock>
    <ResearchImage>
    <GatsbyImage image={getImage(cover)} alt={title} />
    </ResearchImage>
    <TextBlock>
      <h1>ECR</h1>
      <SubHeading>
        <h3> {title}</h3>
      </SubHeading>
      <p>
        {subtitle}
      </p>
    </TextBlock>
  </ResearchBlock>
);

ResearchCover.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  cover: PropTypes.object.isRequired,
};

export default ResearchCover;

const ResearchBlock = styled.div`
position:relative;
`;
const TextBlock = styled.div`
position:absolute;
left:32px;
right:32px;
top:83px;
bottom:0;
text-align:left;
@media (max-width: 479px) {
  left:20px;
  right:20px;
  top:50px;
}
h1{
  color:#fff;
  text-align:left;
  line-height: 52px;
  margin-bottom:20px;
}
p{
  line-height: 15px;
  color:#fff;
  font-size: 12px;
text-align: left;
}
`;
const SubHeading = styled.div`
border-left:2px solid #fff;
padding-left: 16px;
h3{
  font-size:28px;
  color:#fff;
  font-weight: 500;
  line-height: 34px;
  padding-top: 15px;
}
`;
const ResearchImage = styled.div`
width:310px;
@media (max-width: 479px) {
width:100%;
}
`;
