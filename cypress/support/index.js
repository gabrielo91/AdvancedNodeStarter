const { authenticate } = require("../support/factories/session");

Cypress.Commands.add("login", () => {
  cy.task("createUser").then((user) => {
    const [session, sig] = authenticate(user);
    cy.setCookie("session", session);
    cy.setCookie("session.sig", sig);
    cy.setCookie("hola", "pedro");
    cy.visit("/blogs");
  });
});

Cypress.Commands.add(
  "post",
  ({
    path,
    body,
    headers = {
      "Content-Type": "application/json",
    },
    credentials = "same-origin",
  }) => {
    return fetch(path, {
      method: "POST",
      credentials,
      headers,
      body: JSON.stringify(body),
    });
  }
);
