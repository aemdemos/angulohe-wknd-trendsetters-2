/* global WebImporter */
export default function parse(element, { document }) {
  // Find the tab menu container
  const tabMenu = Array.from(element.children).find(el => el.classList.contains('w-tab-menu'));
  // Get each tab label (from tabMenu)
  const tabLinks = Array.from(tabMenu ? tabMenu.children : []);
  const tabLabels = tabLinks.map(link => {
    const div = link.querySelector('div');
    return div ? div.textContent.trim() : link.textContent.trim();
  });

  // Find the tab content container
  const tabContent = Array.from(element.children).find(el => el.classList.contains('w-tab-content'));
  // Get each tab pane
  const tabPanes = Array.from(tabContent ? tabContent.children : []);

  // Prepare table rows for each tab
  const rows = tabLabels.map((label, idx) => {
    // Tab label string for first cell
    // TabPane: use the relevant tab pane. If its main block is a grid, use that, else fallback to pane.
    const pane = tabPanes[idx];
    let tabBlock = null;
    if (pane) {
      tabBlock = pane.querySelector('.w-layout-grid');
      if (!tabBlock) tabBlock = pane;
    } else {
      // fallback for missing pane
      tabBlock = document.createElement('div');
    }
    return [label, tabBlock];
  });

  // Table header matches example
  const headerRow = ['Tabs (tabs22)'];

  // Compose table
  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(blockTable);
}
