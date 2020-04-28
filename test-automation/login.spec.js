//Testing for Logins
/// <reference types="cypress" />

describe('Log In Test Best Case for Test User', ()=>{
    it('Navigate to Login Page', ()=>{
        cy.visit('http://localhost:3000/login')
        cy.get('[name = "email"]').type("test.subject1@gmail.com")
        cy.get('[name = "password"]').type("123456789")
        cy.get('[style="display: flex; justify-content: center;"] > .btn').click()
        cy.get(':nth-child(8) > :nth-child(8)').contains("Test Subject1")
    })
})

describe('Log In- Wrong Password', ()=>{
    it('Navigate to Login Page', ()=>{
        cy.visit('http://localhost:3000/login')
        cy.get('[name = "email"]').type("test.subject1@gmail.com")
        cy.get('[name = "password"]').type("abcdefghi")
        cy.get('[style="display: flex; justify-content: center;"] > .btn').click()
        cy.get('form > :nth-child(1)').contains("Invalid Credentials")
    })
})


describe('Log In- Wrong Email', ()=>{
    it('Navigate to Login Page', ()=>{
        cy.visit('http://localhost:3000/login')
        cy.get('[name = "email"]').type("test.subject1@gmail.com")
        cy.get('[name = "password"]').type("abcdefghi")
        cy.get('[style="display: flex; justify-content: center;"] > .btn').click()
        cy.get('form > :nth-child(1)').contains("Invalid Credentials")
    })
})


//This test is currently unusable due to issues with retrieving text from Formik's error output
describe('Log In- Not an Email', ()=>{
    it('Navigate to Login Page', ()=>{
        cy.visit('http://localhost:3000/login')
        cy.get('[name = "email"]').type("test.subject1")
        cy.get('[name = "password"]').type("abcdefghi")
        cy.get('[style="display: flex; justify-content: center;"] > .btn').click()
        cy.get('form > :nth-child(1)').contains("Invalid Credentials")
    })
})