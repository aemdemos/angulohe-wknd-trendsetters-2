/* global WebImporter */
export default function parse(element, { document }) {
  // Find all immediate child divs (the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Table header: single cell, matching the example
  // The header row must be a single cell, even if multiple columns are in content rows.
  const headerRow = ['Columns (columns29)'];

  // Content row: each cell is the image from each column
  const contentRow = columns.map((col) => {
    const img = col.querySelector('img');
    return img || col;
  });

  // Build the table so every row has the same number of columns
  // The header row should have only one cell, the content row the correct number of columns
  // To match the example, we need to make the header cell span the columns
  const table = document.createElement('table');
  const headerTr = document.createElement('tr');
  const headerTh = document.createElement('th');
  headerTh.innerHTML = headerRow[0];
  headerTh.colSpan = contentRow.length;
  headerTr.appendChild(headerTh);
  table.appendChild(headerTr);

  const contentTr = document.createElement('tr');
  contentRow.forEach((cell) => {
    const td = document.createElement('td');
    if (typeof cell === 'string') {
      td.innerHTML = cell;
    } else if (Array.isArray(cell)) {
      td.append(...cell);
    } else {
      td.append(cell);
    }
    contentTr.appendChild(td);
  });
  table.appendChild(contentTr);

  element.replaceWith(table);
}
