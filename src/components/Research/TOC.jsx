import React from 'react';
import slugify from '../../utils/slugify';

import styled from "styled-components";

const TOC = ({ data }) => {
  const SummaryDoc = {
    "type": "heading2",
    "text": "Abstract"
  }
  data.unshift(SummaryDoc);
  return(
  <Links>
    {data.map((item) => (
      <li className={item.type === 'heading3' ? 'heading3' : 'heading2'}>
        {item.type === 'heading3' ? '- ' : ''}
        <a href={`#${slugify(item.text)}`}>{item.text}</a>
      </li>
    ))}
  </Links>
)};

export default TOC;

const Links = styled.ul`
list-style:none;
padding:0;
margin-bottom: 64px;
li.heading2{
  line-height:20px;
  margin-bottom: 4px;
  &:hover a{
    color: #4E50F7;
  }
  a{
    color:#7A6B6B;
    font-weight:bold;
    font-size:14px;
  }
}
li.heading3{
  line-height:20px;
  margin-left: 16px;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: normal;
  &:hover a{
    color: #4E50F7;
  }
  a{
    color:#7A6B6B;
    font-weight:normal !important;
    font-size:14px;
  }
}



@media (max-width: 767px) {
  margin-bottom: 30px;
}
`;