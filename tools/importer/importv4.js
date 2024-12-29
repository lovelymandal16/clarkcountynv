/* global WebImporter */

export default {
  transform: ({
    // eslint-disable-next-line no-unused-vars
    document,
    url,
  }) => {
    const main = document.body;
    const results = [];

    // main page import - "element" is provided, i.e. a docx will be created
    results.push({
      element: main,
      path: new URL(url).pathname,
    });

    // find pdf links
    main.querySelectorAll('a').forEach((a) => {
      const href = a.getAttribute('href');
      if (href && href.endsWith('.pdf')) {
        const u = new URL(href, url);
        const newPath = WebImporter.FileUtils.sanitizePath(u.pathname);
        // eslint-disable-next-line max-len
        // no "element", the "from" property is provided instead - importer will download the "from" resource as "path"
        results.push({
          path: newPath,
          from: u.toString(),
        });

        // update the link to new path on the target host
        // this is required to be able to follow the links in Word
        // you will need to replace "main--repo--owner" by your project setup
        const newHref = new URL(newPath, 'https://main--repo--owner.hlx.page').toString();
        a.setAttribute('href', newHref);
      }
    });

    return results;
  },
};
