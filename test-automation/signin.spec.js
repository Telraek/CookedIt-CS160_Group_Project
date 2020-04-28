//Testing for Profile view and update
/// <reference types="cypress" />

//Heavily broken Test and Design
describe('Sign in Test Best Case for Test User', ()=>{
    it('Signing Up', ()=>{
        cy.visit('http://localhost:3000/signup')
        cy.get('[name="name"]').type("testName")
        cy.get('[name="email"]').type("testName@gmail.com")
        cy.get('[name="password"]').type("0987654321")
        cy.get('[style="display: flex; justify-content: center;"] > .btn').click()
        cy.get('[name = "email"]').type("testName@gmail.com")
        cy.get('[name = "password"]').type("0987654321")
        cy.get('[style="display: flex; justify-content: center;"] > .btn').click()
        cy.get(':nth-child(8) > :nth-child(8)').contains("Test Subject1")

        
    })
})
