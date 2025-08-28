/* global WebImporter */
export default function parse(element, { document }) {
  // Table header, must exactly match the block name
  const headerRow = ['Columns (columns36)'];

  // Find the main grid inside the .container
  const container = element.querySelector(':scope > .container');
  if (!container) return;
  const grid = container.querySelector(':scope > .grid-layout');
  if (!grid) return;

  // Get first two children of grid: left (text/buttons), right (images)
  const mainDivs = Array.from(grid.children);
  if (mainDivs.length < 2) return;

  // Reference the actual elements from the DOM
  const leftCol = mainDivs[0];
  const rightCol = mainDivs[1];

  // Left cell: include h1, p, and button group (all children of leftCol)
  // Reference the actual elements (not clones)
  const leftChildren = Array.from(leftCol.children);

  // Right cell: the nested grid of images (all images inside that grid)
  const rightImagesGrid = rightCol.querySelector(':scope > .grid-layout');
  let rightChildren = [];
  if (rightImagesGrid) {
    rightChildren = Array.from(rightImagesGrid.children);
  }

  // Build cells row: [leftColContent, ...rightColContent]
  const cells = [
    headerRow,
    [leftChildren, rightChildren]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
