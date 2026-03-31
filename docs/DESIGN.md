# DESIGN DOC - Quiz App

## 1. System Architecture

Frontend (React) → Backend (Express/Node.js) → Database (MongoDB)

User → React Pages → API Requests → MongoDB

## 2. Front Pages

### Home Page( introduce the quiz app with links to register page)

## Register Page

## login page

## quiz page

## Result page

## Admin Dashboard

## Add modules & questions page

## manage questions page

## 3. Backend Modules

- Auth Module (Authentication — login/signup(using clerk))
- Quiz Module (both modules & questions)
- Result Module
- Admin Module

## 4. Database Design

### Users Collection

- name
- email
- password( hashed password )

### Modules Collection

- years of study
- semester number( i or ii etc)
- modules names ( to be selected by users)

### Questions Collection(based on modules)

- questionText
- options
- correctAnswers

### result collections

- UserId
- score
- date

## 5. API Routes

### User Routes

- POST /api/register
- POST /api/login
- GET /api/modules
- GET /api/questions
- POST /api/submit-quiz
- GET api/results

### Admin Routes

- POST /api/modules/add
- DELETE /api/modules/delete
- POST /api/questions/add
- POST /api/questions/update/:id
- DELETE /api/questions/delete/:id
- GET /api/questions

## 6. Quiz Flow Logic

User logs in
→ System loads modules from MongoDB
→ User selects the modules to be asked questions with
→ system loads the modules questions - Use select answers
→ System calculates score
→ Score saved to Results collection
→ Result displayed to user

## 7. Folder Structure

frontend/
├── components/
├── pages/
├── services/

backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── app.js
├── server.js

## 8. State Management

- UI State: React useState
- Global/Auth State: React Context
- API/Server State: TanStack Query

## 9. Color & Typography

### Design System Strategy: The Luminous Scholar

1. Overview & Creative North Star
   The "Luminous Scholar" is the creative North Star for this design system. It moves away from the sterile, "template-driven" feel of standard educational apps toward an editorial, high-end digital experience. The system is defined by Atmospheric Depth and Intentional Asymmetry.
   We reject the rigid, boxed-in grid. Instead, we treat the UI as a series of floating, translucent layers of intelligence. By utilizing glassmorphism and high-contrast typography, we create an environment that feels both authoritative and breathable. The goal is to make the act of learning feel like a premium, frictionless journey rather than a digital chore.

---

2. Colors & Surface Architecture
   This system relies on tonal depth rather than structural lines to define hierarchy.
   The "No-Line" Rule
   Explicit Instruction: Designers are prohibited from using 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts. Use `surface-container-low` for secondary sections sitting on a `surface` background. This creates a sophisticated, "borderless" interface that feels expansive.
   Surface Hierarchy & Nesting
   Treat the UI as physical layers of frosted glass.
   Base Layer: `surface` (#faf4ff)
   Content Blocks: `surface-container-low` (#f5eeff)
   High-Focus Elements: `surface-container-highest` (#e2d7ff)
   Floating UI: Use semi-transparent versions of `surface-container-lowest` (#ffffff) with a 20px backdrop blur to achieve a premium Glassmorphism effect.
   Signature Textures & Gradients
   Main CTAs and Hero sections must not be flat. Use a subtle linear gradient (135°) transitioning from `primary` (#4a40e0) to `primary-container` (#9795ff). This provides a visual "soul" and depth that differentiates the app from generic SaaS platforms.

---

3. Typography: The Editorial Voice
   We use a dual-typeface system to balance character with extreme readability.
   Display & Headlines (Plus Jakarta Sans): These are the "hero" moments. Use `display-lg` and `headline-lg` with tight letter-spacing (-0.02em) to create a bold, authoritative impact. This typeface brings the "Edu-Tech" personality.
   Body & Labels (Inter): For everything else. Inter provides the high-performance legibility required for quiz questions and explanations.
   Contrast as Hierarchy: Pair a `headline-sm` (Plus Jakarta Sans, Bold) with `body-md` (Inter, Regular) at `on-surface-variant` (#5f557f) to create a clear, sophisticated distinction between headers and secondary info.

---

4. Elevation & Depth: Tonal Layering
   We do not use "shadows" in the traditional sense; we use Ambient Glows.
   The Layering Principle: To lift a quiz card, place a `surface-container-lowest` card on a `surface-container-low` section. The change in hex code provides the "lift."
   Ambient Shadows: If a floating element (like a modal) requires a shadow, it must be `on-surface` (#32294f) at 6% opacity with a 32px blur and 8px Y-offset. This mimics natural light.
   The "Ghost Border" Fallback: If a divider is mandatory for accessibility, use the `outline-variant` (#b2a6d5) at 15% opacity. Never use 100% opaque lines.
   Glassmorphism: Apply to floating navigation bars or score overlays. Use `surface-container-lowest` at 70% opacity with a `backdrop-filter: blur(12px)`.

---

5. Components & Interaction
   Buttons
   Primary: Gradient (Primary to Primary-Container), `xl` (1.5rem) rounded corners. Text: `label-md` in `on-primary` (#f4f1ff).
   Secondary: `surface-container-high` (#e8deff) background with `primary` (#4a40e0) text. No border.
   Quiz Cards
   Structure: No borders. Use `surface-container-low` for the card body.
   Active State: When a user selects an answer, transition the card background to `secondary-container` (#dcc9ff) and add a `primary` "Ghost Border" at 20% opacity.
   Spacing: Use `spacing-6` (2rem) for internal padding to ensure the content "breathes."
   Inputs & Progress
   Input Fields: Use `surface-container-lowest` with a subtle `outline-variant` Ghost Border. On focus, the border opacity increases to 40% using the `primary` color.
   Progress Bars: The track should be `surface-container-highest`. The filler should be a vibrant gradient of `secondary` (#702ae1) to `tertiary-container` (#fd8bca).
   Chips (Category Tags)
   Small, `full` (9999px) roundedness. Use `tertiary-container` with `on-tertiary-container` text for a pop of "Vibrant Violet" energy.

---

6. Do’s and Don’ts
   Do
   DO use whitespace as a functional element. If a screen feels crowded, increase the vertical spacing using `spacing-10` (3.5rem).
   DO use intentional asymmetry. Align titles to the left but allow imagery or progress rings to break the right-hand margin.
   DO use `surface-tint` sparingly to highlight "Success" or "Correct" states in a way that feels integrated.
   Don't
   DON'T use black (#000000) for text. Always use `on-surface` (#32294f) to maintain the sophisticated deep-indigo tonal palette.
   DON'T use sharp 90-degree corners. The minimum radius is `md` (0.75rem); the standard is `xl` (1.5rem).
   DON'T use standard dividers. Use `spacing-8` (2.75rem) of empty space to separate content chunks instead of a horizontal rule.

lets now implement frontend  
use prd.md, teckstack.md &  
design.md

10. Admin Dashboard UI Architecture
    Dashboard Layout Structure

Admin dashboard uses a three region layout.

Header
Sidebar
Main Content Area

Layout flow

Header stays fixed at top
Sidebar stays fixed on left
Main content scrolls vertically

System flow

Admin → Sidebar Navigation → Management Pages → Database Updates

11. Admin Dashboard Pages
    Dashboard Overview Page

Purpose
Provide quick summary of system activity.

Components

Statistics Cards

Total Modules
Total Questions
Total Users

Recent Activity Panel

Recently added modules
Recently updated questions
Recently registered users

Notification Panel

Messages received from users
Unread message indicator

Modules Management Page

Purpose
Allow admin to create, update, and delete modules.

Features

View all modules
Add new module
Update module
Delete module

Table Columns

Module Name
Semester
Year
Number of Questions
Created Date
Actions

Actions

View Module
Update Module
Delete Module

Add Module Button

Position

Top right of page

Behavior

Opens modal form

Form Fields

Module Name
Year of Study
Semester
Description

Questions Management Page

Purpose
Allow admin to manage quiz questions.

Features

Add question
Update question
Delete question
View questions

Table Columns

Question Text
Module Name
Options Count
Correct Answer
Created Date
Actions

Actions

View Question
Update Question
Delete Question

Add Question Button

Position

Top right

Form Fields

Question Text
Options List
Correct Answer
Module Selector Dropdown

Users Management Page

Purpose
Allow admin to manage users.

Features

View users
Update users
Delete users

Table Columns

User Name
Email
Role
Registration Date
Actions

Actions

View User
Update User
Delete User

User Roles

Admin
User

12. Dashboard Header Design

Header Content Layout

Left Side

Dashboard Title

Example

Admin Dashboard

Right Side

Notification Icons

Messages icon
Notification badge

User Profile Avatar

Click opens dropdown menu

Dropdown Items

Profile
Settings
Logout

Message Notification Behavior

Show unread message count
Badge appears on icon

Used for

Messages sent from users

13. Sidebar Navigation Design

Sidebar must support responsive layout.

Large Screen Behavior

Show icons and labels

Small Screen Behavior

Show icons only

Sidebar Width

Large Screen

260px

Small Screen

72px

Sidebar Sections

Top Section

Logo
Application name

Middle Section

Navigation Links

Dashboard
Modules
Questions
Users

Bottom Section

Logout button

14. Sidebar Navigation Links

Required Navigation Links

Dashboard

Used to view statistics

Modules

Used to manage modules

Questions

Used to manage questions

Users

Used to manage users

Each Link Must Include

Icon
Text label

Small screen

Show icon only

Active State

Highlight selected menu

Hover Behavior

Background highlight

15. CRUD Interaction Design

All admin data must support full CRUD operations.

CRUD Actions

Create
Read
Update
Delete

Each table must support:

Search
Pagination
Sorting
Filtering

Delete Behavior

Show confirmation modal

Update Behavior

Preload existing data

Create Behavior

Open modal form

16. Admin Tables Design

All management pages use table layouts.

Table Features

Sticky table header
Row hover highlight
Alternating row backgrounds

Pagination

Bottom of table

Search

Top left

Filter

Top right

Filters Examples

Filter by module
Filter by role

17. Modal System Design

Modals are used for:

Add Module
Add Question
Update Module
Update Question
Delete Confirmation

Modal Layout

Header

Modal Title

Body

Form Inputs

Footer

Action Buttons

Buttons

Save
Cancel
Delete

18. Notification System

Used for user communication.

Notification Sources

Messages from users

Displayed In

Header notification icon

Notification Features

Unread badge
Message preview
Clickable message list

Optional Future Feature

Admin reply to messages

19. Admin Dashboard Component List

Reusable Components Required

DashboardLayout

Header

Sidebar

SidebarItem

NotificationIcon

UserDropdown

StatsCard

DataTable

TableRow

ActionButtons

Modal

FormInput

SelectDropdown

Pagination

SearchInput

FilterDropdown

20. Admin Dashboard UX Flow

Admin Login Flow

Admin logs in
→ Dashboard loads
→ System fetches stats
→ Sidebar navigation appears

Modules Flow

Admin opens Modules page
→ System loads module list
→ Admin clicks Add
→ Modal opens
→ Admin submits module
→ Database updated

Questions Flow

Admin selects Questions
→ List loads
→ Admin edits question
→ Modal opens
→ Updates saved

Users Flow

Admin selects Users
→ User list loads
→ Admin updates role
→ Changes saved

21. Responsive Behavior

Desktop

Full sidebar visible
Labels and icons shown

Tablet

Sidebar collapses partially

Mobile

Sidebar icons only
Header remains visible

Tables

Scrollable horizontally

22. Future Enhancement Ready Features

Recommended for later expansion.

Charts Dashboard

Questions per module
User growth trend

Activity Logs

Track admin actions

Export Features

Export results to CSV

Bulk Upload

Upload multiple questions using file

Real Time Messaging

Admin responds to user messages

23. Question Creation Dependency Rule

Core Rule

Questions must always belong to a module.
Admin must select a module first before adding any question.
Question creation must depend on moduleId.

System Flow

Admin opens Questions page
→ System loads Modules list
→ Admin selects a module
→ System loads questions for selected module
→ Admin adds questions under that module

No question must exist without moduleId.

24. Questions Page Layout Structure

Page Layout Sections

Module Selector Section
Questions Table Section
Add Question Section

Layout Flow

Top Section
Module selection dropdown

Middle Section
Questions table filtered by module

Top Right Section
Add Question button

25. Module First Selection UI

Module Selector Component

Position

Top left of Questions page

Component Type

Dropdown selector

Label

Select Module

Behavior

Load all modules from database.
Display module names in dropdown.

Example Dropdown Items

Mathematics
Physics
Computer Science
Chemistry

Required Behavior

No module selected

Disable Add Question button
Hide questions table
Show message

Example Message

Select a module to view or add questions

After Module Selected

Load questions belonging to selected module
Enable Add Question button

26. Questions Table Filtering Logic

Questions must load based on selected moduleId.

Data Fetch Logic

GET /api/questions?moduleId=selectedModuleId

Table Updates

Reload automatically when module changes

Table Columns

Question Text
Options Count
Correct Answer
Created Date
Actions

Actions

View
Update
Delete

27. Add Question Modal Design

Modal must inherit selected moduleId automatically.

Modal Behavior

Admin clicks Add Question
→ Modal opens
→ Selected moduleId is attached automatically
→ Admin fills question details

No module dropdown inside modal if module already selected.

Required Form Fields

Question Text
Options list
Correct Answer

Hidden Field

moduleId

This value comes from selected module.

28. Update Question Modal Logic

When updating question:

System loads existing question
System keeps original moduleId
Admin edits content only

Editable Fields

Question Text
Options
Correct Answer

Non Editable

moduleId

29. Question Creation Validation Rules

Validation Conditions

Module must be selected
Question text required
Minimum 2 options required
At least 1 correct answer required

If module not selected:

Show error message

Example

Please select a module before adding questions

30. API Behavior for Module Based Questions

Required API Pattern

GET Questions by Module

GET /api/questions?moduleId=123

Add Question

POST /api/questions/add

Payload Example

{
"questionText": "What is 2 + 2",
"options": ["2", "3", "4", "5"],
"correctAnswers": ["4"],
"moduleId": "selectedModuleId"
}

Update Question

POST /api/questions/update/:id

Delete Question

DELETE /api/questions/delete/:id

31. UX Improvement Rule

Show module context clearly.

Display Selected Module Name

Above questions table

Example

Questions for Module: Mathematics

This helps admin confirm context before adding questions.

32. Optional Advanced UI Enhancement

Recommended but optional.

Module Tabs Instead of Dropdown

Each module shown as tab

Example

Mathematics | Physics | Chemistry

Click tab

Loads module questions

Improves speed for large module sets.
