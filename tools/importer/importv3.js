/* global WebImporter */
const createMetadataBlock = (main, document) => {
  const meta = {};

  // find the <title> element
  const title = document.querySelector('title');
  if (title) {
    meta.Title = title.innerHTML.replace(/[\n\t]/gm, '');
  }

  // find the <meta property="og:description"> element
  const desc = document.querySelector('[property="og:description"]');
  if (desc) {
    meta.Description = desc.content;
  }

  // find the <meta property="og:image"> element
  const img = document.querySelector('[property="og:image"]');
  if (img) {
    // create an <img> element
    const el = document.createElement('img');
    el.src = img.content;
    meta.Image = el;
  }

  // helper to create the metadata block
  const block = WebImporter.Blocks.getMetadataBlock(document, meta);

  // append the block to the main element
  main.append(block);

  // returning the meta object might be usefull to other rules
  return meta;
};

export default {
  transform: ({ document, params }) => {
    const main = document.querySelector('main');

    const listOfAllImages = [...main.querySelectorAll('img')].map((img) => img.src);
    const listOfAllMeta = [...document.querySelectorAll('meta')].map((meta) => {
      const name = meta.getAttribute('name') || meta.getAttribute('property');
      if (name) {
        return { name, content: meta.content };
      }
      return null;
    }).filter((meta) => meta);
    createMetadataBlock(main, document);

    return [{
      element: main,
      path: new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
      report: {
        title: document.title,
        'List of images': listOfAllImages,
        metadata: listOfAllMeta,
      },
    }];
  },
};
