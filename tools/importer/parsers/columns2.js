/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container and grid
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Left column: the first content block in the grid
  const leftCol = grid.querySelector('a.utility-link-content-block');

  // Right column: all utility-link-content-blocks in the rest of the grid (excluding the leftCol)
  let rightColCards = [];
  const allCards = grid.querySelectorAll('a.utility-link-content-block');
  rightColCards = Array.from(allCards).filter(card => card !== leftCol);

  // Compose the cells array for columns2
  const headerRow = ['Columns (columns2)'];
  const secondRow = [leftCol, rightColCards];
  const cells = [headerRow, secondRow];

  // Build the block table and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
