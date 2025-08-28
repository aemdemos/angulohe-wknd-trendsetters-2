/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Columns (columns1)'];

  // Find the grid container which has the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get columns: direct children of .grid-layout
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Each cell is the original column element (do not clone)
  const cellsRow = columns.map(col => col);

  // Compose cells array for the table
  const cells = [headerRow, cellsRow];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
