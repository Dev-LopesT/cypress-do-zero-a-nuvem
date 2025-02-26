class FormPage {
  visit() {
    cy.visit("./src/index.html");
  }

  enterName(name) {
    cy.get('input[name="firstName"]').as("firstName").should("be.visible");
    cy.get("@firstName").type(name);
  }

  enterLastName(lastName) {
    cy.get('input[name="lastName"]').as("lastName").should("be.visible");
    cy.get("@lastName").type(lastName);
  }

  enterEmail(email) {
    cy.get('input[name="email"]:first').as("email").should("be.visible");
    cy.get("@email").type(email);
  }

  enterPhone(phone) {
    cy.get('input[name="phone"]:first').as("phone").should("be.visible");
    cy.get("@phone").type(phone);
  }

  enterFeedback(feedback) {
    cy.get("textarea").as("message").should("be.visible");
    cy.get("@message").type(feedback);
  }

  submit() {
    cy.contains("button", "Enviar").as("submit").should("be.visible");
    cy.get("@submit").click();
  }

  messageSuccess() {
    cy.get(".success").should("be.visible");
  }
}

export default FormPage;
