/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header matches example exactly
  const headerRow = ['Hero (hero28)'];

  // 2. Extract image for background
  let imgEl = null;
  // Source HTML puts image inside first grid child, with .cover-image class
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (grid) {
    const gridChildren = grid.querySelectorAll(':scope > div');
    if (gridChildren.length > 0) {
      imgEl = gridChildren[0].querySelector('img.cover-image');
    }
  }
  const imageRow = [imgEl ? imgEl : ''];

  // 3. Extract headline, subheading, CTA, and all text content from content container
  let textContent = [];
  // Second grid child is the content area
  let contentEl = null;
  if (grid && grid.querySelectorAll(':scope > div').length > 1) {
    contentEl = grid.querySelectorAll(':scope > div')[1];
  }
  if (contentEl) {
    // Gather all child elements of contentEl
    // .utility-margin-bottom-6rem contains h1 and button group
    const contentBlocks = contentEl.querySelectorAll(':scope > *');
    contentBlocks.forEach(block => {
      // Only add block if it has text or relevant children
      if (block && (block.textContent.trim() || block.querySelector('img,a,button'))) {
        textContent.push(block);
      }
    });
  }
  // If no content, fallback to empty string
  const contentRow = [textContent.length ? textContent : ''];

  // 4. Compose table structure
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  // 5. Create block table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
