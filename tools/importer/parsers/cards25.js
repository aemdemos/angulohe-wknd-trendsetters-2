/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header matches the example
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];

  // 2. Get all immediate child divs representing cards or images
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  cardDivs.forEach(cardDiv => {
    // Try to get the image for the card (mandatory per block definition)
    const img = cardDiv.querySelector('img');

    // Try to get the text area: look for inner div with utility-padding-all-2rem
    let textContentDiv = cardDiv.querySelector('.utility-padding-all-2rem');
    // If not present, look for a child h3 or p directly inside cardDiv
    if (!textContentDiv) {
      const tempDiv = document.createElement('div');
      const heading = cardDiv.querySelector('h3');
      const para = cardDiv.querySelector('p');
      if (heading) tempDiv.appendChild(heading);
      if (para) tempDiv.appendChild(para);
      textContentDiv = tempDiv.childNodes.length ? tempDiv : null;
    }
    // If still no text, provide an empty div as fallback
    if (!textContentDiv) {
      textContentDiv = document.createElement('div');
    }

    // Only add cards with an image (mandatory)
    if (img) {
      rows.push([img, textContentDiv]);
    }
  });

  // 3. Create and replace with proper block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
