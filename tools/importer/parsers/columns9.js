/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid of columns in the footer
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Get the immediate children—these are the columns
  const columns = Array.from(mainGrid.children);
  if (!columns.length) return;

  // Header row: must be exactly one cell as per the example
  const headerRow = ['Columns (columns9)'];

  // Content row: one cell for each column
  const contentRow = [...columns];

  // Must be an array of arrays: header (one cell), then content row (N cells)
  const tableData = [headerRow, contentRow];

  // Create the structured block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
