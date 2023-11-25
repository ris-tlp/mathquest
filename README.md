# MathQuest - Mathematics Learning Management System

![mathquest-home](https://github.com/ris-tlp/mathquest/assets/62342666/bba6443e-b2e8-483c-8c8b-c4920edc2cf2)

## Contents
* [Overview](https://github.com/ris-tlp/mathquest/edit/main/README.md#overview) <br>
* [How to get started with MathQuest]()<br>
* [Features]()<br>
* [High-Level System Architecture]()<br>
* [Technology Stack]()<br>
* [API Endpoints]()<br>
* [Development Setup]()<br>
* [Test Results]()<br>
* [Contributors/ Team Members]()<br>
* [Frequently Asked Questions]()<br>


## Overview
__MathQuest__ is an online learning management system designed specifically to deliver math courses and curriculum in an asynchronous format, allowing students to learn at their own pace. It provides capabilities for instructors to create course offerings, design quizzes and assignments, grade student work automatically, facilitate text discussions, and continually update course content, while students can browse courses, register, take assessments, participate in discussions with classmates, and track their progress. The system architecture employs a combination of MVC, client-server, and microservices patterns to enable a scalable, extensible, and modular platform that can handle multiple concurrent users.


## How to get started with MathQuest
TO-DO


## Features
Key features of MathQuest LMS include:

* Course offerings and registration: Instructors can create course offerings that students can browse and register for. This includes publishing detailed course information like syllabus, modules, assessments, etc.<br>
* Course content and curriculum: Instructors can create and manage course content including modules, quizzes, assignments, and syllabus.<br>
* Assessments and grading: Quizzes can be created, automatically graded, and feedback provided to students. Overall course grades are calculated.<br>
* Discussions: Students and instructors can engage in threaded discussions within a course.<br>
* User roles and permissions: The system supports student, instructor, and administrator roles with appropriate access controls.<br>
* Administrative capabilities: Admins can approve/reject course requests, manage instructors, and moderate content.<br>

## High Level System Architecture
<img src="https://github.com/ris-tlp/mathquest/assets/62342666/665fc681-e46e-4b31-91d9-95f5900546e8" width="800" height="1000">

## Technology Stack
| Engineering Activity                             |	Selected Tool(s)  |
|--------------------------------------------------| -------------------|
| Version Control	                                 | GitHub             |
| Development IDE	                                 | Visual Studio Code |
| Wireframe & UI Screens	                         | Balsamiq           |
| Project Planning	                               | Microsoft Excel    |
| Diagramming	                                     | LucidChart         |
| Frontend	                                       | React              |
| Backend	                                         | Node.js            |
| Database	                                       | MongoDB            |
| Testing 	                                       | Jest, Karma        |

## API Endpoints
Anything within `<angular brackets>` is a parameter.

### User
| Endpoint                                 | Description                                                        | Type             |
|------------------------------------------|--------------------------------------------------------------------|------------------|
| `/api/users/login`                       | Authenticates a user for the MathQuest system.                      | `POST`            |
| `/api/users/signup`                      | Create a new user.                                                 | `POST`           |
| `/api/users/<userId>`                    | Fetches user information through a User ID.                        | `GET`           |
| `/api/dev`                                |                                                                           | `GET`           |
| `/api/courses`                            |                                                                      | `GET`           |
| `/api/courses/registered`                 |                                                                       | `GET`           |
| `/api/courses/registered/new`             |                                                                  | `GET`           |
| `/api/courses/discussions/`               |                                                                   | `GET`           |
| `/api/courses/discussions/createThread`  |                                                                       | `POST`           |

## Development Setup

You need to clone (download) the repository to your local machine using the below command in the terminal
```bash
   $ git clone https://github.com/ris-tlp/mathquest.git
```
> This makes a local copy of the repository in your machine 📂

  Once you have cloned the `mathquest` repository in Github, move to that folder first using the change directory `cd` command on Linux/ Mac/ Windows
```bash
   $ cd mathquest
```

Then open the terminal inside `mathquest` folder and run the following command
```bash
   $ code .
```

The above command opens the project folder in Visual Studio Code which will be the IDE for Mathquest Development (Feel free to use the IDE of your choice)

Once you have downloaded the source code of MathQuest in your local, make sure `npm` and `node` are installed on your machine,
then run the below commands to start the `mathquest-client`

```bash
   cd mathquest-client
   npm install (Installs the dependency libraries mentioned in package-lock.json)
   npm run start
```
Run the below command to start the mathquest `server`
```bash
   cd server
   npm run dev
```

If everything is up and running, you should see the home page of `mathquest`

## Test Results
TO-DO

## Contributor/ Team Members
| Team Member Name                               |	Linkedin          |
|------------------------------------------------| -------------------|
| Anand Verma                                    |                     |
| Tharun Kumar Reddy Polu	                       |                     |
| Omar Khan	                                     |                     |
| Ashwini Gour                                   |                    |
| Cydni Turner                                   |                    | 

## Frequently Asked Questions
TO-DO

## Help us improve the project

Please discuss your concerns with Math Quest Team members before creating a new issue.<br>

_Please `STAR` the repository if you like the content and code_ <br>
_Also enable the `WATCH` button to keep watching the updates on the repository_
