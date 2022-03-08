import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { BlogIndex } from '../components/Blog';
import Pagination from '../components/Pagination';

const BlogListTemplate = ({ data, pageContext, path, location }) => {
  const {
    allPrismicBlog: { edges: blogsData },
  } = data;

  const { basePath, humanPageNumber, categories } = pageContext;

  const blogs = blogsData.map((blog) => blog.node);

  if (!blogs) return null;

  const normalizedCats = categories.map((cat) => ({
    path: `${basePath}/${cat.uid}`,
    name: cat.document.data.name,
    color: cat.document.data.color,
  }));
  const categoriesList = [
    { name: 'Everything', path: basePath },
    ...normalizedCats,
  ];

  return (
    <Layout bgcolor="#ffffff" location={location}>
      <Seo pathname={location.pathname} title="Blog" />
      <BlogIndex
        blogs={blogs}
        basePath={basePath}
        isFirstPage={humanPageNumber === 1}
        categories={categoriesList}
        path={path}
      />
      <Pagination data={pageContext} />
    </Layout>
  );
};

BlogListTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BlogListTemplate;

export const data = graphql`
  query($skip: Int!, $limit: Int!) {
    allPrismicBlog(
      sort: { fields: last_publication_date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          uid
          data {
            title {
              text
            }
            excerpt
            category {
              uid
              document {
                ... on PrismicCategory {
                  data {
                    color
                    name
                  }
                }
              }
            }
            featured_image {
              url
              gatsbyImageData(layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
`;
