module.exports.data = {
  research: `{
    allPrismicResearch {
      edges {
        node {
          uid
        }
      }
    }
  }
`,
  page: `{
    allPrismicPage {
      edges {
        node {
          uid
        }
      }
    }
  }
`,
  blog: `{
    allPrismicBlog {
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
  }`,
  webinar: `{
    allPrismicWebinar {
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
  }`,
  person: `{
    allPrismicPerson {
      edges {
        node {
          uid
        }
      }
    }
  }`,
  event: `{
    allPrismicEvent {
      edges {
        node {
          uid
        }
      }
    }
  }`,
  question: `{
    allPrismicQuestion {
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
  }`,
};
