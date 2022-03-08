import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import ResearchIndex from '../components/Research/ResearchIndex';
import Pagination from '../components/Pagination';

const ResearchCategoryTemplate = ({ data, pageContext, path, location }) => {
  const { allPrismicResearch } = data;

  const { basePath, humanPageNumber, categories } = pageContext;

  const researches = allPrismicResearch.edges.map((research) => research.node);


  const normalizedCats = categories.map((cat) => ({
    path: `${basePath}/${cat.uid}`,
    name: cat.document.data.name,
    color: cat.document.data.color,
  }));
  const categoriesList = [
    { name: 'Everything', path: basePath },
    ...normalizedCats,
  ];

  if (!researches) return null;

  return (
    <Layout location={location}>
      <Seo pathname={location.pathname} title="Research papers" />
      <ResearchIndex
        data={researches}
        basePath={basePath}
        categories={categoriesList}
        path={path}
      />
      <Pagination data={pageContext} />
    </Layout>
  );
};

ResearchCategoryTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ResearchCategoryTemplate;

export const data = graphql`
  query($uid: String!, $skip: Int!, $limit: Int!) {
    allPrismicResearch(
      filter: {data: {category: {uid: {eq: $uid}}}}
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
            subtitle
            cover {
              url
              gatsbyImageData(layout: CONSTRAINED, width: 310)
            }
          }
        }
      }
    }
  }
`;
