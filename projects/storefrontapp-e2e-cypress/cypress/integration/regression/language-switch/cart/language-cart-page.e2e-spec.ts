import * as cart from '../../../../helpers/cart';
import * as siteContextSelector from '../../../../helpers/site-context-selector';

describe('Language switch - cart page', () => {
  const cartPath = '/cart';
  const deutschName = 'Digitalkamera';

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.visit('/');
    cart.addProductWhenLoggedIn(false);
  });

  siteContextSelector.stub();

  describe('cart page', () => {
    it('should change language in the url', () => {
      siteContextSelector.verifyLanguageChange(cartPath);
    });

    it('should change language in the page', () => {
      siteContextSelector.languageChange(cartPath);

      cy.get('cx-cart-item-list .cx-link')
        .invoke('text')
        .should('contains', deutschName);
    });
  });
});
