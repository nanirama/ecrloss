import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from 'gatsby';

import linkResolver from '../../utils/linkResolver';

import LinkedIn from '../../assets/icons/LinkedIn';

import styled from "styled-components";

const TeamGrid = ({ slice }) => {
  const { items } = slice;
  const { heading, size } = slice.primary;
  return (
    <section>
      <Container>
      <div dangerouslySetInnerHTML={{ __html: heading.html }} />
      <Links>
        {items.map((item) => {
          const { person } = item;
          if (!person) return null;
          const { name, title, linkedin, photo, photoBig } = person.document.data;
          const personPhoto = size === 'Big' ? photoBig : photo;
		      const personimage = getImage(personPhoto)
          return (
            <li key={shortid.generate()}>
             <AuthorImage> <GatsbyImage image={personimage} alt={name} /></AuthorImage>
              {name && <Link to={linkResolver(person)}>{name}</Link>}
              {title && <p>{title}</p>}
              {linkedin.type ? (
                <a href={linkResolver(linkedin)}> <LinkedIn /></a>
              ) : (
                <a href={linkedin.url} target={linkedin.target}>
                   <LinkedIn />
                </a>
              )}

            </li>
          );
        })}
      </Links>
      </Container>
    </section>
  );
};

TeamGrid.propTypes = {
  slice: PropTypes.object.isRequired,
};

export default TeamGrid;

const Container = styled.div`
width: 100%;
max-width: 930px;
margin: 64px auto;
padding:0 15px;
box-sizing: border-box;
@media (max-width:767px) {
  margin: 40px auto
}
h1{
  font-size: 32px;
  line-height:40px; margin-bottom:14px;
  color:#3C3C3B;
  @media (max-width:479px) {
    font-size: 28px;
    line-height:35px;
  }
}
`;
const Links = styled.ul`
list-style:none;
padding:0;
text-align:center;
display:flex;
flex-wrap:wrap;margin: 0 -32px;

@media (max-width:767px) {
  justify-content: center;
}
li{
  width:176px;
  margin:32px;
  @media only screen and (min-width:600px) and (max-width:710px){
    width:220px;
  }
  @media (max-width:599px) {
    width:100%;
  }
}
a{
  font-size: 20px;
  line-height:24px;
  font-weight: bold;display: inline-block;
  color:#000;
  margin:0px 0 0 0;
  @media (max-width:479px) {
    font-size: 16px;
    line-height:20px;
  }
}
p{
  font-size: 20px;
  line-height:24px;
  font-weight:400;
  margin: 4px 0px 8px;
  color:#000;
  @media (max-width:479px) {
    font-size: 15px;
    line-height:20px;
  }
}
`;
const AuthorImage = styled.div`
justify-content: center; margin-bottom:21px;
display: flex;
img{
  border-radius:50%;
}
`;
