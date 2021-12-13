import React, { useState, useEffect } from 'react';
import Sidebar from "react-sidebar";
import styled from "styled-components";
import Img from 'gatsby-image';
// import {
//   jsx,
//   Close,
//   Input,
//   Textarea,
//   Spinner,
// } from 'theme-ui';
import { downloadFile } from '../../utils/download';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { InputField, TextareaField, SelectField } from '../fields';

const ContactFormSchema = Yup.object().shape({
    organisation: Yup.string()
      .min(1, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    industry: Yup.string()
      .min(1, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    // phone: Yup.string()
    //   .min(2, 'Too Short!')
    //   .max(50, 'Too Long!')
    //   .required('Required'),
    // comment: Yup.string()
    //   .min(1, 'Too Short!')
    //   .max(1000, 'Too Long!')
    //   .required('Required'),
  });

const SideBarContent = ({
    formId,
    dataLayerEvent,
    pageURL,
    downloadURL,
    sidebarOpen,
    onSetSidebarOpen
  }) => {
    const [working, setWorking] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


      const encode = (data) => {
        return Object.keys(data)
          .map(
            (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
          )
          .join('&');
      };
    
      const handleDownload = () => {
        let anchor = document.createElement('a');
    
        const filePath = downloadURL.url.replace(/^.*\/\/[^\/]+/, '');
    
        downloadFile(`/download${filePath}`).then((blob) => {
          let objectUrl = window.URL.createObjectURL(blob);
    
          anchor.href = objectUrl;
          anchor.download = downloadURL.url.split('/').pop();
          anchor.click();
    
          window.URL.revokeObjectURL(objectUrl);
        });
      };
    
      const renderContact = (contact) => {
        const { name, title, photoBig: photo } = contact.data;
        return (
          <Flex sx={{ my: 4, width: '100%', alignItems: 'center' }}>
            {photo && (
              <Img
                fixed={photo.localFile.childImageSharp.fixed}
                alt={name}
              />
            )}
            <Box>
              <Text variant="contact.name">{name}</Text>
              <Text variant="contact.title">{title}</Text>
            </Box>
          </Flex>
        );
      };
    return(
       <SideBarMainContent>
         <CloseBtn onClick={() => onSetSidebarOpen(!sidebarOpen)}>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentcolor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
  </CloseBtn>
           {success ? (
          <>
            <Text variant="contact.name">
              Your message has been sent, we will be in contact shortly.
            </Text>
            {downloadURL.url && (
              <>
                <Button
                  type="primary"
                  variant="primary"
                  href={downloadURL.url}
                  download={downloadURL.url.split('/').pop()}
                  onClick={handleDownload}
                >
                  Download
                </Button>
            
              </>
            )}
          </>
        ) : (
          <Formik
            initialValues={{
              organisation: '',
              name: '',
              email: '',
              industry: '',
            }}
            validationSchema={ContactFormSchema}
            onSubmit={async (values) => {
              setWorking(true);
              fetch('/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: encode({
                  'form-name': 'contact',
                  ...values,
                  pageURL,
                }),
              })
                .then(() => {
                  if (dataLayerEvent && typeof window !== 'undefined') {
                    let dataLayer = window.dataLayer = window.dataLayer || [];
                    dataLayer.push(dataLayerEvent);
                  }
                  setWorking(false);
                  setSuccess(true);
                  handleDownload();
                })
                .catch((error) => {
                  setWorking(false);
                  setErrorMessage(`We're sorry but something went wrong`);
                });
            }}
          >
            {({ handleSubmit }) => (
              <form
                id={formId}
                onSubmit={handleSubmit}
                name="contact"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                sx={{ width: '100%' }}
              >
                <input type="hidden" name="bot-field" />
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="page" />
                <Field
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  component={InputField}
                />
                <Field
                  id="organisation"
                  name="organisation"
                  type="text"
                  placeholder="Organisation"
                  component={InputField}
                />
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  component={InputField}
                />
                <Field
                  id="industry"
                  name="industry"
                  component={SelectField}
                >
                  <option value="" disabled hidden>Select industry sector</option>
                  <option value="Retailer">Retailer</option>
                  <option value="Product manufacturer">Product manufacturer</option>
                  <option value="Solution provider">Solution provider</option>
                  <option value="Academic/student">Academic/student</option>
                  <option value="Other">Other</option>
                </Field>
                {errorMessage && (
                  <p>
                    {errorMessage}
                  </p>
                )}
                {working ? (
                  <Spinner variant="styles.spinner" />
                ) : (
                  <Button
                    type="submit"
                    variant="outline"
                    disabled={working}
                  >
                    Send
                  </Button>
                )}
              </form>
            )}
          </Formik>
        )}
       </SideBarMainContent>
    )
}
const ResearchSidebar = ({
    formId,
    dataLayerEvent,
    pageURL,
    downloadURL,
  }) => {
     const [sidebarOpen, setSidebarOpen] = useState(false);

    const onSetSidebarOpen = (open) => {
        setSidebarOpen(open)
    }    
    return (
      <SideBarContainer
        >
    <Sidebar
        sidebar={(
            <>
            <button className="float-btn" onClick={() => onSetSidebarOpen(!sidebarOpen)}>
                Download
            </button>
            <SideBarContent
            formId = {formId}
            dataLayerEvent = {dataLayerEvent}
            downloadURL = {downloadURL}
            pageURL = {pageURL}
            sidebarOpen = {sidebarOpen}
            onSetSidebarOpen = {onSetSidebarOpen}
            />
            </>
        )}
        open={sidebarOpen}
        onSetOpen={onSetSidebarOpen}
        pullRight={true}
        styles={{ sidebar: { background: "white" } }}
      >
        {/* <button onClick={() => onSetSidebarOpen(!sidebarOpen)}>
          Open sidebar
        </button> */}
        
      </Sidebar>
        </SideBarContainer>
    );
}

export default ResearchSidebar;

const SideBarContainer = styled.div`
    div:nth-child(1) div:nth-child(1){
        position:fixed !important;
        background-color:#f7f7f7 !important;
        width:320px !important;
        max-width:100% !important;
        overflow:visible !important;
        padding:0px !important;
        @media (max-width:400px) {
          width:280px !important;
        }
        button.float-btn{
            margin-left:0px !important;
            transform: translateX(-100%) translateY(200%) rotate(-90deg) !important;
            display: inline-block !important;
            background-color: #4E50F7 !important;
            color: #fff !important;
            font-size: 14px !important;
            font-weight: bold !important;
            letter-spacing: 2px !important;
            padding: 16px 32px !important;
            text-transform: uppercase !important;
            transform: translateX(-100%) translateY(200%) rotate(-90deg) !important;
            transform-origin: 100% 100% 0px !important;
            text-align: center !important;
            border:none !important;
            font-family: 'Montserrat',sans-serif;
            cursor:pointer;
        }
    }
`;

const SideBarMainContent = styled.div`
    margin:0px !important;
    padding:0px 32px !important;
    overflow:hidden;
    @media (max-width:400px) {
      padding:0px 20px !important;
    }
`;
const Flex = styled.div`
width:100%;
display:flex;
align-items:center;
margin:10px 0;
`;
const Box = styled.div`
margin-left:10px;
`;
const Spinner = styled.div`
`;
const CloseBtn = styled.span`
width:100%;
cursor: pointer;
display: flex !important;
justify-content: flex-end !important;
margin-top:40px;
`;
const Text = styled.div`
display:inline-block;
margin-top: 64px;
`;
const Button = styled.button`
background-color: #4E50F7;
font-size: 14px;
color:#fff;
font-weight: bold;
border-radius: 0px;
border: none;
cursor:pointer;
width:100%;
padding:8px 16px;
display:inline-block;
text-transform:uppercase;
margin-top:20px;
`;