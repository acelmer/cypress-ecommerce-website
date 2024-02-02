describe('Product_search', {defaultCommandTimeout: 11000}, () => {

  it(' should find desired product using filters', () => {
    cy.visit('/');
    cy.get('span').contains('Women').click(); // Find category 'Women'
    cy.xpath('//li//a[text()="Jackets"]').click();// Find category 'Jackets'
    cy.xpath('//div[text()="Color"]').click();
    cy.xpath('//div[contains(@class, "sidebar")]//div[@option-label="Blue"]').click({force:true}); // Select only products in color 'blue'
    cy.xpath('//div[text()="Size"]').click();
    cy.xpath('//div[contains(@class, "sidebar")]//div[@option-label="S"]').click({force:true}); // Select only products in size 'S'
    cy.get('div').contains('Material').click();
    cy.xpath('//div[contains(@class, "sidebar")]//a[contains(.,"Polyester")]').click({force:true}); // Select only products made from polyester
    cy.get('strong').contains('Now Shopping by').siblings('ol').children('li').should('have.length',3); // Check if there are 3 filters

})

 it.only('should find desired product using search box', () => {
    cy.visit('/');
    cy.xpath('//div[contains(@class,"field search")]//input[@id="search"]').click().type('top{enter}'); // Insert 'top' in the search field
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?q=top'); // Check if the query param equals 'top'
    })

})
});




