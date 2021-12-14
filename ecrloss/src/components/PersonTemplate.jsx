import React from 'react';
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { linksResolver } from '../utils/linksResolver';
import LinkedIn from '../assets/icons/LinkedIn';

import styled from "styled-components";


const PersonTemplate = ({ data }) => {
  const { name, title, bio, photo, background, linkedin } = data;
  return (
    <section>
      <TeamBanner>
        <Image>
        <GatsbyImage image={getImage(background)} />
        </Image>
        <Box/>

        <Flex>
          <GatsbyImage image={getImage(photo)} alt={title} />
          {name && (
            <Author
              as="p"
              variant={'person.nameBig'}
            >
              {name}
            </Author>
          )}
          {title && (
            <Text
              as="p"
              variant={'person.titleBig'}
            >
              {title}
            </Text>
          )}
          {linkedin.type ? (
            <a href={linksResolver(linkedin)}>
              <LinkedIn />
            </a>
          ) : (
            <a href={linkedin.url} target={linkedin.target}>
              <LinkedIn />
            </a>
          )}
        </Flex>
      </TeamBanner>
    </section>
  );
};

export default PersonTemplate;

const TeamBanner = styled.div`
position:relative;
`;
const Image = styled.div`
width:100%;
display:flex;
div{
  height:350px !important;
  width: 100% !important;
}
`;
const Box = styled.div`
background-color: rgba(0,0,0,0.65);
position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;
`;
const Flex = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
inset: 0px;
position: absolute;
top: 0;
bottom: 0;
left: 0;
right: 0;
color:#fff;
img{
  border-radius:50%;
}
`;
const Author = styled.p`
font-size: 20px;
font-weight: bold;
margin: 16px 0px 0px;
color:#fff;
line-height: 24px;
@media (max-width: 479px) {
  font-size: 16px;
}
`;
const Text = styled.p`
font-size: 20px;
font-weight: 400;
color:#fff;
margin: 4px 0px 8px;
@media (max-width: 479px) {
  font-size: 16px;
}
`;
