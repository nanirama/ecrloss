import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Research from '../components/Research';

import styled from "styled-components";

const ResearchTemplate = ({ data, location }) => {
  const {
    prismicResearch: { data: page },
  } = data;

  if (!page) return null;

  const {
    meta_title: metaTitle,
    meta_description: metaDescription,
    social_card: socialCard,
  } = page;

  const tocData = page.content.raw.filter(
    (item) => item.type === 'heading2' || item.type === 'heading3'
  );
    console.log('all Page data',page)
  return (
    <Layout location={location}>
      <Seo
        pathname={location.pathname}
        title={metaTitle || page.title.text}
        description={metaDescription}
        image={socialCard.localFile ? socialCard.localFile.url : undefined}
      />
      <Research document={page} toc={tocData} />
    </Layout>
  );
};

ResearchTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ResearchTemplate;

export const query = graphql`
  query ResearchBySlug($uid: String!) {
    prismicResearch(uid: { eq: $uid }) {
      data {
        meta_title
        meta_description
        social_card {
          alt
          url
          gatsbyImageData(layout: CONSTRAINED, width: 310)
        }
        title {
          html
          text
        }
        file {
          url
        }
        cover {
          url
          gatsbyImageData(layout: CONSTRAINED, width: 310)
        }
        subtitle
        content {
          html
          raw
        }
        body {
          ... on PrismicResearchDataBodyAbstractMlang {
            id
            primary {
              spanish {
                html
              }
              german {
                html
              }
              french {
                html
              }
              englsih {
                html
              }
              dutch {
                html
              }
            }
            slice_type
          }
        }      
        authors_box_title
        grant_providers_box_title
        related_papers_box_title
        authors {
          author {
            uid
            type
            document {
              ... on PrismicPerson {
                id
                data {
                  name
                  title
                  bio {
                    text
                  }
                  photo {
                    url
                    gatsbyImageData(layout: CONSTRAINED, width: 310)
                  }
                }
              }
            }
          }
        }
        grant_providers {
          organisation {
            document {
              ... on PrismicOrganisation {
                id
                data {
                  name
                  logo {
                    url
                    gatsbyImageData(layout: CONSTRAINED, height: 30)
                  }
                  website {
                    type
                    target
                    uid
                    url
                  }
                }
              }
            }
          }
        }
        related_papers {
          paper {
            url
            uid
            type
            target
            document {
              ... on PrismicResearch {
                id
                data {
                  title {
                    text
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

const Container = styled.div`
width: 100%;
max-width: 1230px;
margin:0 auto;
padding:0 15px;
box-sizing: border-box;
`;
