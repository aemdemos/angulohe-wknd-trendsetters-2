/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout - contains columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  let leftCellContent = [];
  let rightCellContent = [];

  if (grid) {
    const children = Array.from(grid.children);
    // LEFT COLUMN: Should include headline, subheading, and buttons
    const left = children[0];
    if (left) {
      // Collect all children of left column that contain visible content
      leftCellContent = Array.from(left.childNodes).filter(node => {
        // include element nodes and text nodes with actual content
        return (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim());
      });
      // If nothing found, fall back to the whole element
      if (leftCellContent.length === 0) {
        leftCellContent = [left];
      }
    }
    // RIGHT COLUMN: Usually an image
    const right = children[1];
    if (right) {
      // For robustness, include as-is
      rightCellContent = [right];
    }
  } else {
    // Fallback: treat the whole element as a single cell
    leftCellContent = [element];
    rightCellContent = [];
  }

  // Compose cells for table: header and one row with two columns
  const headerRow = ['Columns (columns15)'];
  const row = [leftCellContent, rightCellContent];
  const block = WebImporter.DOMUtils.createTable([headerRow, row], document);
  element.replaceWith(block);
}
