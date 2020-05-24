const { authenticate } = require("../../support/factories/session");
const { createUser } = require("../../support/factories/user");

require("../../plugins");

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
    before(() => {
      cy.task("createUser").then((user) => {
        const [session, sig] = authenticate(user);
        cy.setCookie("session", session);
        cy.setCookie("session.sig", sig);
        cy.visit("/blogs");
      });
    });
    it("It should show logout button if it's logged", () => {
      cy.contains("Logout");
    });
  });
});
