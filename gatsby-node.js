const path = require('path');
const moment = require('moment')
const _ = require(`lodash`);
const { paginate } = require(`gatsby-awesome-pagination`);

const query = require('./src/data/query');

const DEFAULT_BLOG_BASE_PATH = '/blog';
const DEFAULT_BLOG_POSTS_PER_PAGE = 6;

const promiseWrapper = (promise) =>
  promise.then((result) => {
    if (result.errors) {
      throw result.errors;
    }
    return result;
  });

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const templatesDir = path.resolve(__dirname, './src/templates');
  const templates = {
    page: path.resolve(templatesDir, 'PageTemplate.js'),
    research: path.resolve(templatesDir, 'ResearchTemplate.js'),
    researchList: path.resolve(templatesDir, 'ResearchListTemplate.js'),
    researchcategory: path.resolve(templatesDir, 'ResearchCategoryTemplate.js'),
    blog: path.resolve(templatesDir, 'BlogTemplate.js'),
    blogList: path.resolve(templatesDir, 'BlogListTemplate.js'),
    category: path.resolve(templatesDir, 'CategoryTemplate.js'),
    webinar: path.resolve(templatesDir, 'WebinarTemplate.js'),
    webinarList: path.resolve(templatesDir, 'WebinarListTemplate.js'),
    person: path.resolve(templatesDir, 'PersonTemplate.js'),
    event: path.resolve(templatesDir, 'EventTemplate.js'),
    eventList: path.resolve(templatesDir, 'EventListTemplate.js'),
    eventFuturePastList: path.resolve(templatesDir, 'EventFuturePastListTemplate.js'),
    eventPastList: path.resolve(templatesDir, 'EventPastListTemplate.js'),
    eventCategoryList: path.resolve(templatesDir, 'EventCategoryListTemplate.js'),
    question: path.resolve(templatesDir, 'QuestionTemplate.js'),
    questionList: path.resolve(templatesDir, 'QuestionListTemplate.js'),
    faq: path.resolve(templatesDir, 'FaqTemplate.js'),
  };

  const { data } = await graphql(`
    query {
        Pages: allPrismicPage {
          edges {
            node {
              uid
            }
          }
        }      
        Blogs: allPrismicBlog {
          edges {
            node {
              uid
              data {
                category {
                  uid
                  document {
                    ... on PrismicCategory {
                      data {
                        color
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
        Events: allPrismicEvent(sort: { fields: data___start_date, order: DESC }) {
          edges {
            node {
              id
              uid
              data {
                title {
                  text
                }
                description
                start_date
                end_date
                custom_date
                organiser
                city
                register_label
                register_url {
                  url
                  uid
                  type
                  target
                }
                category {
                  uid
                  document {
                    ... on PrismicCategory {
                      data {
                        color
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
        Research: allPrismicResearch {
          edges {
            node {
              uid
              data {
                category {
                  uid
                  document {
                    ... on PrismicCategory {
                      data {
                        color
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
        Questions: allPrismicQuestion {
            edges {
              node {
                uid
                data {
                  category {
                    uid
                    document {
                      ... on PrismicCategory {
                        data {
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          Persons: allPrismicPerson {
              edges {
                node {
                  uid
                }
              }
            }          
        Webinars: allPrismicWebinar {
          edges {
            node {
              uid
              data {
                category {
                  uid
                  document {
                    ... on PrismicCategory {
                      data {
                        color
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }   
      }         
    `)

    const basePath = DEFAULT_BLOG_BASE_PATH;
    const blogs = data.Blogs.edges;

    blogs.forEach(({ node }) => {     
      let { category: { uid: categoryPath } = {} } = node.data;
      let blogURL = categoryPath
        ? `${basePath}/${categoryPath}/${node.uid}`
        : `${basePath}/${node.uid}`;
  
      createPage({
        path: blogURL,
        component: templates.blog,
        context: {
          uid: node.uid,
          basePath,
        },
      });
    })

    let categories = [];

    _.each(blogs, (blog) => {
      if (_.get(blog, 'node.data.category.uid')) {
        categories = categories.concat(blog.node.data.category);
      }
    });

    categories = _.uniqWith(categories, _.isEqual);

    const postsPerPage = DEFAULT_BLOG_POSTS_PER_PAGE; 
    paginate({
      createPage,
      items: blogs,
      itemsPerPage: postsPerPage,
      itemsPerFirstPage: postsPerPage + 2,
      pathPrefix: basePath,
      component: templates.blogList,
      context: {
        basePath,
        paginationPath: basePath,
        categories,
      },
    });


    categories.forEach((cat) => {
      const blogsWithCat = blogs.filter(
        (blog) =>
          blog.node.data.category && blog.node.data.category.uid === cat.uid
      );
      const categoryPath = `${basePath}/${cat.uid}`;
  
      paginate({
        createPage,
        items: blogsWithCat,
        itemsPerPage: postsPerPage,
        pathPrefix: categoryPath,
        component: templates.category,
        context: {
          uid: cat.uid,
          basePath,
          paginationPath: categoryPath,
          categories,
        },
      });
    });

    const webinars =  data.Webinars.edges;
    paginate({
      createPage,
      items: webinars,
      itemsPerPage: postsPerPage,
      pathPrefix: '/webinar',
      component: templates.webinarList,
      context: {
        basePath: '/webinar',
        paginationPath: '/webinar',
      },
    });

    webinars.forEach(({ node }) => {
      let webinarURL = `webinar/${node.uid}`;
  
      createPage({
        path: webinarURL,
        component: templates.webinar,
        context: {
          uid: node.uid,
        },
      });
    });

    const faq =  data.Questions.edges;

    let faqCategories = [];

    _.each(faq, (question) => {
      if (_.get(question, 'node.data.category')) {
        faqCategories = faqCategories.concat(question.node.data.category);
      }
    });
  
    faqCategories = _.uniqWith(faqCategories, _.isEqual);
  
    faq.forEach(({ node }) => {
      let { category: { uid: categoryPath } = {} } = node.data;
      let questionURL = categoryPath
        ? `faq/${categoryPath}/${node.uid}`
        : `faq/${node.uid}`;
  
      createPage({
        path: questionURL,
        component: templates.question,
        context: {
          uid: node.uid,
          categories: faqCategories
        },
      });
    });
  
    faqCategories.forEach((cat) => {
      const categoryPath = `faq/${cat.uid}`;
  
      createPage({
        path: categoryPath,
        component: templates.questionList,
        context: {
          uid: cat.uid,
          categories: faqCategories
        },
      });
    });
  
    createPage({
      path: 'faq',
      component: templates.faq,
      context: {
        categories: faqCategories
      },
    });

    const pages = data.Pages.edges;

    pages.forEach(({ node }) => {
      let pageURL = node.uid;

      createPage({
        path: pageURL,
        component: templates.page,
        context: {
          uid: node.uid,
        },
      });
    });

    const personPages = data.Persons.edges;

    personPages.forEach(({ node }) => {
      let pageURL = `team/${node.uid}`;
  
      createPage({
        path: pageURL,
        component: templates.person,
        context: {
          uid: node.uid,
        },
      });
    });
  
    const researchPages =data.Research.edges;
    let researchCategories = [];
    researchPages.forEach(({ node }) => {
      let pageURL = `research/${node.uid}`;
  
      createPage({
        path: pageURL,
        component: templates.research,
        context: {
          uid: node.uid,
        },
      });

      
      _.each(researchPages, (item) => {
        if (_.get(item, 'node.data.category.uid')) {
          researchCategories = researchCategories.concat(item.node.data.category);
        }
      });
    });
    researchCategories = _.uniqWith(researchCategories, _.isEqual);
    paginate({
      createPage,
      items: researchPages,
      itemsPerPage: postsPerPage,
      pathPrefix: '/research',
      component: templates.researchList,
      context: {
        basePath: '/research',
        paginationPath: '/research',
        categories: researchCategories,
      },
    });

    researchCategories.forEach((cat) => {
      const researchesWithCat = researchPages.filter(
        (item) =>
          item.node.data.category && item.node.data.category.uid === cat.uid
      );
      const categoryPath = `research/${cat.uid}`;
  
      paginate({
        createPage,
        items: researchesWithCat,
        itemsPerPage: postsPerPage,
        pathPrefix: categoryPath,
        component: templates.researchcategory,
        context: {
          uid: cat.uid,
          basePath: '/research',
          paginationPath: categoryPath,
          categories: researchCategories,
        },
      });
    });

    // Past and Future events getting
    const events = data.Events.edges;
    let eventCategories = [];
    const PastEEvents = events.filter((item)=>{
      let EventMoment = moment() > moment(item.node.data.start_date);
      if(EventMoment===true)
      {
        return item;
      }
    });
    const FutureEvents = events.filter((item)=>{
      let EventMoment = moment() > moment(item.node.data.start_date);
      if(EventMoment===false)
      {
        return item;
      }
    });   

    // Event Single Page Generation
    events.forEach(({ node }) => {
      let eventURL = `event/${node.uid}`;
      createPage({
        path: eventURL,
        component: templates.event,
        context: {
          uid: node.uid,
        },
      });
      _.each(events, (item) => {
        if (_.get(item, 'node.data.category.uid')) {
          eventCategories = eventCategories.concat(item.node.data.category);
        }
      });
    });

    eventCategories = _.uniqWith(eventCategories, _.isEqual);
    // Event Listing Page Generation
    paginate({
      createPage,
      items: events,
      itemsPerPage: postsPerPage,
      pathPrefix: '/event',
      component: templates.eventList,
      context: {
        basePath: '/event',
        paginationPath: '/event',
        categories: eventCategories,
      },
    });  

    const fposts = _.cloneDeep(FutureEvents);
    const numfPages = Math.ceil(fposts.length / postsPerPage)
    Array.from({ length: numfPages }).forEach((_, i) => {
      createPage({
        path: `/event/future/${i === 0 ? "" : i + 1}`,
        component: templates.eventFuturePastList,
        context: {
          basePath: '/event',
          paginationPath: '/event/future/',
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages: numfPages,
          currentPage: i + 1,
          categories: eventCategories,
          data : FutureEvents.slice(i*postsPerPage,(i + 1)*postsPerPage)
        },
      })
    });



    const pposts = _.cloneDeep(PastEEvents);
    const numpPages = Math.ceil(pposts.length / postsPerPage)
    Array.from({ length: numpPages }).forEach((_, i) => {
      createPage({
        path: `/event/past/${i === 0 ? "" : i + 1}`,
        component: templates.eventFuturePastList,
        context: {
          basePath: '/event',
          paginationPath: '/event/past/',
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages: numpPages,
          currentPage: i + 1,
          categories: eventCategories,
          data : PastEEvents.slice(i*postsPerPage,(i + 1)*postsPerPage)
        },
      })
    });
    let numffPages = 0;
    eventCategories.forEach((cat) => {
      const feventWithCat = fposts.filter(
        (item) =>
          item.node.data.category && item.node.data.category.uid === cat.uid
      );
      const categoryPath = `/event/future/${cat.uid}`;
        numffPages = Math.ceil(feventWithCat.length / postsPerPage)
        Array.from({ length: numfPages }).forEach((_, i) => {
          createPage({
            path: `${categoryPath}/${i === 0 ? "" : i + 1}`,
            component: templates.eventFuturePastList,
            context: {
              basePath: '/event',
              paginationPath: `${categoryPath}/`,
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages: numffPages,
              currentPage: i + 1,
              categories: eventCategories,
              data : feventWithCat.slice(i*postsPerPage,(i + 1)*postsPerPage)
            },
          })
        }); 
    });

    let numppPages = 0

    eventCategories.forEach((cat) => {
      const peventWithCat = pposts.filter(
        (item) =>
          item.node.data.category && item.node.data.category.uid === cat.uid
      );
      const categoryPath = `/event/past/${cat.uid}`;


        numppPages = Math.ceil(peventWithCat.length / postsPerPage)
        Array.from({ length: numppPages }).forEach((_, i) => {
          createPage({
            path: `${categoryPath}/${i === 0 ? "" : i + 1}`,
            component: templates.eventFuturePastList,
            context: {
              basePath: '/event',
              paginationPath: `${categoryPath}/`,
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages: numppPages,
              currentPage: i + 1,
              categories: eventCategories,
              data : peventWithCat.slice(i*postsPerPage,(i + 1)*postsPerPage)
            },
          })
        });
    });
};


// eventCategories = _.uniqWith(eventCategories, _.isEqual);

//     eventCategories.forEach((cat) => {
//       const eventWithCat = events.filter(
//         (item) =>
//           item.node.data.category && item.node.data.category.uid === cat.uid
//       );
//       const categoryPath = `/event/${cat.uid}`;
  
//       paginate({
//         createPage,
//         items: eventWithCat,
//         itemsPerPage: postsPerPage,
//         pathPrefix: categoryPath,
//         component: templates.eventCategoryList,
//         context: {
//           uid: cat.uid,
//           basePath: '/event',
//           paginationPath: categoryPath,
//           categories: eventCategories,
//         },
//       });
//     });
