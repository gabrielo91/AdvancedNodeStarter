describe("Test Header", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  context("Login view", () => {
    it("Header should be rendered and contains the name", () => {
      cy.get(".nav-wrapper");
    });
  });

  it("It should click in login button and go to google page", () => {
    cy.contains("Login With Google");
    cy.get("li > a").should("have.attr", "href", "/auth/google");
  });
});
