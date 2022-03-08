import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import PageBody from '../components/PageBody';
import PersonPageTemplate from '../components/PersonTemplate';

const PersonTemplate = ({ data, location, ...props }) => {
  const {
    prismicPerson: { data: page },
  } = data;

  if (!page) return null;

  return (
    <Layout location={location}>
      <Seo pathname={location.pathname} title={`${page.name} | ${page.title}`} />
      <PersonPageTemplate data={page} />
      <PageBody document={page} />
    </Layout>
  );
};

PersonTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PersonTemplate;

export const query = graphql`
  query PersonPageBySlug($uid: String!) {
    prismicPerson(uid: { eq: $uid }) {
      data {
        name
        title
        bio {
          html
        }
        linkedin {
          url
          uid
          type
          target
        }
        photo {
          gatsbyImageData(layout: FIXED, width: 174, height: 174)
          url
        }
        background {
          gatsbyImageData(layout: FIXED, height: 550)
          url
        }
        body {
          ... on PrismicPersonDataBodyCta {
            id
            slice_type
            primary {
              action_label
              heading {
                html
              }
              subheading
              action_url {
                target
                url
                type
                uid
              }
            }
          }
          ... on PrismicPersonDataBodyTextBlock {
            id
            slice_type
            primary {
              heading {
                html
              }
              content {
                html
              }
            }
          }
        }
      }
    }
  }
`;
