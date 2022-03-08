import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Paginate from '../components/Blog/Paginate'
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { EventIndex } from '../components/Event';
import Pagination from '../components/Pagination';

const EventFuturePastListTemplate = ({ pageContext, path, location }) => {
//   const { allPrismicEvent } = data;
//console.log('Data Content', pageContext)


  

  const { basePath, paginationPath,humanPageNumber, categories, currentPage, numPages, data } = pageContext;
  //console.log('pageContext', data)
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

  const futurenormalizedCats = categories.map((cat) => ({
    path: `${basePath}/future/${cat.uid}/`,
    name: cat.document.data.name,
    color: cat.document.data.color,
  }));
  const pastnormalizedCats = categories.map((cat) => ({
    path: `${basePath}/past/${cat.uid}/`,
    name: cat.document.data.name,
    color: cat.document.data.color,
  }));
  const categoriesList = [
    { name: 'Everything', path: basePath },
    { name: 'Past Events', path:  basePath+'/past/', subCats: pastnormalizedCats },
    { name: 'Future Events', path: basePath+'/future/', subCats: futurenormalizedCats }
  ];

  if (!events) return null;

  return (
    <Layout location={location}>
      <Seo pathname={location.pathname} title="Events" />
      <EventIndex events={events} basePath={basePath} path={paginationPath} categories={categoriesList} />
      <Pagination data={pageContext} />
      {numPages>1 && <Paginate currentPage={currentPage} numPages={numPages} path={paginationPath} />  }
    </Layout>
  );
};

EventFuturePastListTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export default EventFuturePastListTemplate;