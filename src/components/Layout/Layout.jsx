import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

import styled from "styled-components";

const Layout = ({ headerData, footerData, children, location, bgcolor='#ffffff' }) => {

  return (
      <>      
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