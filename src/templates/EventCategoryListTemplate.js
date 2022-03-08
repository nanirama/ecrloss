import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import moment from 'moment';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { EventIndex } from '../components/Event';
import Pagination from '../components/Pagination';

const EventListTemplate = ({ data, pageContext, path,  location }) => {
  const {
    allPrismicEvent: { edges: eventsData },
  } = data;

  const { basePath, paginationPath, categories, humanPageNumber } = pageContext;

  const events = eventsData.map((event) => {
    return event.node
  });
  let pastEvents = [];
  let futureEvens = []
  eventsData.map((event) => {
    let isPast = moment() > moment(event.node.data.start_date);
    if(isPast){
      pastEvents.push(event.node)
    } else {
      futureEvens.push(event.node)
    }
  });

  const normalizedCats = categories.map((cat) => ({
    path: `${basePath}/${cat.uid}`,
    name: cat.document.data.name,
    color: cat.document.data.color,
  }));
  const categoriesList = [
    { name: 'Everything', path: basePath },
    { name: 'Past Events', path:  basePath+'/past/' },
    { name: 'Future Events', path: basePath+'/future/' },
    ...normalizedCats,
  ];

  if (!events) return null;

  return (
    <Layout location={location}>
      <Seo pathname={location.pathname} title="Events" />
      <EventIndex events={events} basePath={basePath} path={paginationPath} categories={categoriesList}  />
      <Pagination data={pageContext} />
    </Layout>
  );
};

EventListTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default EventListTemplate;

export const data = graphql`
  query($uid: String!, $skip: Int!, $limit: Int!) {
    allPrismicEvent(
      filter: {data: {category: {uid: {eq: $uid}}}}
      sort: { fields: data___start_date, order: DESC }
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
            description
            start_date
            end_date
            custom_date
            organiser
            city
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
          }
        }
      }
    }
  }
`;
