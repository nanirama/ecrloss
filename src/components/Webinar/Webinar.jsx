

import React from 'react';
import LinkList from './LinkList';

import styled from "styled-components";

const renderLink = (item) => {
  const { label, link_url: link } = item;
  return (
    <a href={link.url} target={link.target} sx={{ color: 'menu.grey' }}>
      {label}
    </a>
  );
};

const renderFile = (item) => {
  const { label, file } = item;
  return (
    <a href={file.url} target="_blank" sx={{ color: 'menu.grey' }}>
      {label}
    </a>
  );
};

const Webinar = ({ document, children }) => {
  const { files, links } = document;

  const normalizedLinks = links.filter((link) => link.link_url.url && link.link_url.url.length > 0);
  const normalizedFiles = files.filter((file) => file.file.url && file.file.url.length > 0);
  return (
    
    <Container>
      <Flex
      
      >
        {/* <Box as="aside">
          <div>
            {normalizedLinks.length > 0 && (
              <>
                <p>Links</p>
                <LinkList items={normalizedLinks} renderItem={renderLink} />
                
              </>
            )}
            {normalizedFiles.length > 0 && (
              <>
                <p>Files</p>
                <Links>
                <LinkList items={files} renderItem={renderFile} />
                </Links>
              </>
            )}
          </div>
        </Box> */}
        <Aside></Aside>

        <Box as="main">
          {children}
        </Box>
      </Flex>
      
    </Container>
    
  );
};

export default Webinar;

const Container = styled.div`
max-width:1000px;
margin:0px auto;
`;
const Flex = styled.div`
padding:64px 0 30px 0;
flex-direction:row;
display:flex;
  @media (max-width:767px){
    padding:0;
  }
`;
const Box = styled.div`
p{
  font-weight:700; 
  margin-bottom:15px;
}
`;
const Links = styled.div`
ul{
  padding:0;
}
a{
  color:#7A6B6B;
}
`;
const Aside = styled.div`
flex-basis: 300px;
  @media (max-width:768px){
    display:none;
  }
  `;