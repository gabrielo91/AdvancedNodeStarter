require("../../plugins");

describe("Test Landing Page", () => {
  context("Login view", () => {
    beforeEach(() => {
      cy.visit("/");
    });
    it("Header should be rendered and contains the name", () => {
      cy.visit("/");
      cy.get(".nav-wrapper");
    });

    it("It should click in login button and go to google page", () => {
      cy.visit("/");
      cy.wait(300);
      cy.contains("Login With Google").should(
        "have.attr",
        "href",
        "/auth/google"
      );
    });
  });

  context("Main view", () => {
    before(() => {
      cy.login();
    });
    it("It should shows logout button if it's logged", () => {
      cy.contains("Logout");
    });
  });
});
