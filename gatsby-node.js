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
    blog: path.resolve(templatesDir, 'BlogTemplate.js'),
    blogList: path.resolve(templatesDir, 'BlogListTemplate.js'),
    category: path.resolve(templatesDir, 'CategoryTemplate.js'),
    webinar: path.resolve(templatesDir, 'WebinarTemplate.js'),
    webinarList: path.resolve(templatesDir, 'WebinarListTemplate.js'),
    person: path.resolve(templatesDir, 'PersonTemplate.js'),
    event: path.resolve(templatesDir, 'EventTemplate.js'),
    eventList: path.resolve(templatesDir, 'EventListTemplate.js'),
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
        Events: allPrismicEvent {
            edges {
              node {
                uid
                data {
                  startDate: start_date
                }
              }
            }
        }
        Research: allPrismicResearch {
            edges {
              node {
                uid
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

    const events = data.Events.edges;


    paginate({
      createPage,
      items: events,
      itemsPerPage: postsPerPage,
      pathPrefix: '/event',
      component: templates.eventList,
      context: {
        basePath: '/event',
        paginationPath: '/event',
      },
    });  
    let pastEvents = []
    let futureEvents = []
    events.forEach(({ node }) => {
      let eventURL = `event/${node.uid}`;

      const isPast = moment() > moment(node.data.startDate);
      if(isPast){
        pastEvents.push(node)
      }
      else
      {
        futureEvents.push(node)
      }
  
      createPage({
        path: eventURL,
        component: templates.event,
        context: {
          uid: node.uid,
        },
      });
    });
    if(pastEvents.length>0){
      paginate({
        createPage,
        items: pastEvents,
        itemsPerPage: postsPerPage,
        pathPrefix: '/event/past',
        component: templates.eventList,
        context: {
          basePath: '/event',
          paginationPath: '/event/past',
        },
      });  
    }
    if(futureEvents.length>0){
      paginate({
        createPage,
        items: futureEvents,
        itemsPerPage: postsPerPage,
        pathPrefix: '/event/future',
        component: templates.eventList,
        context: {
          basePath: '/event',
          paginationPath: '/event/future',
        },
      });  
    }
    
    

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

    paginate({
      createPage,
      items: researchPages,
      itemsPerPage: postsPerPage,
      pathPrefix: '/research',
      component: templates.researchList,
      context: {
        basePath: '/research',
        paginationPath: '/research',
      },
    });

    researchPages.forEach(({ node }) => {
      let pageURL = `research/${node.uid}`;
  
      createPage({
        path: pageURL,
        component: templates.research,
        context: {
          uid: node.uid,
        },
      });
    });
  

};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /@mapbox|mapbox-gl/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}