import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";

const BlogItem = ({ blog, basePath }) => {
  const {
    uid,
    data: { title, excerpt, category, featured_image: image },
  } = blog;
  let blogURL = category.uid
    ? `${basePath}/${category.uid}/${uid}`
    : `${basePath}/${uid}`;
  const {
    data: { name: categoryName, color: categoryColor },
  } = category.document;
  const blogimage = getImage(image)
  return (
    <Item>
      <Link to={blogURL}>
        <Image>
      <GatsbyImage image={blogimage} alt={title.text} />
      </Image>
      </Link>
     <Category> <Link to={blogURL}
        // href={`${basePath}/${category.uid}`}
        style={{ backgroundColor: categoryColor, color: '#FFF' }}
      >
        {categoryName}
      </Link>
      </Category>

      <Link to={blogURL}>
        <h4>{title.text}</h4>
        <p>{excerpt}</p>
      </Link>
    </Item>
  );
};

BlogItem.propTypes = {
  blog: PropTypes.object.isRequired,
  basePath: PropTypes.string.isRequired,
};

export default BlogItem;

const Item = styled.div`
display:flex;
flex-wrap:wrap;
flex-direction: column;margin-bottom:25px;

   h4{ line-height:22px;margin:0; }
   p{display:none;}
`;
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
const Image = styled.div`
display: flex;
flex-direction: column;
img{
  height:180px;object-position: top;
@media (max-width: 700px) {
  height:inherit;
}
}
`;


