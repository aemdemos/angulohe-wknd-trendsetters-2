/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row: Must match example
  const headerRow = ['Cards (cards23)'];

  // Each tab-pane contains a grid of cards
  const tabPanes = Array.from(element.querySelectorAll('.w-tab-pane'));
  const rows = [];

  tabPanes.forEach(tabPane => {
    const grid = tabPane.querySelector('.grid-layout');
    if (!grid) return;
    // Each card is an <a> tag
    const cards = Array.from(grid.children).filter(child => child.tagName === 'A');
    cards.forEach(card => {
      // Find image in card (in a nested div, if present)
      let img = card.querySelector('img');

      // Find heading (h3) and description (.paragraph-sm)
      let heading = card.querySelector('h3');
      let desc = card.querySelector('.paragraph-sm');
      // If not found directly, search deeper (for nested divs)
      if (!heading || !desc) {
        const innerDivs = Array.from(card.querySelectorAll('div'));
        innerDivs.forEach(div => {
          if (!heading) heading = div.querySelector('h3');
          if (!desc) desc = div.querySelector('.paragraph-sm');
        });
      }
      // Compose text cell: heading above description
      const textContent = [];
      if (heading) textContent.push(heading);
      if (desc && desc !== heading) textContent.push(desc);
      // If neither heading nor desc, fallback to card text
      if (textContent.length === 0) {
        textContent.push(document.createTextNode(card.textContent.trim()));
      }

      // Row: [img, textContent]. Always two columns.
      rows.push([
        img ? img : '',
        textContent.length > 1 ? textContent : textContent[0]
      ]);
    });
  });

  // Compose final table array
  const tableCells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the element with the block table
  element.replaceWith(blockTable);
}
