# Project Management Document (PRD)

## 1. Project Name
 Quiz APP

## 2. Project Description
A web-based quiz application that allows users to answer questions, 
submit quizzes, and view their scores. Admins can add and manage quiz questions.

## 3. Project Statement
Students need a simple way to practice quizzes online, 
but many platforms are too complex or require high payment.

## 4. Goals or objective
- Allow users to register and login
- Allow users to take quizzes based on module he/she will choose
- Automatically calculate scores
- Store quiz results
- Allow admin to add and update quiz questions

## 5. Target Users
- users/Students
- Admin (Quiz Manager)

## 6. User Roles
  ### User
   - Register Account
   - Login
   - Take quiz based on the module
   - View Score
  
  ### Admin
   - Add Modules
   - Add modules questions
   - Edit/ update questions
   - Delete questions

## 7. Core features
  ### User features
    - User registration
    - user login
    - View subject modules
    - view modules questions
    - submit answers
    - view score

  ### Admin features
    - Add new questions
    - Edit / updates existing questions
    - delete questions
    - Manage quiz content


## 8. User stories
  - As a user, I want to register so that I can take quizzes.
  - As a user, I want to answer questions based on module i choose so that I can test my knowledge.
  - As an admin, I want to add questions so that quizzes can be updated.


## 9. User Flow
 User Flow:
  Register → Login → select modules → Start Quiz → Submit Answers → View Score

 Admin Flow:
  Login → Add/Edit Questions → Save Questions

## 10. Functional Requirements
- System must allow user registration
- System must allow user login
- System must display quiz modules questions
- System must accept answers
- System must calculate score
- System must store results
- System must allow admin to manage questions

## 11. Non-Functional Requirements
  - System should load quickly
  - Passwords must be encrypted
  - System should handle multiple users


## 12. Scope
 ### Included
  - User quiz system
  - Admin question management
  - Score calculation

 ### Not Included
  - Multiplayer quizzes
  - Mobile application(this will be implemented later)
  - Payment system(this also will be implemented later)

## 13. Definition of Done
Project is complete when:

  - Users can register and login
  - Users can take quiz
  - Scores are calculated correctly
  - Admin can add and manage questions
  - Quiz results are stored in database