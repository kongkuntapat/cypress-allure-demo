describe("🧪 Login Test", function () {
  before(() => {
    // ✅ โหลด fixture แล้วเก็บเป็น this.user (ใช้กับ function () เท่านั้น)
    cy.fixture("user").then((data) => {
      if (!data.valid || !data.invalid) {
        throw new Error("❗ user.json ไม่สมบูรณ์");
      }
      this.user = data;
    });
  });

  beforeEach(function () {
    cy.visit("https://opensource-demo.orangehrmlive.com/");

    // ✅ Allure Metadata
    cy.allure().epic("Authentication");
    cy.allure().feature("Login Page");
    cy.allure().severity("critical");
  });

  context("✅ กรณีเข้าสู่ระบบสำเร็จ", function () {
    it("ควรเข้าสู่ Dashboard ได้", function () {
      cy.allure().story("User: เข้าระบบด้วยข้อมูลที่ถูกต้อง");

      cy.allure().step("กรอก Username");
      cy.get('input[name="username"]').type(this.user.valid.username);

      cy.allure().step("กรอก Password");
      cy.get('input[name="password"]').type(this.user.valid.password);

      cy.allure().step("คลิกปุ่ม Login");
      cy.get('button[type="submit"]').click();

      cy.allure().step("ตรวจสอบว่าเข้าสู่ Dashboard");
      cy.url().should("include", "/dashboard");
    });
  });

  context("❌ กรณีเข้าสู่ระบบล้มเหลว", function () {
    it("ควรแสดงข้อความ Invalid credentials", function () {
      cy.allure().story("User: เข้าระบบด้วยข้อมูลที่ผิด");

      cy.allure().step("กรอก Username ผิด");
      cy.get('input[name="username"]').type(this.user.invalid.username);

      cy.allure().step("กรอก Password ผิด");
      cy.get('input[name="password"]').type(this.user.invalid.password);

      cy.allure().step("คลิกปุ่ม Login");
      cy.get('button[type="submit"]').click();

      cy.allure().step("ตรวจสอบข้อความแสดงข้อผิดพลาด");
      cy.get(".oxd-alert-content-text")
        .should("be.visible")
        .and("contain", "Invalid credentials");
    });
  });

  context("🔥 ทดสอบการแนบภาพเมื่อ Fail", function () {
    it("ตั้งใจให้ Fail เพื่อดูว่าแนบภาพใน Allure หรือไม่", function () {
      cy.allure().story("Force fail to test screenshot attach");

      cy.allure().step("เปิดหน้า Login");
      cy.visit("https://opensource-demo.orangehrmlive.com/");

      cy.allure().step("ค้นหาข้อความที่ไม่มีอยู่จริง (Fail แน่นอน)");
      cy.get("h1").should("contain", "This text does not exist"); // จะ Fail
    });
  });
});
