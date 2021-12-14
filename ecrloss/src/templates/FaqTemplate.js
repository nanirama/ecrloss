import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { QuestionListTemplate as QuestionListView } from '../components/FAQ';

const FaqTemplate = ({ data, pageContext, location }) => {
  const {
    allPrismicQuestion,
  } = data;

  const { categories } = pageContext;

  const questions = allPrismicQuestion.edges.map(({ node }) => node);

  return (
    <Layout location={location}>
      <SEO pathname={location.pathname} title="Glossary" />
      <QuestionListView data={{ categories, questions, allQuestions: questions }} />
    </Layout>
  );
};

FaqTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default FaqTemplate;

export const query = graphql`
  query FaqTemplateQuery {
    allPrismicQuestion {
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
