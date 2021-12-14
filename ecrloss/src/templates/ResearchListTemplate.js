import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ResearchIndex from '../components/Research/ResearchIndex';
import Pagination from '../components/Pagination';

const ResearchListTemplate = ({ data, pageContext, location }) => {
  const {
    allPrismicResearch: { edges: researchesData },
  } = data;

  const { basePath, humanPageNumber } = pageContext;

  const researches = researchesData.map((research) => research.node);

  if (!researches) return null;

  return (
    <Layout location={location}>
      <SEO pathname={location.pathname} title="Research papers" />
      <ResearchIndex
        data={researches}
        basePath={basePath}
      />
      <Pagination data={pageContext} />
    </Layout>
  );
};

ResearchListTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ResearchListTemplate;

export const data = graphql`
  query($skip: Int!, $limit: Int!) {
    allPrismicResearch(
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
