import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Paginate from '../components/blog/Paginate'
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { EventIndex } from '../components/Event';
import Pagination from '../components/Pagination';

const EventFuturePastListTemplate = ({ pageContext, location }) => {
//   const { allPrismicEvent } = data;
console.log('Data Content', pageContext)


  

  const { basePath, humanPageNumber, currentPage, numPages, data } = pageContext;
  console.log('pageContext', data)
  const events = data.map((event) => {
    return event.node
  });
//   const events = allPrismicEvent.map((event) => {.0
//     return event.node
//   });
  // let pastEvents = [];
  // let futureEvens = []
  // eventsData.map((event) => {
  //   let isPast = moment() > moment(event.node.data.start_date);
  //   if(isPast){
  //     pastEvents.push(event.node)
  //   } else {
  //     futureEvens.push(event.node)
  //   }
  // });


  if (!events) return null;

  return (
    <Layout location={location}>
      <SEO pathname={location.pathname} title="Events" />
      <EventIndex events={events} basePath={basePath} />
      <Pagination data={pageContext} />
      {numPages>1 && <Paginate currentPage={currentPage} numPages={numPages} path={basePath} />  }
    </Layout>
  );
};

EventFuturePastListTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export default EventFuturePastListTemplate;