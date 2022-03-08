import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { QuestionListTemplate as QuestionListView } from '../components/FAQ';

const QuestionListTemplate = ({ data, pageContext, location }) => {
  const {
    allPrismicQuestion,
    all,
  } = data;

  const { categories } = pageContext;

  const questions = allPrismicQuestion.edges.map(({ node }) => node);
  const allQuestions = all.edges.map(({ node }) => node);

  return (
    <Layout location={location}>
      <Seo pathname={location.pathname} title="Qeustions" />
      <QuestionListView data={{ categories, questions, allQuestions }} />
    </Layout>
  );
};

QuestionListTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default QuestionListTemplate;

export const query = graphql`
  query QuestionListBySlug($uid: String!) {
    allPrismicQuestion(filter: { data: { category: { uid: { eq: $uid } } } }) {
      edges {
        node {
          uid
          data {
            question {
              text
              html
            }
            answer {
              html
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
    all: allPrismicQuestion {
      edges {
        node {
          uid
          data {
            question {
              text
              html
            }
            answer {
              html
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
