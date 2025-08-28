/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row, matching the required header exactly
  const headerRow = ['Columns (columns27)'];

  // Find the grid layout (columns block) inside the section
  const gridLayout = element.querySelector('.grid-layout');
  if (!gridLayout) {
    // If gridLayout isn't found, fallback to replacing with just the block header to avoid JS errors
    const fallback = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(fallback);
    return;
  }
  // Get all immediate children of the grid (should be 2: content column, image column)
  const columns = Array.from(gridLayout.children);
  let col1 = '', col2 = '';
  if (columns.length > 0) {
    // Usually text+cta, then image
    const firstColCandidate = columns.find((c) => c.tagName !== 'IMG');
    const secondColCandidate = columns.find((c) => c.tagName === 'IMG');
    if (firstColCandidate) col1 = firstColCandidate;
    if (secondColCandidate) col2 = secondColCandidate;
  }
  // Assemble the table rows
  const tableRows = [headerRow, [col1, col2]];
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
