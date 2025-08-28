/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Accordion (accordion34)'];

  // Find all immediate accordion items (the .accordion.w-dropdown direct children)
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion.w-dropdown'));

  // Prepare rows; first is header
  const rows = [headerRow];

  accordionItems.forEach(item => {
    // Title cell: get .w-dropdown-toggle > .paragraph-lg (title), fallback to all inner text if .paragraph-lg not found
    const toggle = item.querySelector('.w-dropdown-toggle');
    let titleCell = null;
    if (toggle) {
      const titleEl = toggle.querySelector('.paragraph-lg');
      if (titleEl) {
        titleCell = titleEl;
      } else {
        // fallback: use the toggle's text content, as a span
        const span = document.createElement('span');
        span.textContent = toggle.textContent.trim();
        titleCell = span;
      }
    } else {
      // fallback: empty
      titleCell = document.createElement('span');
      titleCell.textContent = '';
    }

    // Content cell: get .accordion-content > .utility-padding-all-1rem > .w-richtext, or the next best content
    let contentCell = null;
    let dropdownList = item.querySelector('.accordion-content, .w-dropdown-list');
    if (dropdownList) {
      // Try rich text first
      let rich = dropdownList.querySelector('.w-richtext, .rich-text');
      if (rich) {
        contentCell = rich;
      } else {
        // fallback: all content inside .utility-padding-all-1rem (may be richtext)
        let pad = dropdownList.querySelector('.utility-padding-all-1rem');
        if (pad) {
          contentCell = pad;
        } else {
          // fallback: the entire nav
          contentCell = dropdownList;
        }
      }
    } else {
      // fallback: empty
      contentCell = document.createElement('span');
      contentCell.textContent = '';
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
