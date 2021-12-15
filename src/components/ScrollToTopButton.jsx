import React from 'react';
import styled from "styled-components";

import ArrowUp from '../assets/icons/ArrowUp'

const ScrollToTopButton = () => {

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ScrollBtn
      onClick={scrollTop}
    >
      <ArrowUp fill="#4E50F7" />
    </ScrollBtn>
  );
};

const ScrollBtn = styled.button`
cursor: pointer;
box-sizing: border-box;
margin: 0px;
min-width: 0px;
appearance: none;
display: inline-flex;
-moz-box-align: center;
align-items: center;
-moz-box-pack: center;
justify-content: center;
padding: 4px;
width: 40px;
height: 40px;
color: inherit;
border-radius: 4px;
background-color: #fff;
position: fixed;
left: 8px;
bottom: 8px;
border: 2px solid #4E50F7;
z-index: 1000;
`;
export default ScrollToTopButton;
