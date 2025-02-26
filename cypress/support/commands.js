// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
  "fillForm",
  (
    data = {
      name: "José",
      lastName: "Martnez Silva",
      email: "Josemartines@testando.com",
      phone: "1133333333",
      feedback: "Teste",
    }
  ) => {
    cy.get('input[name="firstName"]').as("firstName");
    cy.get("@firstName").type(data.name);

    cy.get('input[name="lastName"]').as("lastName");
    cy.get("@lastName").type(data.lastName);

    cy.get('input[name="email"]:first').as("email");
    cy.get("@email").type(data.email);

    cy.get('input[name="phone"]:first').as("phone");
    cy.get("@phone").type(data.phone);

    cy.get("#product").select(1);

    cy.get("#support-type > :nth-child(3)").click();

    cy.get("#phone-checkbox").check();

    cy.get("textarea").as("message");
    cy.get("@message").type(data.feedback);

    cy.contains('button', "Enviar").as("submit");
    cy.get("@submit").click();
  }
);
