import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import BlogItem from './BlogItem';
import Dropdown from './Dropdown';

import styled from "styled-components";

const BlogIndex = ({ blogs, basePath, isFirstPage, categories, path }) => {
  const recent = isFirstPage && blogs.splice(0, 2);
  
  return (
    <>
      <Box as="section" bgcolor="#f7f7f7">
      <Container> <h2>Explore our blog</h2></Container>
      </Box>
      <Container>
        <Dropdown items={categories} path={path} />
      </Container>

      {isFirstPage && (
        <Container as="section" variant="content">
          <Text>
            Recent
          </Text>
          <Grid>
            {recent.map((blog) => (
              <BlogItem
                key={blog.id}
                variant="big"
                blog={blog}
                basePath={basePath}
              />
            ))}
          </Grid>
        </Container>
      )}
      <Blog2>
      <Container as="section" variant="content">
      
        <Grid2>
          {blogs.map((blog, index) => {
            return isFirstPage && index === 1 ? (
                <BlogItem blog={blog} basePath={basePath} />
            ) : (
              <Item> <BlogItem key={blog.id} blog={blog} basePath={basePath} /></Item> 
            );
          })}
          
        </Grid2>
     
      </Container>
      </Blog2>
    </>
  );
};

BlogIndex.propTypes = {
  blogs: PropTypes.array.isRequired,
  basePath: PropTypes.string.isRequired,
  isFirstPage: PropTypes.bool.isRequired,
};

export default BlogIndex;

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
max-width: 1200px;
margin:0 auto;
padding:0 15px;
box-sizing: border-box;
`;
const Grid = styled.div`
display: grid;
grid-template-columns:1fr;
grid-gap: 10px 65px;
    @media (min-width: 701px) {
        grid-template-columns: repeat(2, 1fr);
    }
img{
    height:284px;object-position:top;
  @media (max-width: 700px) {
    height:inherit;
  }
}
`;
const Grid2 = styled.div`
display: grid;
grid-template-columns:1fr;
grid-gap: 10px 65px;
    @media (min-width: 801px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media only screen and (min-width:701px) and (max-width:800px){
      grid-template-columns: repeat(2, 1fr);
    }
`;
const Text = styled.div`
font-size: 24px;
font-weight: 700;
color: lightgrey;
text-transform: uppercase;
margin: 16px 0 15px 0px;
`;
const Blog2 = styled.div`
margin:40px 0 40px 0;
@media (max-width:800px) {
  margin:0px 0;
}

`;

const Item = styled.div`
margin-top:20px;
`;
