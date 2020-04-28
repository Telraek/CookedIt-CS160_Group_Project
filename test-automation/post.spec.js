//Testing for post Create
/// <reference types="cypress" />


describe('Post Update Best Case with Authorized User', ()=>{
    it('Navigate to Login Page', ()=>{
        const bio = "This is a test bio"
        const location = "This is a test location"
        //We assume login tests succeed, might not be a good idea?
        //Might have to allow authorization for testing somehow
        cy.visit('http://localhost:3000/login')
        cy.get('[name = "email"]').type("test.subject1@gmail.com")
        cy.get('[name = "password"]').type("123456789")
        cy.get('[style="display: flex; justify-content: center;"] > .btn').click()
        cy.get(':nth-child(8) > :nth-child(8)').contains("Test Subject1")
        cy.get('[href="/post/create"] > .btn').click()
        cy.get('[name="bio"]').type("Biography Test")
        cy.get('[name="location"]').type("Location Test")
        cy.get('[style="display: flex; justify-content: center;"] > .btn').click()
        cy.get(':nth-child(8) > :nth-child(1)').contains("Biography Test")
        cy.get(':nth-child(8) > :nth-child(2)').contains("Location Test")
    }
    
    )
})
