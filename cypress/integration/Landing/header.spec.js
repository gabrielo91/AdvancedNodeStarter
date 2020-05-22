const { authenticate } = require("../factories/session");

describe("Test Main", () => {
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
    const [session, sig] = authenticate();
    before(() => {
      cy.setCookie("session", session);
      cy.setCookie("session.sig", sig);
      cy.visit("/blogs");
    });
    it("It should show logout button if it's logged", () => {
      cy.contains("Logout");
    });
  });
});
