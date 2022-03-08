import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { QuestionTemplate as QuestionView } from '../components/FAQ';

const QuestionTemplate = ({ data, pageContext, location }) => {
  const {
    prismicQuestion: { data: page },
    allPrismicQuestion,
  } = data;

  if (!page) return null;

  const { categories } = pageContext;

  const questions = allPrismicQuestion.edges.map(({ node }) => node);

  return (
    <Layout location={location}>
      <Seo pathname={location.pathname} title={page.question.text} />
      <QuestionView data={{ page, questions, categories }} />
    </Layout>
  );
};

QuestionTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default QuestionTemplate;

export const query = graphql`
  query QuestionBySlug($uid: String!) {
    prismicQuestion(uid: { eq: $uid }) {
      data {
        question {
          html
          text
        }
        answer {
          html
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
      }
    }
    allPrismicQuestion {
      edges {
        node {
          uid
          data {
            question {
              text
            }
            category {
              uid
              document {
                ... on PrismicCategory {
                  id
                  data {
                    name
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
