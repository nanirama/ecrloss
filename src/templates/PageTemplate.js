import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import PageBody from '../components/PageBody';

const PageTemplate = ({ data, location }) => {
  const {
    prismicPage: { data: page },
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
        image={socialCard.url ? socialCard.url : undefined}
      />
      <PageBody document={page} />
    </Layout>
  );
};

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PageTemplate;

export const query = graphql`
  query PageBySlug($uid: String!) {
    prismicPage(uid: { eq: $uid }) {
      data {
        title {
          html
          text
        }
        meta_title
        meta_description
        social_card {
          alt
          gatsbyImageData(layout: FULL_WIDTH)
          url
        }
        body {
          ... on PrismicPageDataBodyCta {
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
          ... on PrismicPageDataBodyHero {
            id
            slice_type
            primary {
              action_label
              action_url {
                url
                uid
                type
                target
              }
              align
              heading {
                html
              }
              overlay_opacity
              overlay_color
              pre_heading
              subheading
              image {
                gatsbyImageData(layout: FULL_WIDTH, width: 550)
                url                
              }
            }
          }
          ... on PrismicPageDataBodyImageCta {
            id
            slice_type
            primary {
              action_label
              action_url {
                url
                uid
                type
                target
              }
              align
              heading {
                html
              }
              image {
                gatsbyImageData(layout: FULL_WIDTH, width: 550)
                url 
              }
            }
          }
          ... on PrismicPageDataBodyGridNav {
            id
            slice_type
            items {
              action_label
              action_url {
                url
                uid
                type
                target
              }
              heading {
                html
              }
              subheading
            }
          }
          ... on PrismicPageDataBodyMetrics {
            id
            slice_type
            primary {
              heading {
                html
              }
            }
            items {
              metric
              value
            }
          }
          ... on PrismicPageDataBodyLogosStrip {
            id
            slice_type
            items {
              image {
                gatsbyImageData(layout: FULL_WIDTH, width: 550, height: 60)
                url 
              }
            }
          }
          ... on PrismicPageDataBodyTextBlock {
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
          ... on PrismicPageDataBodyActionBar {
            id
            slice_type
            primary {
              label
              action_label
              action_url {
                url
                uid
                type
                target
              }
              person {
                document {
                  ... on PrismicPerson {
                    id
                    data {
                      name
                      title
                      photo {
                        gatsbyImageData(layout: FIXED, width: 60, height: 60)
                        url                         
                      }
                    }
                  }
                }
              }
            }
          }
          ... on PrismicPageDataBodyVideo {
            id
            slice_type
            primary {
              action_label
              heading {
                html
              }
              video_url {
                html
              }
            }
          }
          ... on PrismicPageDataBodyMap {
            id
            slice_type
            items {
              name
              country
              city
              address
              post_code
              email
              location {
                latitude
                longitude
              }
            }
          }
          ... on PrismicPageDataBodyTeam {
            id
            slice_type
            primary {
              heading {
                html
              }
              size
            }
            items {
              person {
                uid
                type
                document {
                  ... on PrismicPerson {
                    id
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
                        gatsbyImageData(layout: FIXED, width: 128, height: 128)
                        url 
                      }
                      photoBig: photo {
                        gatsbyImageData(layout: FIXED, width: 176, height: 176)
                        url 
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
