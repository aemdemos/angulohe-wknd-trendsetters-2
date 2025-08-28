/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid that holds the columns structure
  const grid = element.querySelector('.grid-layout');
  let columns = [];
  if (grid) {
    // Get all direct children of the grid (columns)
    const children = Array.from(grid.children);
    // The image column
    const imgCol = children.find(child => child.tagName === 'IMG');
    // The content column (everything that's not the image)
    const contentCol = children.find(child => child !== imgCol);
    // Reference existing column elements
    if (imgCol) columns.push(imgCol);
    if (contentCol) columns.push(contentCol);
  } else {
    // Fallback: treat all direct children of element as columns
    columns = Array.from(element.children);
  }

  // Table header row matches spec
  const cells = [
    ['Columns (columns32)'],
    columns
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
