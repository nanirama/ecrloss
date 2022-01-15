import React, { useState } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import shortid from 'shortid';
import styled from "styled-components";

import { linkResolver } from '../../utils/linkResolver';

const renderButtons = (buttons) => {
  return buttons.map((button) => {
    const { action_label: actionLabel, action_url: actionURL } = button.primary;
    return actionURL.type ? (
      <a key={shortid.generate()} href={linkResolver(actionURL)}>{actionLabel || 'link'}</a>
    ) : (
      <a key={shortid.generate()} href={actionURL.url} target={actionURL.target}>
        {actionLabel || 'link'}
      </a>
    );
  });
};

const Header = ({ data }) => {
  const { logo, headerNavigation, headerBody } = data;
  const [isOpen, setIsOpen] = useState(false);
  const logoImg = getImage(logo)

  const handleClick = () => setIsOpen(!isOpen);
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Wrapper>
      <Container>
        <Link to="/">
          <GatsbyImage image={logoImg} />
        </Link>
      <Nav>
              <StyledBurger open={open} onClick={() =>
                 setOpen(!open)}>
                 <div />
                 <div />
                 <div />
              </StyledBurger>
              <Ul open={open}>
              {headerNavigation.map((item) => {
              const {
                label,
                link_url: linkURL,
                meganav: { document: meganavDoc },
              } = item;
                return(
                  <>
                  <li>
                      <Link
                      to={meganavDoc ? '/' : linkURL}
                      activeClassName="active"
                      partiallyActive={true}
                      >
                      {label}
                      {label === 'Resources' && (
                          <ul>
                            <li>
                              <Link to="/event">
                              Meetings</Link>
                            </li>
                            <li>
                              <Link to="/webinar">
                              Webinars</Link>
                            </li>
                            <li>
                              <Link to="/faq">
                              FAQs</Link>
                            </li>
                        </ul>
                      )}
                      </Link>
                  </li>
                  </>
                )
              })}
                 {/* <li>
                    <Link to='/research'>
                    Research</Link>
                 </li>
                 <li>
                    <Link to='/team'>
                    Team</Link>
                 </li>
                 <li>
                    <Link to='/event'>
                    Resources</Link>
                    <ul>
                       <li>
                          <Link to="/event">
                          Meetings</Link>
                       </li>
                       <li>
                          <Link to="/webinar">
                          Webinars</Link>
                       </li>
                       <li>
                          <Link to="/faq">
                          FAQs</Link>
                       </li>
                    </ul>
                 </li>
                 <li>
                    <Link to='/blog'>
                    Blog</Link>
                 </li> */}
              </Ul>
              <Button>
                 <Link to='https://ecr-shrink-group.us17.list-manage.com/subscribe?u=6023bad92de17c3cdf8bb689d&id=fe6105ee15'>
                 Join our mailing list
                 </Link>
              </Button>
           </Nav>
        </Container>
      </Wrapper>
      {/* <Flex>
          <Menu isOpen={isOpen} close={handleClick}>
            {headerNavigation.map((item) => {
              const {
                label,
                link_url: linkURL,
                meganav: { document: meganavDoc },
              } = item;
              return (
                <MenuItem
                  key={shortid.generate()}
                  dropdown={label === 'Resources'}
                >
                  <Link
                    to={meganavDoc ? '/' : linkURL}
                    title={label}
                    activeClassName="active"
                    partiallyActive={true}
                  >
                    {label}
                  </Link>
                  {label === 'Resources' && (
                    <SubMenu className="dropdown-content">
                      <MenuItem vertical>
                        <Link to="/event">Meetings</Link>
                      </MenuItem>
                      <MenuItem vertical>
                        <Link to="/webinar">Webinars</Link>
                      </MenuItem>
                      <MenuItem vertical>
                        <Link to="/faq">FAQs</Link>
                      </MenuItem>
                    </SubMenu>
                  )}
                </MenuItem>
              );
            })}
          </Menu>
          {renderButtons(headerBody)}
        </Flex>
      {renderButtons(headerBody)} */}
    </div>
  );
};

Header.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Header;
const Wrapper = styled.div`
padding:20px 15px;
position: relative;
z-index: 9999;

// min-height:100px;
`;
const Container = styled.div`
width:100%;
max-width: 1200px;
margin: 0 auto;
padding:0px;
display:flex;
justify-content:space-between;
box-sizing: border-box;
`;
const Nav = styled.nav`
padding: 0 0px;
display: flex;
justify-content: end;
place-items: center;
margin-top:-1px;
`;
const StyledBurger = styled.div`
width: 1.3rem;
height: 1.3rem;
position: absolute;
top:30px;
right: 30px;
z-index: 20;
display: none;
cursor: pointer;
  @media (max-width: 767px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
    z-index: 9999;
  }
div {
width: 1.35rem;
height: 0.15rem;
background-color: ${({ open }) => open ? '#3c3c3b' : '#3c3c3b'};
border-radius:0px;
transform-origin: 1px;
transition: all 0.3s linear;
  &:nth-child(1) {
    transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    top: 0px;
    position: ${({ open }) => open ? 'absolute' : 'absolute'};

  }
  &:nth-child(2) {
    transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
    opacity: ${({ open }) => open ? 0 : 1};
    top: 7px;
    position: ${({ open }) => open ? 'absolute' : 'absolute'};
  }
  &:nth-child(3) {
    transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    top:14px;
    position: ${({ open }) => open ? 'absolute' : 'absolute'};
  }
}
`;
const Ul = styled.ul`
list-style: none;
display: flex;
flex-flow: row nowrap;
margin:0px 0 0 0;
padding:0;
  li {
    padding: 0px 0px;
    margin:0 0 0 32px;
    position:relative;
      @media (max-width: 767px) {
        margin:0px 0 14px 0;
      }
      &:hover a, a.active{
        border-bottom:3px solid #4E50F7;
      }
      ul{
        display:none;
        @media (max-width: 767px) {
          display:block;
          list-style:none;
          padding:0px;
          margin:14px 0 0 0;
        }
        li{
          @media (max-width: 767px) {
            margin:14px 0 0 0;
          }
        }
      }
      &:hover ul{
        display:block;
        position:absolute;
        width:150px;
        list-style:none;
        box-shadow: rgba(0, 0, 0, 0.37) 0px 30px 50px -20px, rgba(0, 0, 0, 0.3) 0px 20px 30px -10px;
        padding:16px;
        z-index:999;
        background-color: #fff;
        @media (max-width: 767px) {
          position:inherit;
          box-shadow:inherit;
          background-color:inherit;
          padding:0px;
          width:100%;
        }
      }
      &:hover ul li{
        margin:0 0 14px 0;
      }
      &:hover ul li a{
        border-bottom:3px solid transparent;
        @media (max-width: 767px) {
          font-size:20px;
        }
      }
      &:hover ul li:last-child{
        margin:0;
        @media (max-width: 767px) {
          margin:5px 0 0 0;
        }
      }
      &:hover ul li a:hover{
        border-bottom:3px solid #4E50F7;
      }
  }
  @media (max-width: 767px) {
    flex-flow: column nowrap;
    background-color: #f9f9f9;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    inset: 0;
    // right: 0;
    // height: 100vh;
    width: 100%;
    padding:100px 0;
    transition: transform 0.3s ease-in-out;
    margin: 0;
    z-index:999;
    text-align: center;
    overflow-y: scroll;
  }
  a {
    text-decoration: none;
    color: #7A6B6B;
    font-size:14px;
    font-weight:700;
    border-bottom:3px solid transparent;
    @media (max-width: 767px) {
      font-size:24px;
    }
  }

  li ul li a{
    @media (max-width: 767px) {
      font-size:20px;
    }
  }
`;
const Button = styled.button`
padding:4px 16px;
color:#4E50F7;
background-color: transparent;
font-size: 14px;
line-height:26px;
font-weight:700;
border:2px solid #4E50F7;
cursor:pointer;
height:38px;
align-items: center;
display:flex;
margin-left:32px;
margin-top:0px;
a{
  color:#4E50F7;
}
  @media (max-width: 767px) {
    display:none;
  }
  &:hover{
    background-color: #4849C8;
    color:#fff;
  }
  &:hover a{
    color:#fff;
  }
`;