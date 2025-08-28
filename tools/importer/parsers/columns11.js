/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must be exactly one column as per the example
  const headerRow = ['Columns (columns11)'];

  // --- Extract Left Column (headline + eyebrow) ---
  const firstGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  let leftCol = null;
  if (firstGrid) {
    // The first child div holds the eyebrow and headline
    leftCol = firstGrid.children[0];
  }

  // --- Extract Right Column (intro paragraph, author, button) ---
  let rightCol = null;
  if (firstGrid && firstGrid.children.length > 1) {
    // The second child div holds the rich text, author row, and button
    rightCol = firstGrid.children[1];
  }

  // --- Extract Images (bottom grid: two images side by side) ---
  const secondGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let imgCells = ['', ''];
  if (secondGrid) {
    const imgDivs = secondGrid.querySelectorAll(':scope > div.utility-aspect-1x1');
    imgCells = Array.from(imgDivs).map(div => {
      const img = div.querySelector('img');
      return img || '';
    });
    // Ensure two columns
    if (imgCells.length < 2) {
      imgCells.push('');
    } else if (imgCells.length > 2) {
      imgCells = imgCells.slice(0, 2);
    }
  }

  // Build table cells: header row is a single cell, content/image rows are two cells
  const cells = [
    headerRow,
    [leftCol, rightCol],
    imgCells
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
