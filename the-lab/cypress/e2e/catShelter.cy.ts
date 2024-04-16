describe("Cat shelter", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.config("baseUrl")}/catshelter`);
  });

  describe("when adding a cat", () => {
    describe("when clicking cancel", () => {
      it("should return to main view", () => {
        cy.get("a.add").click();
        cy.get("button.cancel").click();

        cy.get("section.intro_section h1").should("have.text", "Cat shelter");
        cy.get("a.add").should("be.visible");
        cy.get("ul.collection").children().should("have.length", 3);
      });
    });

    describe("when clicking Back to Cat shelter", () => {
      it("should return to main view", () => {
        cy.get("a.add").click();
        cy.get("header.add_cat_header a").click();

        cy.get("section.intro_section h1").should("have.text", "Cat shelter");
        cy.get("a.add").should("be.visible");
        cy.get("ul.collection").children().should("have.length", 3);
      });
    });

    it("should increase the list by one cat", () => {
      cy.get("a.add").click();
      cy.get('input[name="name"]').type("Miorlaila");
      cy.get('textarea[name="description"]').type("Likes treats");
      cy.get('input[value="outside"]').check();
      cy.get("button.add").click();

      cy.get("ul.collection li")
        .eq(3)
        .find("span")
        .should("contain.text", "Miorlaila");
      cy.get("ul.collection li")
        .eq(3)
        .find("button i")
        .should("have.attr", "class", "fas fa-home");
      // cleanup
      cy.get("ul.collection li")
        .eq(3)
        .find("a")
        .invoke("attr", "href")
        .then((href) => {
          const [, , id] = href.split("/");
          cy.request("DELETE", `http://api.boozang.com/cats/${id}`);
        });
    });
  });

  describe("when editing a cat", () => {
    beforeEach(() => {
      cy.request("POST", `http://api.boozang.com/cats`, {
        name: "Miorlaila",
        inOrOutside: "outside",
        foundHome: false,
        description: "Likes treats",
      });
      cy.reload();
    });

    describe("when changing a cat's name", () => {
      it("should show the updated name in the main list", () => {
        cy.get("ul.collection li").eq(3).find("a.cat_name_link").click();
        cy.get('input[name="name"]').clear();
        cy.get('input[name="name"]').type("Paturica");
        cy.get("button.add").click();

        cy.get("ul.collection li")
          .eq(3)
          .find("span")
          .should("contain.text", "Paturica");
      });
    });

    describe("when toggling the found home button", () => {
      it("should save the change", () => {
        cy.get("ul.collection li").eq(3).find("button.new_home").click();
        cy.reload();

        cy.get("ul.collection li")
          .eq(3)
          .find("button.new_home")
          .should("have.attr", "class", "new_home found");
      });
    });

    afterEach(() => {
      cy.get("ul.collection li")
        .eq(3)
        .find("a")
        .invoke("attr", "href")
        .then((href) => {
          const [, , id] = href.split("/");
          cy.request("DELETE", `http://api.boozang.com/cats/${id}`);
        });
      cy.reload();
    });
  });

  describe("when deleting a cat", () => {
    it("should decrease the main list by one cat", () => {
      cy.request("POST", `http://api.boozang.com/cats`, {
        name: "Miorlaila",
        inOrOutside: "outside",
        foundHome: false,
        description: "Likes treats",
      });
      cy.reload();

      cy.get("ul.collection li").eq(3).find("a.cat_name_link").click();
      cy.get("button.delete").click();
      cy.get("ul.collection").children().should("have.length", 3);
      for (let i = 0; i < 3; i++) {
        cy.get("ul.collection li")
          .eq(i)
          .find("span")
          .should("not.contain.text", "Miorlaila");
      }
    });
  });
});
