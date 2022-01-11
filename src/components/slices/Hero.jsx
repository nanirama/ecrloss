import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import styled from "styled-components";

const Hero = ({ slice }) => {
  const {
    image,
    pre_heading: preHeading,
    heading,
    subheading,
    align,
    action_label: actionLabel,
    action_url: actionURL,
  } = slice.primary;
  const heroimage = getImage(image)
  return (
    <section>
     <TeamBanner>
     <Image><GatsbyImage image={heroimage} alt={preHeading} /></Image>
      <Box/>
<Text>
      <Container>
        { preHeading && <p>{preHeading}</p>}
      {heading.html && <div dangerouslySetInnerHTML={{ __html: heading.html }} />}
      { subheading && <p>{subheading}</p>}
      { actionLabel &&  <Button type="button"
      href={actionURL.url}
      target={actionURL.target}
      > {actionLabel || 'link'}</Button> }
     {/* <Button>{actionLabel && <button type="button">{actionLabel}</button> }</Button>
      {actionURL.type ? linkResolver(actionURL) : actionURL.url} */}
            </Container>
      </Text>

      </TeamBanner>
   
    </section>
  );
};

Hero.propTypes = {
  slice: PropTypes.object.isRequired,
};

export default Hero;

const TeamBanner = styled.div`
position:relative;
`;
const Box = styled.div`
background-color: rgba(0,0,0,0.65);
position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;
`;
const Image = styled.div`
min-height: 350px;
div{
  overflow:inherit;
}
img{
  min-height: 350px;
}
`;
const Container = styled.div`
width: 100%;
max-width: 930px;
margin: 0 auto;
padding:0 15px;
box-sizing: border-box;
`;
const Text = styled.div`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
position:absolute;
top:0px;
left:0;
right: 0;
width:100%;
height:100%;
// @media (max-width: 600px) {
//   top:120px;
// }
h1{
  font-size:32px;
  line-height:40px;
  color:#fff;
  margin:8px 0 30px 0;
  @media (max-width: 600px) {
    font-size:28px;
    line-height:36px;
    margin:6px 0 15px 0;
  }

}
p{
  color:#fff;
  position:relative;
  padding-top:15px; margin-bottom:36px;
  &:before{
    content:'';
    position:absolute;
    width:100%;
    height:1px;
    background-color:#fff;
    top:2px;
  }
}
`;
const Button = styled.a`
background-color: #4E50F7;
text-transform: uppercase;
color:#fff;
border:none;
padding:8px 32px; 
font-size: 16px;
`;
