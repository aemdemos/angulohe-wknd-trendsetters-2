/* global WebImporter */
export default function parse(element, { document }) {
  // The structure requires first row to be single header cell,
  // and second row to have as many columns as content (here: images)

  // Find the grid containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Each immediate child of the grid is a column
  const columnDivs = Array.from(grid.children);

  // For each column, extract all relevant content (typically just the image, but if more exists, include it)
  const contentCells = columnDivs.map(colDiv => {
    // Get all direct children of the column that may be meaningful
    // In provided HTML it's a single div, so take all children
    const content = Array.from(colDiv.children).map(child => child);
    // If only a single element, use that. Otherwise, use array of elements.
    if (content.length === 1) {
      return content[0];
    }
    return content;
  });

  // Build table rows:
  // First row: header row (single cell)
  // Second row: N cells, one for each column of content
  const tableRows = [
    ['Columns (columns16)'],
    contentCells
  ];

  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
