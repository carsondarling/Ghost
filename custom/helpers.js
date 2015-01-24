var hbs = require('express-hbs');

module.exports = function(){  
  hbs.registerHelper('safe', function (options) {
    var content = options.fn(this);
    content = content.replace(/["\\]/gi, '\\$&');
    content = content.replace(/\n/gi, '\\n');
    content = content.replace(/\t/gi, '\\t');
    return new hbs.handlebars.SafeString(content);
    // return content;
  });

  hbs.registerHelper('cleanJSON', function(options) {
    var content = options.fn(this);
    content = content.replace(/\n\s*/gi, '');
    return content;
  });
};