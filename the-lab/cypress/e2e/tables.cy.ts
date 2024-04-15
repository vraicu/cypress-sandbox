describe("Tables", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.config("baseUrl")}/tables`);
  });

  describe("when all filters unchecked", () => {
    it("should not return any results", () => {
      cy.get('input[type="checkbox"][name="lion"]').uncheck();
      cy.get('input[type="checkbox"][name="elephant"]').uncheck();
      cy.get('input[type="checkbox"][name="zebra"]').uncheck();

      cy.get("table#animalTable tbody").children().should("have.length", 0);
    });
  });

  describe("when lions checkbox is checked", () => {
    it("should return only lion results", () => {
      cy.get('input[type="checkbox"][name="elephant"]').uncheck();
      cy.get('input[type="checkbox"][name="zebra"]').uncheck();

      const lions = [
        {
          name: "Millie",
          species: "lion",
          hairdo: "short",
          isLiked: true,
        },
        {
          name: "Charlie",
          species: "lion",
          hairdo: "short",
          isLiked: true,
        },
      ];
      for (let i = 0; i < 3; i++) {
        if (i === 0) continue;
        const { name, species, hairdo, isLiked } = lions[i - 1];
        cy.get("table#animalTable tbody tr")
          .eq(i)
          .find("td")
          .eq(1)
          .should("contain.text", name);
        cy.get("table#animalTable tbody tr")
          .eq(i)
          .find("td")
          .eq(2)
          .should("contain.text", species);
        cy.get("table#animalTable tbody tr")
          .eq(i)
          .find("td")
          .eq(3)
          .should("contain.text", hairdo);
        cy.get("table#animalTable tbody tr")
          .eq(i)
          .find("td i")
          .should(
            "have.attr",
            "class",
            isLiked ? "fa fa-heart liked_icon liked" : "fa fa-heart liked_icon"
          );
      }
    });
  });

  describe("when elephants checkbox is checked", () => {
    it("should return only elephant results", () => {
      cy.get('input[type="checkbox"][name="lion"]').uncheck();
      cy.get('input[type="checkbox"][name="zebra"]').uncheck();

      const elephants = [
        {
          name: "Dandy",
          species: "elephant",
          hairdo: "bald",
          isLiked: true,
        },
        {
          name: "Ruby",
          species: "elephant",
          hairdo: "bald",
          isLiked: true,
        },
      ];
      for (let i = 0; i < 3; i++) {
        if (i === 0) continue;
        const { name, species, hairdo, isLiked } = elephants[i - 1];
        cy.get("table#animalTable tbody tr")
          .eq(i)
          .find("td")
          .eq(1)
          .should("contain.text", name);
        cy.get("table#animalTable tbody tr")
          .eq(i)
          .find("td")
          .eq(2)
          .should("contain.text", species);
        cy.get("table#animalTable tbody tr")
          .eq(i)
          .find("td")
          .eq(3)
          .should("contain.text", hairdo);
        cy.get("table#animalTable tbody tr")
          .eq(i)
          .find("td i")
          .should(
            "have.attr",
            "class",
            isLiked ? "fa fa-heart liked_icon liked" : "fa fa-heart liked_icon"
          );
      }
    });
  });

  describe("when zebras checkbox is checked", () => {
    it("should return only zebra results", () => {
      cy.get('input[type="checkbox"][name="lion"]').uncheck();
      cy.get('input[type="checkbox"][name="elephant"]').uncheck();

      const zebras = [
        {
          name: "Miles",
          species: "zebra",
          hairdo: "mohawk",
          isLiked: true,
        },
        {
          name: "Theo",
          species: "zebra",
          hairdo: "mohawk",
          isLiked: true,
        },
        {
          name: "Sally",
          species: "zebra",
          hairdo: "mohawk",
          isLiked: true,
        },
      ];
      for (let i = 0; i < 4; i++) {
        if (i === 0) continue;
        const { name, species, hairdo, isLiked } = zebras[i - 1];
        cy.get("table#animalTable tbody tr")
          .eq(i)
          .find("td")
          .eq(1)
          .should("contain.text", name);
        cy.get("table#animalTable tbody tr")
          .eq(i)
          .find("td")
          .eq(2)
          .should("contain.text", species);
        cy.get("table#animalTable tbody tr")
          .eq(i)
          .find("td")
          .eq(3)
          .should("contain.text", hairdo);
        cy.get("table#animalTable tbody tr")
          .eq(i)
          .find("td i")
          .should(
            "have.attr",
            "class",
            isLiked ? "fa fa-heart liked_icon liked" : "fa fa-heart liked_icon"
          );
      }
    });
  });

  describe("when all filters are checked", () => {
    it("should have results on two pages", () => {
      cy.get("table#animalTable tbody td button i").should("have.length", 5);
      cy.get('div.pagination button[aria-label="next page"]').click();
      cy.get("table#animalTable tbody td button i").should("have.length", 3);
    });
  });
});
