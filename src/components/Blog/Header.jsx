import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components";

const Header = ({ title, category, author, image, basePath }) => {
  let {
    document: {
      uid,
      data: { color, name: categoryName, color: categoryColor },
    },
  } = category;
  const bimage = getImage(image)
  return (
    <div>
      
      <div dangerouslySetInnerHTML={{ __html: title.html }} />
      <p class="css-2i93k9">by <a href={`/team/${author.document.uid}`}>Colin Peacock</a></p>
      <Category> <Link
        to={`${basePath}/${uid}`}
        style={{ backgroundColor: categoryColor, color: '#FFF' }}
      >
        {categoryName}
      </Link>
      </Category>
      <GatsbyImage image={bimage} />
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
  basePath: PropTypes.string.isRequired,
};

export default Header;

const Category = styled.div`
margin:16px 0;
a{
padding:8px 16px;
display:inline-block;
font-size: 14px;
font-weight: bold;
line-height:18px;
}
`;
