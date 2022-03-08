import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { Event } from '../components/Event';

const EventTemplate = ({ data, pageContext, location }) => {
  const {
    prismicEvent: { data: page },
  } = data;

  if (!page) return null;

  const {
    meta_title: metaTitle,
    meta_description: metaDescription,
    social_card: socialCard,
  } = page;

  return (
    <Layout location={location}>
      <Seo
        pathname={location.pathname}
        title={metaTitle || page.title.text}
        description={metaDescription}
        image={socialCard.localFile ? socialCard.localFile.url : undefined}
      />
      <Event data={page} />
    </Layout>
  );
};

EventTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default EventTemplate;

export const query = graphql`
  query EventBySlug($uid: String!) {
    prismicEvent(uid: { eq: $uid }) {
      data {
        meta_title
        meta_description
        social_card {
          alt
          gatsbyImageData(layout: CONSTRAINED, width: 500)
          url
        }
        title {
          html
          text
        }
        start_date
        end_date
        custom_date
        description
        description_richtext {
          html
        }
        city
        organiser
        address
        price
        featured_image {
          gatsbyImageData(layout: CONSTRAINED, width: 1200)
        }
        register_label
        register_url {
          url
          uid
          type
          target
        }
        files {
          label
          file {
            url
          }
        }
        links {
          label
          link_url {
            url
            uid
            type
            target
          }
        }
      }
    }
  }
`;
