import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { WebinarIndex } from '../components/Webinar';
import Pagination from '../components/Pagination';

const WebinarListTemplate = ({ data, pageContext, location }) => {
  const {
    allPrismicWebinar: { edges: webinarsData },
  } = data;

  const { basePath, humanPageNumber } = pageContext;

  const webinars = webinarsData.map((webinar) => webinar.node);

  if (!webinars) return null;

  return (
    <Layout location={location}>
      <Seo pathname={location.pathname} title="Webinars" />
      <WebinarIndex
        webinars={webinars}
        basePath={basePath}
        isFirstPage={humanPageNumber === 1}
      />
      <Pagination data={pageContext} />
    </Layout>
  );
};

WebinarListTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default WebinarListTemplate;

export const data = graphql`
  query($skip: Int!, $limit: Int!) {
    allPrismicWebinar(
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
            date
            custom_date
            description
            register_label
            register_url {
              url
              uid
              type
              target
            }
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
            presenter {
              document {
                ... on PrismicPerson {
                  uid
                  type
                  data {
                    name
                  }
                }
              }
            }
            featured_image {
              gatsbyImageData(layout: CONSTRAINED, width: 600, height: 300)
            }
          }
        }
      }
    }
  }
`;
