/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the columns
  const grid = element.querySelector('.w-layout-grid');
  let columns = [];
  if (grid) {
    // Get only immediate column items (direct children)
    const items = grid.querySelectorAll(':scope > div');
    if (items.length > 0) {
      columns = Array.from(items);
    }
  }
  
  // If we couldn't find columns, fallback to using the element itself (edge case)
  if (columns.length === 0) {
    columns = [element];
  }

  // Compose the table header exactly
  const headerRow = ['Columns (columns3)'];

  // Compose the content row: one cell per column
  // Reference the actual column elements (do not clone)
  const contentRow = columns;

  // Create the cells array for the block table
  const cells = [headerRow, contentRow];

  // Use WebImporter helper to create the table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
