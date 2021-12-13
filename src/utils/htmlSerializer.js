import React from 'react'
const PrismicDOM = require('prismic-dom');
const slugify = require('./slugify');

const { Elements } = PrismicDOM.RichText;

const propsWithUniqueKey = function (props, key) {
  return Object.assign(props || {}, { key })
}

// const htmlSerializer = ({ node, key, value }) => (
//   type,
//   element,
//   content,
//   children,
// ) => {
//   if (node.type !== 'research') return null;

//   switch (type) {
//     case Elements.heading2: {
//       return `<h2 id="${slugify(element.text)}">${children}</h2>`;
//     }
//     case Elements.heading3: {
//       return `<h3 id="${slugify(element.text)}">${children}</h2>`;
//     }

//     default:
//       return null;
//   }
// }

// module.exports = htmlSerializer;

const htmlSerializer = (type, element, content, children, key) => {
  const props = { className: 'codespan' }
  if(type==='heading2'){
    const heading2Html = `<h2 id="${slugify(element.text)}">${element.text}</h2>`;  
    return <div dangerouslySetInnerHTML={{ __html: heading2Html }} />
  }
  if(type==='heading3'){
    const heading3Html = `<h3 id="${slugify(element.text)}">${element.text}</h3>`;  
    return <div dangerouslySetInnerHTML={{ __html: heading3Html }} />
  }
  return null
}

export default htmlSerializer
