//Testing for Profile view and update
/// <reference types="cypress" />


describe('Profile Update Best Case with Authorized User', ()=>{
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
        cy.get('[href="/profile/update"] > .btn').click()
        cy.get('[name="bio"]').type(bio)
        cy.get('[name="location"]').type(location)
        cy.get('[style="display: flex; justify-content: center;"] > .btn').click()
        cy.get(':nth-child(8) > :nth-child(4)').contains(bio)
        cy.get(':nth-child(8) > :nth-child(6)').contains(location)
    }
    
    )
})


