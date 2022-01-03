import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import { Link, navigate } from 'gatsby';
import ArrowDown from '../../assets/icons/ArrowDown'

import styled from "styled-components";

const Dropdown = ({ items, path }) => {
  const selected = items.find((item) => item.path === path);
  return (
    <Flex>
      <Text>Browse</Text>
      <FlexDiv>
        <span>
          {selected ? selected.name : 'Everything'}
        </span>
        <Links className="dropdown-content">
          {items.map((item) => (
            <li key={shortid.generate()}>
              <Link
                to={item.path}>
                {item.name}
              </Link>
            </li>
          ))}
        </Links>
      </FlexDiv>
      <ArrowDown />
    </Flex>
  );
};

export default Dropdown;


const Flex = styled.div`
padding:19px 0;
display:flex;
flex-direction:row;
span{
  font-size: 14px;
  font-weight: bold;
  padding:0px 16px;
  color:#4E50F7;line-height: 28px;
}
svg{
  display:inline-block;
  margin-top:10px;
}
`;
const FlexDiv = styled.div`
&:hover .dropdown-content {
  display: block;
}
`;

const Text = styled.div`
display:inline-block;
font-size: 14px;
font-weight: bold;
padding:7px 0;
line-height: 14px;
`;
const Links = styled.ul`
background-color: #fff;
font-size: 14px;
font-weight: bold;
list-style: none;
display: none;
position: absolute;
min-width: 200px;
box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
padding:16px;
z-index: 100;
margin:0;
li{
  &:hover a{
    color:#4E50F7;
  }
}
a{
  display: block;
padding-top: 8px;
padding-bottom: 8px;
color:grey;
}
`;