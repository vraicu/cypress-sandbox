describe("To do list", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.config("baseUrl")}/sortedList`);
    cy.request("GET", "http://api.boozang.com/todos/").then((response) => {
      for (const todo of response.body) {
        cy.request("DELETE", `http://api.boozang.com/todos/${todo.id}`);
      }
    });
    cy.reload();
  });

  describe("when clicking the delete btn", () => {
    it("should decrease the to do list by one item", () => {
      cy.get("form.list_form input").type("something to do", { delay: 50 });
      cy.get("button.add").click();

      cy.get('[data-testid="todo"]')
        .eq(0)
        .find("span")
        .should("contain.text", "something to do");
      cy.get('button[title="delete"]').eq(0).click();
      cy.get("ul.collection").children().should("have.length", 0);
    });
  });

  describe("when to do list under 5 items", () => {
    it("should be possible to add one more item", () => {
      for (let i = 0; i < 4; i++) {
        cy.request("POST", "http://api.boozang.com/todos/", {
          title: `todo ${i}`,
        }).then(() => {
          if (i === 3) {
            cy.reload();
            cy.get("form.list_form input").type("todo 4");
            cy.get("button.add").click();

            for (let i = 0; i < 5; i++) {
              cy.get("ul.collection > li > span")
                .eq(i)
                .should("contain.text", `todo ${i}`);
            }
            cy.get("h5.error").should("have.text", "Your schedule is full!");
          }
        });
      }
    });
  });

  describe("when to do list has 5 items", () => {
    it("should not be possible to add one more item", () => {
      for (let i = 0; i < 5; i++) {
        cy.request("POST", "http://api.boozang.com/todos/", {
          title: `todo ${i}`,
        }).then(() => {
          if (i === 4) {
            cy.reload();
            cy.get("form.list_form input").type("todo 5");
            cy.get("button.add").click();

            for (let i = 0; i < 5; i++) {
              cy.get("ul.collection > li > span")
                .eq(i)
                .should("contain.text", `todo ${i}`);
            }
            cy.get("h5.error").should("have.text", "Your schedule is full!");
          }
        });
      }
    });
  });
});
