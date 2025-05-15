describe("🧪 Mock API ด้วย cy.intercept()", () => {
  beforeEach(() => {
    // ✅ ต้องดักก่อน visit
    cy.intercept("GET", "/api/users", { fixture: "users.json" }).as("getUsers");

    cy.visit("cypress/fixtures/user-list.html");

    // (Optionally) Allure metadata
    cy.allure().epic("Users");
    cy.allure().feature("Mock API");
    cy.allure().story("แสดงรายชื่อผู้ใช้ 10 คน");
  });

  it("✅ โหลดข้อมูลผู้ใช้จาก mock API แล้วแสดงครบ 10 คน", () => {
    cy.wait("@getUsers");

    cy.get(".user-card").should("have.length", 10);
    cy.get(".user-card")
      .first()
      .within(() => {
        cy.contains("Leanne Graham");
      });
  });
});
