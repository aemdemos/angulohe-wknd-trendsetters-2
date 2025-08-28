/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid which holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);
  // We expect: [left text block, contact list, image]
  // But their order could differ, so we detect by tag and class
  let leftContent = null;
  let contactList = null;
  let rightImage = null;

  for (const child of gridChildren) {
    if (child.tagName === 'DIV' && !leftContent) {
      // Heuristic: the only child div, containing headings and p, is content
      leftContent = child;
    } else if (child.tagName === 'UL' && !contactList) {
      contactList = child;
    } else if (child.tagName === 'IMG' && !rightImage) {
      rightImage = child;
    }
  }

  // Compose left column: leftContent + contactList
  const leftCol = document.createElement('div');
  if (leftContent) leftCol.appendChild(leftContent);
  if (contactList) leftCol.appendChild(contactList);
  // The right column is just the image

  // Build the table
  const headerRow = ['Columns (columns18)'];
  const contentRow = [leftCol, rightImage];

  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(block);
}
