const Buffer = require("safe-buffer").Buffer;
const Keygrip = require("keygrip");
const cookieKey = "123123123";
const keygrip = new Keygrip([cookieKey]);

const authenticate = () => {
  const id = "5eb78374a0054b2d85fcf900";
  const sessionObject = {
    passport: {
      user: id,
    },
  };
  const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString(
    "base64"
  );

  const sig = keygrip.sign("session=" + sessionString);

  return [sessionString, sig];
};

describe("Test Header", () => {
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
    const [sessionString, sig] = authenticate();
    before(() => {
      cy.setCookie("session", sessionString);
      cy.setCookie("session.sig", sig);
      cy.visit("/blogs");
    });
    it("It should show logout button if it's logged", () => {
      cy.contains("Logout");
    });
  });
});
