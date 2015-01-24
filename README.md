# Ghost for JSON

This repository is a fork of Ghost with the minimum set of changes in order to have Ghost provide a consumable JSON API. It is designed to run with [GhostJSON](https://github.com/carsondarling/GhostJSON) as the theme.

The current list of changes:

- Added two Handlebars helpers
  - `safe`: Escape HTML for embedding into JSON
  - `cleanJSON`: Remove excess whitespace from "pretty" JSON
- Add appropriate headers to frontend pages
  - `Content-Type: application/json`
  - `Access-Control-Allow-Origin: *`

This fork is based off of the stable branch of Ghost.

## Running

Currently, the easiest way to run this fork is cloning from Github. Follow the official Ghost [instructions](https://github.com/TryGhost/Ghost#install-from-git), but make sure you're on the correct branch.

## Issues

If you run across any issues, or have a cleaner way of providing the needed features, please let me know! I'm in the process of dog-fooding this, so we should be close.

## Diff

```
diff --git a/core/server/controllers/frontend.js b/core/server/controllers/frontend.js
index 4f3abcb..52058d3 100644
--- a/core/server/controllers/frontend.js
+++ b/core/server/controllers/frontend.js
@@ -176,6 +176,8 @@ frontendControllers = {
                     }
 
                     setResponseContext(req, res);
+                    res.set('Content-Type', 'application/json');
+                    res.set('Access-Control-Allow-Origin', '*');
                     res.render(view, formatPageResponse(posts, page));
                 });
             });
@@ -231,6 +233,8 @@ frontendControllers = {
                         return next();
                     }
                     setResponseContext(req, res);
+                    res.set('Content-Type', 'application/json');
+                    res.set('Access-Control-Allow-Origin', '*');
                     res.render(view, result);
                 });
             });
@@ -287,6 +291,8 @@ frontendControllers = {
                     }
 
                     setResponseContext(req, res);
+                    res.set('Content-Type', 'application/json');
+                    res.set('Access-Control-Allow-Origin', '*');
                     res.render(view, result);
                 });
             });
@@ -362,7 +368,8 @@ frontendControllers = {
                             response = formatResponse(post);
 
                         setResponseContext(req, res, response);
-
+                        res.set('Content-Type', 'application/json');
+                        res.set('Access-Control-Allow-Origin', '*');
                         res.render(view, response);
                     });
                 });
diff --git a/custom/helpers.js b/custom/helpers.js
new file mode 100644
index 0000000..de32939
--- /dev/null
+++ b/custom/helpers.js
@@ -0,0 +1,18 @@
+var hbs = require('express-hbs');
+
+module.exports = function(){  
+  hbs.registerHelper('safe', function (options) {
+    var content = options.fn(this);
+    content = content.replace(/["\\]/gi, '\\$&');
+    content = content.replace(/\n/gi, '\\n');
+    content = content.replace(/\t/gi, '\\t');
+    return new hbs.handlebars.SafeString(content);
+    // return content;
+  });
+
+  hbs.registerHelper('cleanJSON', function(options) {
+    var content = options.fn(this);
+    content = content.replace(/\n\s*/gi, '');
+    return content;
+  });
+};
\ No newline at end of file
diff --git a/index.js b/index.js
index 29b5fd7..22f9094 100644
--- a/index.js
+++ b/index.js
@@ -15,6 +15,9 @@ express = require('express');
 ghost = require('./core');
 errors = require('./core/server/errors');
 
+// Custom helpers
+require('./custom/helpers')();
+
 // Create our parent express app instance.
 parentApp = express();
```