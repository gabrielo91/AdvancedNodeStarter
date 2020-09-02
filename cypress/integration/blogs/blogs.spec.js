import faker from "faker";
faker.locale = Cypress.config().locale;
require("../../plugins");

const HTTP_UNAUTHORIZED = 401;

describe("Main view when logged in", () => {
  context("When user is logged", () => {
    beforeEach(() => {
      cy.login();
      cy.get("[data-cy=add-blog-button]").click();
      cy.wait(300);
    });
    it("It should render new blogs page", () => {
      cy.url().should("include", "/blogs/new");
      cy.get("[data-cy=input-title]");
      cy.get("[data-cy=input-content]");
    });

    it("It should  try to create a blog with invalid inputs and fail", () => {
      cy.get("[data-cy=blog-next]").click();
      cy.wait(300);
      cy.get("[data-cy=input-title-error]").contains(
        "You must provide a value"
      );
      cy.get("[data-cy=input-content-error]").contains(
        "You must provide a value"
      );
    });

    it("It should creates a new blog and watch it", () => {
      cy.url().should("include", "/blogs/new");
      cy.get("[data-cy=input-title]").type(faker.lorem.sentence());
      cy.get("[data-cy=input-content]").type(faker.lorem.paragraph());
      cy.get("[data-cy=blog-next]").click();
      cy.wait(300);
      cy.get("[data-cy=blog-back]").should("be.enabled");
      cy.get("[data-cy=blog-save]").should("be.enabled").click();
      cy.wait(300);
      cy.url().should("include", "/blogs");
      cy.get("[data-cy=blog-card]");
    });
  });
});

describe("When not logged in", () => {
  it("User tries to crete a new blog and gets 401 code", async () => {
    const result = await cy.post({
      path: "/api/blogs",
      body: {
        title: "My title",
        content: "My super content",
      },
    });
    expect(result.status).to.be.equal(HTTP_UNAUTHORIZED);
  });
});
