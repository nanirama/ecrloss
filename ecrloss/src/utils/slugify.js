const slugify = require('slugify');

module.exports = function (data) {
  return slugify(data, { lower: true, strict: true });
};
