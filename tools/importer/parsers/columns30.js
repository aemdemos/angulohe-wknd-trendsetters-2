/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout, .w-layout-grid');
  if (!grid) return;

  // Get the immediate children of the grid (the columns)
  const columns = Array.from(grid.children);

  // Build the table header as a single cell only!
  const headerRow = ['Columns (columns30)'];

  // Build the row with one cell per column
  const contentRow = columns.map(col => col);

  // Table should be: 1 header row (single cell), then 1 row with n columns
  const tableCells = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original section element with the new block table
  element.replaceWith(blockTable);
}
