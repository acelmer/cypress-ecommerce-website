describe('Product_order', {defaultCommandTimeout: 11000}, () => {
    // before(() => {
    //   cy.session('login', () => {
    //     cy.logIn();


  it('should add a product to the cart', () => {
    cy.visit('/');
    cy.xpath('//span[text()="Women"]').click(); // Find category 'Women'
    cy.xpath('//li//a[text()="Shorts"]').click();// Find category 'Shorts'
    cy.xpath('//ol[contains(@class,"products")]/li').first().click(); // Select first product
    cy.xpath('//div[contains(@class,"swatch-attribute size")]/div//div').first().click(); // Select product size
    cy.xpath('//div[contains(@class,"swatch-attribute color")]/div//div').first().click(); // Select product colour
    cy.get('span').contains('Add to Cart').click().wait(2000); // Add a product to the cart
    cy.xpath('//a[contains(@class,"showcart")]').click(); // Click on a cart
    cy.get('button#top-cart-btn-checkout').click({force:true}); // Click on 'proceed to checkout' button
    cy.location('pathname').should('eq','/checkout/'); // Check if the checkout site was uploaded.
    
  })

  it('should remove a product from the cart', () => {
    cy.visit('/');
    cy.addToCart();
    cy.xpath('//a[contains(@class,"showcart")]').click(); // Click on a cart
    cy.xpath('//span[text()=("View and Edit Cart")]').click(); // Click on 'edit cart' button
    cy.get('a[title="Edit item parameters"]').siblings('a[title="Remove item"]').click();
    cy.get('div.cart-empty').children('p').contains('You have no items'); // Check if there is no items in a cart
    
  })

  it.only('should complete checkout process and place an order', () => {
    cy.visit('/');
    cy.addToCart();
    cy.xpath('//a[contains(@class,"showcart")]').click(); // Click on a cart
    cy.get('button#top-cart-btn-checkout').click({force:true}).wait(11000) // Click on 'proceed to chceckout' button
    cy.xpath('//div[@name="shippingAddress.firstname"]//input').type('Jan'); // Type user name
    cy.xpath('//div[@name="shippingAddress.lastname"]//input').type('Kowalski'); // Type user last name
    cy.xpath('//div[@name="shippingAddress.company"]//input').type('Kowalski'); // Type company name
    cy.xpath('//div[@name="shippingAddress.street.0"]//input').type('Testowa 1'); // Typee address
    cy.xpath('//div[@name="shippingAddress.city"]//input').type('Warsaw'); // Type city name
    cy.xpath('//div[@name="shippingAddress.country_id"]//select').select('Poland'); // Select country
    cy.xpath('//div[@name="shippingAddress.region_id"]//select').select('mazowieckie'); // Select province name
    cy.xpath('//div[@name="shippingAddress.telephone"]//input').type('500000000'); // Type phone number
    cy.xpath('//div[@name="shippingAddress.postcode"]//input').type('12-345'); //Type zip code
    cy.xpath('//div[contains(@class,"field required")]//input[@type="email"]').click().type('testtest1234@gmail.com'); // Type user email
    cy.xpath('//button/span[text()="Next"]').click().wait(3000).click();
    cy.xpath('//span[text()="Place Order"]').click();
    cy.location('pathname').should('eq','/checkout/onepage/success/');
    cy.get('div').should('have.class','checkout-success'); // Check if the order number was created
  })
  
});