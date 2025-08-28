/* global WebImporter */
export default function parse(element, { document }) {
  // Set block name and variant from prompt
  const headerRow = ['Columns (columns4)'];

  // Helper: Get all direct children columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // For this HTML, each direct child is a column, and each contains a single image.
  // If a column contains more, we'd include all its content as a cell.

  // Gather each column's full content (not just image), to handle mixed-content columns in other cases
  const columnCells = columns.map(colDiv => {
    // If it has only an image, just use the whole column div
    // If it ever contains more, this approach includes all content
    return colDiv;
  });

  // Compose the rows as per the block table structure guidelines
  const rows = [headerRow, columnCells];

  // Create the block table and replace original
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
