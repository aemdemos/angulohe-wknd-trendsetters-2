/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: Must be exactly 'Hero (hero5)'
  const headerRow = ['Hero (hero5)'];

  // Find the image in the grid -- the hero image (background or main visual)
  let imageEl = null;
  // The img is a child of the main grid
  imageEl = element.querySelector('img');

  // Image row: Optional, but in this HTML it is present
  const imageRow = [imageEl];

  // Find the main content (headline, text, CTAs)
  // The first grid child (div.grid-layout.container) -> has another div inside (the content block)
  let textBlock = null;
  const gridDiv = element.querySelector('div.grid-layout.container');
  if (gridDiv) {
    // The only (or first) child is the text area
    textBlock = gridDiv.querySelector('div.section');
  }

  let textElements = [];
  if (textBlock) {
    // 1. Heading (h2)
    const heading = textBlock.querySelector('h2');
    if (heading) textElements.push(heading);
    // 2. Paragraph (rich text)
    const paragraphDiv = textBlock.querySelector('.rich-text, .w-richtext');
    if (paragraphDiv) textElements.push(paragraphDiv);
    // 3. Button group (CTAs)
    const buttonGroup = textBlock.querySelector('.button-group');
    if (buttonGroup) textElements.push(buttonGroup);
  }
  // Compose row for text content. All in a single cell.
  const textRow = [textElements];

  // Compose the block table: 1 column, 3 rows as specified
  const cells = [
    headerRow,
    imageRow,
    textRow
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
