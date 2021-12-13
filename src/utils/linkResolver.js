const linkResolver = (doc) => {
  if (doc.type === 'home') {
    return '/';
  }
  if (doc.type === 'blog_home') {
    return '/blog';
  }
  if (doc.type === 'blog') {
    return doc.data && doc.data.category ? `/blog/${doc.data.category.uid}/${doc.uid}` : `/blog/${doc.uid}`;
  }
  if (doc.type === 'page') {
    return `/${doc.uid}`;
  }
  if (doc.type === 'research') {
    return `/research/${doc.uid}`;
  }
  if (doc.type === 'event') {
    return `/event/${doc.uid}`;
  }
  if (doc.type === 'webinar') {
    return `/webinar/${doc.uid}`;
  }
  if (doc.type === 'person') {
    return `/team/${doc.uid}`;
  }
  return '/';
};

module.exports = linkResolver;
