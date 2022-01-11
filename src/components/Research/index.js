import React from 'react';
import PropTypes from 'prop-types';

import Research from './Research';

import styled from "styled-components";

const ResearchData = ({ document, toc }) => {
  const {
    title,
    cover,
    subtitle,
    content,
    authors_box_title: authorsBoxTitle,
    grant_providers_box_title: grantProvidersBoxTitle,
    related_papers_box_title: relatedPapersToxTitle,
    authors: authorsRawData,
    grant_providers: grantProvidersRawData,
    related_papers: relatedPapersRawData,
    file,
    body
  } = document;
  const authors = authorsRawData
    .filter((item) => item.author.document != null)
    .map((item) => ({
      ...item.author.document.data,
      linkURL: { type: item.author.type, uid: item.author.uid },
    }));
  const grantProviders = grantProvidersRawData
    .filter((item) => item.organisation.document != null)
    .map((item) => item.organisation.document.data);
  const relatedPapers = relatedPapersRawData.map((item) => item.paper);

  return (

    <Research
      title={title}
      cover={cover}
      subtitle={subtitle}
      content={content}
      authorsBoxTitle={authorsBoxTitle}
      grantProvidersBoxTitle={grantProvidersBoxTitle}
      relatedPapersToxTitle={relatedPapersToxTitle}
      authors={authors}
      grantProviders={grantProviders}
      relatedPapers={relatedPapers}
      toc={toc}
      file={file}
      abstract={body}

    />
  );
};

ResearchData.propTypes = {
  document: PropTypes.object.isRequired,
  toc: PropTypes.array.isRequired,
};

export default ResearchData;

const Container = styled.div`
width: 100%;
max-width: 1230px;
margin:0 auto;
padding:0 15px;
box-sizing: border-box;
`;
