describe('Account management', () => {

  it('should create an account', () => {
    cy.visit('/'); // Visit home page
    cy.get('a').contains('Create an Account').click(); // Click on 'create an account' button
    cy.location('pathname').should('eq','/customer/account/create/'); // Check if the registration site was uploaded
    cy.get('input#firstname').click().type(Cypress.env('ONLINE_STORE_FIRSTNAME')); // Type first name
    cy.get('input#lastname').click().type(Cypress.env('ONLINE_STORE_LASTNAME')); // Type last name
    cy.get('input#email_address').click().type(Cypress.env('ONLINE_STORE_EMAIL')); // Type e-mail address
    cy.get('input#password').click().type(Cypress.env('ONLINE_STORE_PASSWORD')); // Type password
    cy.get('input#password-confirmation').click().type(Cypress.env('ONLINE_STORE_PASSWORD')); // Confirm pasword
    cy.get('span').contains('Create an Account').click(); // Click on create an account button
    cy.location('pathname').should('eq','/customer/account/') // Check if the account was created
  })
  
  it('should display error message for invalid login credetials', () => {
    cy.visit('/'); // Visit home page
    cy.get('a').contains('Sign In').click(); // Click on 'sign in' button
    cy.get('span').contains('Customer Login').should('be.visible');
    cy.get('input#email').click().type("this is not an email"); // Insert incorrect email address
    cy.get('input#pass').click().type("test"); // Insert incorrect password 
    cy.xpath('//button[contains(@class,"action login primary") and .//span[text()="Sign In"]] ').click({multiple:true}); // Click on 'sign in' button
    cy.get('div#email-error').contains('Please enter a valid email'); // Check if the error message was displayed

  })

  it.only(' should add a product to the wishlist', () => {
    cy.visit('/');
    cy.logIn();
    cy.xpath('//span[text()="Men"]').click(); // Find category 'Men'
    cy.xpath('//li//a[text()="Tops"]').click();// Find category 'Tops'
    cy.xpath('//ol[contains(@class,"products")]/li').first().click(); // Select first product
    cy.xpath('//div[contains(@class,"product-social-links")]//span[text()="Add to Wish List"]').click().wait(5000); // Add selected product to the wishlist
    cy.location('pathname').should('contain','/wishlist/index/index/wishlist_id'); // Check if the wish list site was loaded
    cy.xpath('//div[contains(@class,"toolbar wishlist-toolbar")]//span[contains(.,"1 Item")]'); // Check if there is exactly one item in the wish list
  
  })

})
