/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct columns (immediate children)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Build the data row with one cell per column
  const dataRow = columns.map((col) => {
    const img = col.querySelector('img');
    return img || '';
  });

  // The header row must be a SINGLE CELL (not as many columns as in dataRow)
  const headerRow = ['Columns (columns7)'];

  // Compose the table -- first row header (one cell), second row is dataRow (n cells)
  const cells = [headerRow, dataRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Set colspan on the header th to span all columns
  const th = table.querySelector('th');
  if (th && dataRow.length > 1) {
    th.setAttribute('colspan', dataRow.length);
  }

  element.replaceWith(table);
}
