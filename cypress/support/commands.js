// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('logIn', () => {
    cy.visit('/');
    cy.get('a').contains('Sign In').click(); // Click on 'sign in' button
    cy.get('span').contains('Customer Login').should('be.visible'); // Check if the login page was loaded
    cy.get('input#email').click().type(Cypress.env('ONLINE_STORE_EMAIL')); // Insert email address
    cy.get('input#pass').click().type(Cypress.env('ONLINE_STORE_PASSWORD')); // Insert password
    cy.xpath('//button[contains(@class,"action login primary") and .//span[text()="Sign In"]]').click({multiple:true}); // Click on 'sign in' button
    cy.visit('/'); // Visit home page

})

Cypress.Commands.add('addToCart', () => {
    cy.xpath('//span[text()="Women"]').click(); // Find category 'Women'
    cy.xpath('//li//a[text()="Shorts"]').click();// Find category 'Shorts'
    cy.xpath('//ol[contains(@class,"products")]/li').first().click(); // Select first product
    cy.xpath('//div[contains(@class,"swatch-attribute size")]/div//div').first().click(); // Select product size
    cy.xpath('//div[contains(@class,"swatch-attribute color")]/div//div').first().click(); // Select product colour
    cy.get('span').contains('Add to Cart').click().wait(2000); // Add a product to the cart
    

})