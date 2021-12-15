import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import Header from './Header';
import Footer from './Footer';
import GlobalStyle from '../../layout/globalStyles';



const Layout = ({ headerData, footerData, children, location, bgcolor='#ffffff' }) => {

  return (
      <>   
      <GlobalStyle />   
      <Header data={headerData}/>
      <div>
        {children}
      </div>
      <Footer data={footerData}/>
      </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  headerData: PropTypes.object.isRequired,
  footerData: PropTypes.object.isRequired,
};

export default Layout;

//background-color: ${bgcolor};