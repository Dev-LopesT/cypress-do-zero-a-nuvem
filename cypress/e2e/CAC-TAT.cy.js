import FormPage from "../pageObjects/formPage";

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  const longtext = Cypress._.repeat("djkajdklsajdlka", 10);

  it("verifica o título da aplicação", () => {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });
  it("preenche os campos obrigatórios e envia o formulário", () => {
    cy.get('input[name="firstName"]').as("firstName").should("be.visible");
    cy.get("@firstName").type("Fulano");

    cy.get('input[name="lastName"]').as("lastName").should("be.visible");
    cy.get("@lastName").type("de Tal");

    cy.get('input[name="email"]:first').as("email").should("be.visible");
    cy.get("@email").type("fulaninhotal@gmail.com");

    cy.get('input[name="phone"]:first').as("phone").should("be.visible");
    cy.get("@phone").type("11999999999");

    cy.get("select#product").as("select").should("be.visible");
    cy.get("@select").select("cursos");

    cy.get('input[name="atendimento-tat"]')
      .eq(2)
      .as("radio")
      .should("be.visible");
    cy.get("@radio").check();

    cy.get('input[type="checkbox"]').as("checkbox").should("be.visible");
    cy.get("@checkbox").eq(1).check();

    cy.get("textarea").as("message").should("be.visible");
    cy.get("@message").type("Mensagem de teste");

    cy.contains("button", "Enviar").as("submit").should("be.visible");
    cy.get("@submit").click();

    cy.get(".success").should("be.visible");
  });

  it("Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get('input[name="firstName"]').as("firstName").should("be.visible");
    cy.get("@firstName").type("Fulano");

    cy.get('input[name="lastName"]').as("lastName").should("be.visible");
    cy.get("@lastName").type("de Tal");

    cy.get('input[name="email"]:first').as("email").should("be.visible");
    cy.get("@email").type("fulaninhotal");

    cy.get("textarea").as("message").should("be.visible");
    cy.get("@message").type(longtext);

    cy.contains("button", "Enviar").as("submit").should("be.visible");
    cy.get("@submit").click();

    cy.get(".error").should("be.visible");
  });

  it("Validando se o campo telefone continua vazio após serem inseridos caracteres não numéricos", () => {
    cy.get('input[name="phone"]:first').as("phone");
    cy.get("@phone").type("abc");

    cy.get('input[name="phone"]:first').should("have.value", ""); // Verifica se o campo está vazio - input == vazio
  });

  it("Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get('input[name="firstName"]').as("firstName").should("be.visible");
    cy.get("@firstName").type("Fulano");

    cy.get('input[name="lastName"]').as("lastName").should("be.visible");
    cy.get("@lastName").type("de Tal");

    cy.get('input[name="email"]:first').as("email").should("be.visible");
    cy.get("@email").type("fulaninhotal");

    cy.get("textarea").as("message").should("be.visible");
    cy.get("@message").type("Teste");

    cy.get("#phone-checkbox").as("phoneCheckbox").check();

    cy.contains("button", "Enviar").as("submit").should("be.visible");
    cy.get("@submit").click();

    cy.get(".error").should("be.visible");
  });

  it("Preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get('input[name="firstName"]')
      .as("firstName")
      .type("Fulano")
      .should("have.value", "Fulano");

    cy.get("@firstName").clear().should("have.value", "");

    cy.get('input[name="lastName"]')
      .as("lastName")
      .type("De Tal")
      .should("have.value", "De Tal");

    cy.get("@lastName").clear().should("have.value", "");

    cy.get('input[name="email"]:first')
      .as("email")
      .type("teste@gmail.com")
      .should("have.value", "teste@gmail.com");

    cy.get("@email").clear().should("have.value", "");

    cy.get('input[name="phone"]:first')
      .as("phone")
      .type("9999999999")
      .should("have.value", "9999999999");

    cy.get("@phone").clear().should("have.value", "");
  });

  it("Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.contains("button", "Enviar").as("submit").should("be.visible");
    cy.get("@submit").click();

    cy.get(".error").should("be.visible");
  });

  //Utilizando Custom Commands
  it("Envia o formuário com sucesso usando um comando customizado", () => {
    /*  const data = {
      name: "Fulano",
      lastName: "de Tal",
      email: "example@test.com",
      phone: "11999999999",
      feedback: "Mensagem de Teste",
    }; */

    /*  cy.fillForm(data); */

    cy.fillForm();

    cy.get(".success").should("be.visible");
  });

  //Utilizando POP - Page Object Pattern
  it("Preenchendo Cadastro e Enviando Formulário", () => {
    const form = new FormPage();
    form.enterName("Fulano");
    form.enterLastName("de Tal");
    form.enterEmail("teste@example.com");
    form.enterPhone("11999999999");
    form.enterFeedback("Mensagem de Teste");
    form.submit();
    form.messageSuccess();
  });
});
