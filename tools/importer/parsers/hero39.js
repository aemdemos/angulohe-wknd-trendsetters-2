/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: BLOCK NAME, must match the example
  const headerRow = ['Hero (hero39)'];

  // --- Extract background image (single img, not a link)
  // Find an img inside element (background): prefer first img with src
  let imgEl = null;
  const imgs = element.querySelectorAll('img');
  if (imgs.length > 0) {
    imgEl = imgs[0];
  }
  const imageRow = [imgEl]; // If no img, value will be null

  // --- Extract rich text content (headline, para, CTA)
  // Structure: element > ... > content block
  // Look for the text content container (usually deepest grid cell with headings, paragraphs, buttons)
  let contentArea = null;
  // Try: find the container with a heading inside
  const candidates = element.querySelectorAll(':scope div');
  for (const div of candidates) {
    if (div.querySelector('h1')) {
      contentArea = div;
      break;
    }
  }
  // Fallback to element itself if no contentArea found
  if (!contentArea) contentArea = element;
  // Collect all heading, paragraph, and button(s) in contentArea
  const textElements = [];
  const heading = contentArea.querySelector('h1');
  if (heading) textElements.push(heading);
  const para = contentArea.querySelector('p');
  if (para) textElements.push(para);
  // Find button links (CTA)
  const buttons = contentArea.querySelectorAll('a');
  if (buttons.length) {
    textElements.push(...buttons);
  }
  const contentRow = [textElements];

  // Compose the table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace element in DOM
  element.replaceWith(block);
}
