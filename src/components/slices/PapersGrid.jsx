import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from 'gatsby';

// import ResearchCover from '../Research/ResearchCover';

import styled from "styled-components";

const PapersGrid = ({ slice, research, basePath }) => {
  const { items } = slice;
  const { heading, subheading } = slice.primary;
  // const {
  //   uid,
  //   data: { title, subtitle, cover },
  // } = research;
  // let researchURL = `${basePath}/${uid}`;

  return (
    <section>
        <Container>
      <div dangerouslySetInnerHTML={{ __html: heading.html }} />
      <Paragraph>{subheading}</Paragraph>
      {/* <Link to={researchURL}>
      {cover && <ResearchCover
        title={title.text}
        subtitle={subtitle}
        cover={cover}
      />}
    </Link> */}
      <SubBlock>
      <ul>
        {items.map((item) => {
          const { cover, title, subtitle } = item.research.document.data;
          return (
            <Link to="/">
            <li
              key={shortid.generate()}
            >
               <ResearchImage> <GatsbyImage image={getImage(cover)} alt={title.text} /></ResearchImage>
               <Text>
               <h1>ECR</h1>
               <SubHeading> <h3>{title.text}</h3></SubHeading>
              <p>{subtitle}</p>
              </Text>
            </li>
            </Link>
          );
        })}
      </ul>
      </SubBlock>
      </Container>
    </section>
  );
};

PapersGrid.propTypes = {
  slice: PropTypes.object.isRequired,
  research: PropTypes.object.isRequired,
  basePath: PropTypes.string.isRequired,
};


export default PapersGrid;

const Container = styled.div`
width: 100%;
max-width: 1200px;
margin: 124px auto 112px auto;
padding:0 16px;
text-align: center;
box-sizing: border-box;
@media (max-width:1024px) {
  margin: 60px auto;
}
@media (max-width:767px) {
  margin: 40px auto;
}
`;
const Paragraph = styled.p`
width: 100%;
max-width: 700px;
margin: 0 auto 16px auto;
line-height:22px;
`;
const SubBlock = styled.div`
display:flex;
justify-content: center;
flex-wrap:wrap;
margin:-16px;
ul{
  list-style:none;
  padding:0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 479px) {
    width:100%;
    display:inline-block;
  }
  li{
    padding:16px 16px 20px 16px;
    position:relative;
  }
}
`;
const ResearchImage = styled.div`
width:310px;
@media (max-width: 479px) {
  width:100%;
}
`;
const Text = styled.div`
position:absolute;
left:48px;
right:48px;
top:99px;
bottom:0;
text-align:left;
@media (max-width: 479px) {
  left:32px;
  right:32px;
  top:65px;
}
h1{
  color:#fff;
  text-align:left;
  line-height: 52px;
  margin-bottom:19px;
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
  line-height: 34px;padding-top:16px;
  @media (max-width: 479px) {
    font-size:26px;
    line-height:32px;
  }
}
`;
