import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { Elements } from 'prismic-reactjs';
import Sidebar from "react-sidebar";
import { RichText } from 'prismic-reactjs';

import Authors from './Authors';
import RelatedPapers from './RelatedPapers';
import Grants from './Grants';
import TOC from './TOC';
import { Link } from 'gatsby';

import styled from "styled-components";
import ResearchCover from './ResearchCover';
import Abstract from './Abstract';
import Contact from '../Contact';
import ScrollToTopButton from '../ScrollToTopButton';
import ResearchSidebar from './ResearchSidebar';
import htmlSerializer from '../../utils/htmlSerializer'


const Research = (props) => {
  const {
    title,
    cover,
    subtitle,
    content,
    authorsBoxTitle,
    grantProvidersBoxTitle,
    relatedPapersToxTitle,
    authors,
    grantProviders,
    relatedPapers,
    toc,
    file,
    abstract
  } = props
  const isOpen = false
  const toggle = () => {}
  const pageURL = ''
  
  
  console.log('file data',file)
  return(
  <div>
      <ResearchSidebar
          formId="download"
          pageURL={pageURL}
          downloadURL={file}            
          dataLayerEvent={{ event: 'download' }}
        />
    <Wrapper>     
    <ScrollToTopButton />
      <Container>
      <Return>
        <Link to="/research">
          &lt; Return to all reports
        </Link>
        </Return>
      
    <TopContent>
      <LeftText>
        <div dangerouslySetInnerHTML={{ __html: title.html }} />
        <h3>{subtitle}</h3>
        <p>Written by {authors.map((author) => author.name).join(', ')}</p>
      </LeftText>
      {/* <GatsbyImage image={getImage(cover)} alt={title.text} /> */}
      <ResearchCover
        title={title.text}
        subtitle={subtitle}
        cover={cover}
      />
    </TopContent>
    </Container>
    </Wrapper>
    <BottomWrapper>
    <Container>
    <BottomContent>
      <SideBar>
        <div>
          <b>Table of Contents</b>
          <TOC data={toc} />
          {/* <Authors authors={authors} /> */}
          <p><b>{authorsBoxTitle}</b></p>
          <Authors authors={authors} />
         <p> <b>{grantProvidersBoxTitle}</b></p>
          <Grants organisations={grantProviders} />
         <p> <b>{relatedPapersToxTitle}</b></p>
          <RelatedPapers papers={relatedPapers} />
        </div>
      </SideBar>
      <Content>
       
        { abstract.length>0 && <Abstract abstract={abstract}/>}   
        <RichText render={content.raw} htmlSerializer={htmlSerializer} />
      {/* <div dangerouslySetInnerHTML={{ __html: content.html }} htmlSerializer={htmlSerializer} /> */}
      </Content>
    </BottomContent>
    </Container>
    </BottomWrapper>
  </div>
)};

Research.propTypes = {
  title: PropTypes.object.isRequired,
  cover: PropTypes.object.isRequired,
  subtitle: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
  authorsBoxTitle: PropTypes.string.isRequired,
  grantProvidersBoxTitle: PropTypes.string.isRequired,
  relatedPapersToxTitle: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  grantProviders: PropTypes.array.isRequired,
  relatedPapers: PropTypes.array.isRequired,
  toc: PropTypes.array.isRequired
};

export default Research;

const Container = styled.div`
width: 100%;
max-width: 1230px;
margin:0 auto;
padding:0 15px;
position: relative;
box-sizing: border-box;
`;
const Wrapper = styled.section`
background-color:#f7f7f7;
padding:18px 0 64px 0;
@media (max-width: 767px) {
  padding:18px 0 40px 0;
}
`;
const Return = styled.div`
font-size: 14px;
font-weight: bold;
color:#4E50F7;
a{
  color:#4E50F7;
}
@media (max-width: 895px) {
margin-bottom:16px;
}
`;
const TopContent = styled.div`
display:flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
padding-top:15px;
@media (max-width: 895px) {
  flex-direction: column;
  align-items: flex-start;
}
`;
const LeftText = styled.div`
padding-top:40px;
padding-right:64px;
@media (max-width: 1024px) {
  padding-top:0px; 
}
h1{
  line-height:58px;
}
h3{
  color:#4E50F7;
  margin-top:16px;
}
p{
  font-size: 12px;
  font-weight: bold;
  color:#999;
  line-height:16px;
}
@media (max-width: 1024px) {
  h1{
     font-size:40px;
     line-height:50px;
  }
}
@media (max-width: 960px) {
  h1{ 
    font-size:36px;
    line-height:46px;
  }
}
@media (max-width: 599px) {
  h1{ 
    font-size:32px;
    line-height:42px;
  }
}
@media (max-width: 359px) {
  h1{ 
    font-size:26px;
    line-height:33px;
  }
}
@media (max-width: 895px) {
padding-right:0px;
}
`;
const BottomWrapper = styled.section`
padding:128px 0 60px 0;
@media (max-width: 991px) {
  padding:70px 0;
}
@media (max-width: 767px) {
  padding:40px 0;
}
`;    
const BottomContent = styled.div`
display:flex;
@media (max-width: 895px) {
  flex-direction: column;
  align-items: flex-start;
}
`;
const SideBar = styled.div`
min-width:270px;
@media (max-width: 895px) {
  min-width:100%;
}
b{ 
  font-size:18px;
}
p{
 margin-bottom: 16px;
}
@media (max-width: 599px) {
  p b{ 
    font-size:18px;
  }
}
`;
const Content = styled.div`
padding-left:64px;
h5, h6{
  font-size:18px;
  line-height:26px;
  margin-bottom: 32px;
}
@media (max-width: 895px) {
  padding-left:0px;
}
@media (max-width: 599px) {
h2{
  font-size:24px;
}
h5, h6{
  margin-bottom: 20px;
}
}
`;
