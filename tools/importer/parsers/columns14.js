/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container which holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid
  const children = Array.from(grid.children);

  // For columns14, combine all block content into a single row with two cells (columns)
  // Each cell should contain a block of related content per visual column
  // In this HTML, first child is heading, second is right content (paragraph + button)

  // Header row, one column, matches example exactly
  const headerRow = ['Columns (columns14)'];

  // Only include cells if there is actual content
  const contentRow = [];
  if (children.length >= 2) {
    contentRow.push(children[0], children[1]);
  } else if (children.length === 1) {
    contentRow.push(children[0]);
  }

  // Only create table if there's content to show
  if (contentRow.length === 0) return;

  const cells = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
