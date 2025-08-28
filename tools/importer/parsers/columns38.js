/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell, as required
  const headerRow = ['Columns (columns38)'];

  // Find all immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, get the image element (as in the source)
  const columnCells = columns.map(col => {
    const img = col.querySelector('img');
    return img || '';
  });

  // Compose the table: header as a single cell, then images as one row with multiple cells
  const cells = [headerRow, columnCells];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
