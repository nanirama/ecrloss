import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { downloadFile } from '../utils/download';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { InputField, TextareaField, SelectField } from './fields';
const Flex = styled.div`

`;
const Box = styled.div`

`;
const Spinner = styled.div`

`;
const Button = styled.button`

`;
const Close = styled.button`

`;
const Text = styled.label`

`;

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

const Contact = ({
  formId,
  dataLayerEvent,
  status,
  toggle,
  pageURL,
  showToggle = true,
  person,
  downloadURL,
}) => {

  
  const [rightOpen, setRightOpen] = useState(false);
  const [working, setWorking] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
  }, [rightOpen])
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
            sx={{ borderRadius: '50%' }}
            fixed={photo.localFile.childImageSharp.fixed}
            alt={name}
          />
        )}
        <Box sx={{ ml: 3, flex: 1 }}>
          <Text variant="contact.name">{name}</Text>
          <Text variant="contact.title">{title}</Text>
        </Box>
      </Flex>
    );
  };

  return (
    <div
      className={status}
      sx={{
        position: 'fixed',
        width: ['100%', null, '320px'],
        top: 0,
        right: 0,
        bottom: 0,
        bg: 'bg.grey',
        color: 'text',
        zIndex: 100,
        transform: 'translateX(100%)',
        transition: 'transform 0.25s ease-in-out',
        '&.opened': {
          transform: 'translateX(0)',
        },
        boxShadow:
          status === 'opened' ? '-8px 0 16px 0px rgba(0,0,0,0.2)' : 'none',
      }}
    >
      {showToggle && <Toggle onClick={e=>setRightOpen(!rightOpen)} />}
      <SidePanel className="sidepanel" rightOpen={rightOpen}>
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </SidePanel>
      <div
        sx={{
          p: 4,
          top: 0,
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Flex sx={{ width: '100%', justifyContent: 'flex-end' }}>
          <Close onClick={toggle}/>
        </Flex>
        {person && renderContact(person)}
        {success ? (
          <>
            <Text variant="contact.name" sx={{ mt: 5 }}>
              Your message has been sent, we will be in contact shortly.
            </Text>
            {downloadURL.url && (
              <>
                <Button
                  // as="a"
                  type="primary"
                  variant="primary"
                  sx={{ mt: 3 }}
                  // href={downloadURL.url}
                  // download={downloadURL.url.split('/').pop()}
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
                  sx={{ mt: 3 }}
                />
                <Field
                  id="organisation"
                  name="organisation"
                  type="text"
                  placeholder="Organisation"
                  component={InputField}
                  sx={{ mt: 3 }}
                />
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  component={InputField}
                  sx={{ mt: 3 }}
                />
                <Field
                  id="industry"
                  name="industry"
                  component={SelectField}
                  sx={{ mt: 3 }}
                >
                  <option value="" disabled hidden>Select industry sector</option>
                  <option value="Retailer">Retailer</option>
                  <option value="Product manufacturer">Product manufacturer</option>
                  <option value="Solution provider">Solution provider</option>
                  <option value="Academic/student">Academic/student</option>
                  <option value="Other">Other</option>
                </Field>
                {errorMessage && (
                  <p sx={{ fontSize: 1, color: 'error', mt: 3 }}>
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
                    sx={{ width: '100%', mt: 4 }}
                  >
                    Send
                  </Button>
                )}
              </form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

Contact.propTypes = {
  formId: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  pageURL: PropTypes.string.isRequired,
};

export default Contact;

const Toggle = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    sx={{
      display: ['inline-block', 'inline-block', null],
      bg: 'accent',
      color: 'white',
      fontSize: 1,
      fontWeight: 'bold',
      letterSpacing: '2.0px',
      py: 3,
      px: [3, null, 4],
      textTransform: 'uppercase',
      transform: 'translateX(-100%) translateY(200%) rotate(-90deg)',
      transformOrigin: '100% 100%',
      textAlign: 'center',
    }}
  >
    Download
  </button>
);

Toggle.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const SidePanel = styled.div`
  background: ${props => props.rightOpen ? '250px' : '0px'};
  transform: translateX(100%),
  transition: transform 0.25s ease-in-out,
  position: fixed;
  z-index: 1;
  height: 250px;  
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
`;
