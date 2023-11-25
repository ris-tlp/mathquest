# MathQuest - Mathematics Learning Management System

![mathquest-home](https://github.com/ris-tlp/mathquest/assets/62342666/bba6443e-b2e8-483c-8c8b-c4920edc2cf2)

## Contents
[1. Overview](https://github.com/ris-tlp/mathquest/edit/main/README.md#overview) <br>
[2. How to get started with MathQuest]()<br>
[3. Features]()<br>
[4. High-Level System Architecture]()<br>
[5. Technology Stack]()<br>
[6. API Endpoints]()<br>
[7. Development Setup]()<br>
[8. Test Results]()<br>
[9. Contributors/ Team Members]()<br>
[10. Frequently Asked Questions]()<br>


## Overview
MathQuest is an e-Learning Management System designed to facilitate math courses. It allows for the tracking, automation, administration, and delivery of math courses in an asynchronous online environment.

Key features include:

* Course offerings and registration: Instructors can create course offerings that students can browse and register for. This includes publishing detailed course information like syllabus, modules, assessments, etc.<br>
* Course content and curriculum: Instructors can create and manage course content including modules, quizzes, assignments, and syllabus.<br>
* Assessments and grading: Quizzes can be created, automatically graded, and feedback provided to students. Overall course grades are calculated.<br>
* Discussions: Students and instructors can engage in threaded discussions within a course.<br>
* User roles and permissions: The system supports student, instructor, and administrator roles with appropriate access controls.<br>
* Administrative capabilities: Admins can approve/reject course requests, manage instructors, and moderate content.<br>


## API Endpoints
Anything within `<angular brackets>` is a parameter.

### User
| Endpoint                     | Description                                                        | Type             |
|------------------------------|--------------------------------------------------------------------|------------------|
| `/api/users/login`          | Authenticates a user for the MathQuest system.                      | `POST`            |
| `/api/users/signup`         | Create a new user.                                                 | `POST`           |
| `/api/users/<userId>`       | Fetches user information through a User ID.                        | `GET`           |

