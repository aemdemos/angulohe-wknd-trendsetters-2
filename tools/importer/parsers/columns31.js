/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct column children
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Ensure header row has exactly one cell, matching the example
  const headerRow = ['Columns (columns31)'];

  // Second row: each column element as a cell
  const contentRow = columns.map((col) => col);

  // Build the cells array for the block table
  const cells = [headerRow, contentRow];

  // Create the table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
