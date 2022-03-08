import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import PageBody from '../components/PageBody';
import { Header, Webinar } from '../components/Webinar';

const WebinarTemplate = ({ data, pageContext, location }) => {
  const {
    prismicWebinar: { data: page },
  } = data;

  if (!page) return null;

  const {
    title,
    description,
    category,
    presenter,
    featured_image: image,
    date,
    custom_date: customDate,
    register_label: registerLabel,
    register_url: registerURL,
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
        image={socialCard.url ? socialCard.url : undefined}
      />
      <Header
        title={title}
        description={description}
        category={category}
        image={image}
        date={date}
        customDate={customDate}
        presenter={presenter}
        registerLabel={registerLabel}
        registerURL={registerURL}
      />
        <Webinar document={page}>
          <PageBody document={page} />
        </Webinar>
    </Layout>
  );
};

WebinarTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default WebinarTemplate;

export const query = graphql`
  query WebinarBySlug($uid: String!) {
    prismicWebinar(uid: { eq: $uid }) {
      data {
        title {
          html
          text
        }
        date
        custom_date
        description
        featured_image {
          url
          gatsbyImageData(layout: CONSTRAINED, width: 600)
        }
        register_label
        register_url {
          url
          uid
          type
          target
        }
        category {
          document {
            ... on PrismicCategory {
              id
              uid
              data {
                name
                color
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
                title
                bio {
                  text
                }
                photo {
                  url
                  gatsbyImageData(layout: FIXED, width: 32, height: 32)
                }
              }
            }
          }
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
        meta_title
        meta_description
        social_card {
          alt
          url
          gatsbyImageData(layout: CONSTRAINED, width: 600, height: 300)
        }
        body {
          ... on PrismicWebinarDataBodyCta {
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
          ... on PrismicWebinarDataBodyTextBlock {
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
          ... on PrismicWebinarDataBodyImage {
            id
            slice_type
            primary {
              image {
                url
                gatsbyImageData(layout: FULL_WIDTH, width: 1200)
              }
              description
            }
          }
        }
      }
    }
  }
`;
