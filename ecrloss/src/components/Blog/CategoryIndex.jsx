import React from 'react';
import PropTypes from 'prop-types';

import BlogItem from './BlogItem';
import Dropdown from './Dropdown';

import styled from "styled-components";

const CategoryIndex = ({ blogs, basePath, categories, path }) => {
  return (
    <>
      <Box as="section">
        <Container>
          <h2>Explore our blog</h2>
        </Container>
      </Box>
      <Container
        as="section"
        variant="content"        
      >
        <Dropdown items={categories} path={path} />
      </Container>
      <Container as="section" variant="content">
        <Grid>
          {blogs.map((blog) => (
            <BlogItem key={blog.id} blog={blog} basePath={basePath} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

CategoryIndex.propTypes = {
  blogs: PropTypes.array.isRequired,
  basePath: PropTypes.string.isRequired,
};

export default CategoryIndex;

const Box = styled.section`
background-color: #f7f7f7;
padding:32px 0;
h2{
  margin:0;
  font-size:24px;
  line-height:29px;
}
`;
const Container = styled.div`
width: 100%;
max-width: 1230px;
margin:0 auto;
padding:0 15px;
`;
const Grid = styled.div`
display: grid;margin-top:64px;
grid-template-columns:1fr;
grid-gap: 35px 65px;
    @media (min-width: 801px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media only screen and (min-width:701px) and (max-width:800px){
      grid-template-columns: repeat(2, 1fr);
    }
    img{object-position: bottom;}
`;
