const handlers = require("./handlers.js");

const router = (req, res) => {
  const url = req.url;
  const method = req.method;

  // changing location.href does not log out the url here - only on the front end
  // - tests folder does not log out here. Maybe because tests.js is not run with node
  // - looked for server side routing on hashchange (adding # to url. No joy)
  // console.log(url);
  // console.log(method);


  if (url === "/") {
    handlers.handleHomeRoute(req, res);
  }
  // else if (url === "/coTechRequest") { in office, can get API
  else if (url === "/src") {
    handlers.handleCoTechRequest(req, res);
  }

  // trying to handle json call on server side, and circumvent CORS
  // else if (url.includes('/#service')) { 
  //   handlers.handleWikiRequest(req, res); 
  // }

  // listen for post method
  else if (method === "POST" && url.includes('/search')) { 
    handlers.handleWikiRequest(req, res, url);
  }

  else if (url.indexOf("public") !== -1) {
    handlers.handlePublic(req, res, url);
  }
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(`404 File Not found`);
  }
};

module.exports = router;
