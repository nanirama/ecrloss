import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import PageBody from '../components/PageBody';
import Seo from '../components/Seo';

const HomeTemplate = ({ data, location }) => {
  const {
    prismicHome: { data: page },
  } = data;

  if (!page) return null;
  return (
    <Layout location={location}>
      <Seo title={page.meta_title} description={page.meta_description} pathname={location.pathname} />
      <PageBody document={page} />
    </Layout>
  );
};

HomeTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default HomeTemplate;

export const data = graphql`
  query {
    prismicHome {
      data {
        title {
          html
        }
        meta_title
        meta_description
        body {
          ... on PrismicHomeDataBodyCta {
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
          ... on PrismicHomeDataBodyHero {
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
                gatsbyImageData(layout: FULL_WIDTH)
                url                
              }
            }
          }
          ... on PrismicHomeDataBodyImageCta {
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
                gatsbyImageData(layout: FULL_WIDTH, height: 550)
                url 
              }
            }
          }
          ... on PrismicHomeDataBodyGridNav {
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
          ... on PrismicHomeDataBodyMetrics {
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
          ... on PrismicHomeDataBodyLogosStrip {
            id
            slice_type
            items {
              image {
                gatsbyImageData(layout: FULL_WIDTH, height: 60, width: 160)
                url                 
              }
            }
          }
          ... on PrismicHomeDataBodyTextBlock {
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
          ... on PrismicHomeDataBodyActionBar {
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
                        gatsbyImageData(layout: FIXED, height: 60, width: 60)
                        url                         
                      }
                    }
                  }
                }
              }
            }
          }
          ... on PrismicHomeDataBodyVideo {
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
          ... on PrismicHomeDataBodyPapersGrid {
            id
            slice_type
            primary {
              heading {
                html
              }
              subheading
            }
            items {
              research {
                id
                type
                uid
                document {
                  ... on PrismicResearch {
                    id
                    data {
                      title {
                        text
                      }
                      subtitle
                      cover {
                        gatsbyImageData(layout: FULL_WIDTH, width: 310)
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
