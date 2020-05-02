# User Guide

Cooked-It is a team-driven, MERN-stack development project. The current version as of 05/02/2020 is a demo and WIP that has the barebones functionality of an end-to-end connection.

### Home
This page will render out any user posts currently present in the database.

### Login
This page is a basic log-in page with simple JWT authentification. Email must have a format
***name@something.com***
and password must be at least 6 characters long

### Profile

This page will ask you to go to either login or signup if you are not logged in. Otherwise, this page will display a simple HTML-like render of the current user's bio without formatting, frills, or even what anything means.

### Post Example

A now defunct page that was used to test simple CSS and HTML formatting in React's JSX.

### Signup

A simple sign-up page that requires you to enter any name, an email, and a password.
Email must have a format
***name@something.com***
and password must be at least 6 characters long.
***Extra note:*** Sign-up is currently bugged as a new user will not have an accompanying automatic profile creation.

### Profile Update
An authenticated user may update their biography and/or location with any valid text. 
***Extra note:*** The biography and location textboxes are non-scaleable, 1 line boxes. This is due to project deadlines resulting in a simple implementation compared to managing a text-area in React.

### Create Post

An authenticated user may update a post. A post requires both a title and some description with any valid text.
***Extra note:*** The textboxes are non-scaleable, 1 line boxes. This is due to project deadlines resulting in a simple implementation compared to managing a text-area in React.


All implementations were done so to develop an end-to-end connection. It isn't pretty, but it works (kind of).