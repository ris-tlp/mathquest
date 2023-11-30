# MathQuest - Mathematics Learning Management System

![mathquest-home](https://github.com/ris-tlp/mathquest/assets/62342666/bba6443e-b2e8-483c-8c8b-c4920edc2cf2)

## Contents
* [Overview](https://github.com/ris-tlp/mathquest#overview)<br>
* [How to get started with MathQuest](https://github.com/ris-tlp/mathquest#how-to-get-started-with-mathquest)<br>
* [Features](https://github.com/ris-tlp/mathquest#features)<br>
* [High-Level System Architecture](https://github.com/ris-tlp/mathquest#high-level-system-architecture)<br>
* [Technology Stack](https://github.com/ris-tlp/mathquest#technology-stack)<br>
* [API Endpoints](https://github.com/ris-tlp/mathquest#api-endpoints)<br>
* [Development Setup](https://github.com/ris-tlp/mathquest#development-setup)<br>
* [Test Results](https://github.com/ris-tlp/mathquest#test-results)<br>
* [Contributors/ Team Members](https://github.com/ris-tlp/mathquest#contributor-team-members)<br>
* [Frequently Asked Questions](https://github.com/ris-tlp/mathquest#frequently-asked-questions)<br>


## Overview
__MathQuest__ is an online learning management system designed specifically to deliver math courses and curriculum in an asynchronous format, allowing students to learn at their own pace. It provides capabilities for instructors to create course offerings, design quizzes and assignments, grade student work automatically, facilitate text discussions, and continually update course content, while students can browse courses, register, take assessments, participate in discussions with classmates, and track their progress. The system architecture employs a combination of MVC, client-server, and microservices patterns to enable a scalable, extensible, and modular platform that can handle multiple concurrent users.


## How to get started with MathQuest
Student Flow:

![Student Flow](https://github.com/ris-tlp/mathquest/assets/62342666/6e51a4c1-d15c-46b1-99a0-fcb0c2c66786)

Instructor Flow:

![Instructor Flow](https://github.com/ris-tlp/mathquest/assets/62342666/cfa4afff-d5aa-4e35-9bef-21d2e9a16888)

Admin Flow:

![Admin Flow](https://github.com/ris-tlp/mathquest/assets/62342666/29f56c6d-ca6c-4d06-a48d-c01e654eda8b)


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

| Endpoint                                          | Description                                                        | Type             |
|---------------------------------------------------|--------------------------------------------------------------------|------------------|
| `/api/users/login`                                | Authenticates a user for the MathQuest system.                     |               POST   |
| `/api/users/signup`                               | Creates a new User for the MathQuest system.                                            |          POST        |
| `/api/courses`                                    |  Gets a list of all available published courses.                                                                 |           POST       |
| `/api/courses/teachers/getAllCourses`             |  Gets a list of all courses created by a teacher.                                                         |              POST    |
| `/api/courses/registered/getRegisteredUsers`      |        Gets a list of registered users within a specific course.                                                            |  POST                |
| `/api/courses/hideCourse`                         |     Hides or un-publishes a course from the list of available courses.                                                           |       POST           |
| `/api/courses/filterCoursesByStatus`              |     Fetches a list of courses according to their Request Status                                                               |              POST    |
| `/api/courses/changeRequestStatus`                |     Changes the Request Status of a course.                                                           |            POST      |
| `/api/courses/quizzes/grades/gradeQuiz`           |   Grades and calculates the total points earned by a student after submitting a quiz.                                                                 |        POST          |
| `/api/courses/registered`                         |   Gets a list of courses that a student is registered in.                                                                 |   POST               |
| `/api/courses/registered/new`                     |     Registers a student in a new course.                                                               |         POST         |
| `/api/courses/discussions/getAllThreads`          |   Gets a list of threads created by students within a specific course. |          POST        |
| `/api/courses/discussions/getAllReplies`          |  Get a list of replies created by students in a specific thread.                                                                  |               POST   |
| `/api/courses/discussions/createThread`           |  Creates a new thread within a course.                                                                  |      POST            |
| `/api/courses/discussions/createReply`            |    Creates a new reply to an existing thread.                                                                |       POST           |
| `/api/courses/quizzes/getAllQuizzes`              |   Gets a list of quizzes for a specific course.                                                       |            POST      |
| `/api/courses/quizzes/getQuiz`                    |     Gets a specific quiz, all questions and their options for a specific course.                                                              |   POST               |


## Development Setup

You need to clone (download) the repository to your local machine using the below command in the terminal
```bash
   $ git clone https://github.com/ris-tlp/mathquest.git
```
> This makes a local copy of the repository in your machine

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
then follow the below part 1 and part 2 to start the `MathQuest` application in your development environment.

### Part 1
First, navigate to the `mathquest-client` folder 
```bash
   cd mathquest-client
```
Then, let us install the dependencies required on the client side of the Mathquest application.

```bash
   npm install
```
> The above command installs the dependencies mentioned in the `package-lock.json` file of `mathquest-client`

Now, we can start the application using the below command:
```bash
   npm run start
```

### Part 2
First, navigate to the `server` folder 
```bash
   cd server
```
Then, let us install the dependencies required on the server side of the Mathquest application.

```bash
   npm install
```
> The above command installs the dependencies mentioned in the `package-lock.json` file of `server`

Run the below command to start the mathquest `server`
```bash
   npm run dev
```

If everything is up and running, you should see the home page of `MathQuest` application running on `localhost`

## Test Results
<img width="1400" height="700" src="https://github.com/ris-tlp/mathquest/assets/62342666/ac929fb6-6c6c-4421-a3d0-bc565da93ba5">

## Contributor/ Team Members
| Team Member Name                               |	Linkedin          |
|------------------------------------------------| -------------------|
| Anand Verma                                    | [![Linkedin](https://i.stack.imgur.com/gVE0j.png) Anand](https://www.linkedin.com/in/anandverma08/)                   |
| Tharun Kumar Reddy Polu	                      | [![Linkedin](https://i.stack.imgur.com/gVE0j.png) Tharun](https://www.linkedin.com/in/polu-tharun-kumar-reddy/)        |
| Omar Khan	                                     | [![Linkedin](https://i.stack.imgur.com/gVE0j.png) Omar](https://www.linkedin.com/in/omar-pk/)                   |
| Ashwini Gour                                   | [![Linkedin](https://i.stack.imgur.com/gVE0j.png) Ashwini](https://www.linkedin.com/in/ashwinigour/)                   |
| Cydni Turner                                   | [![Linkedin](https://i.stack.imgur.com/gVE0j.png) Cydni](https://www.linkedin.com/in/cydni-turner-775b82115)                  | 

## Frequently Asked Questions
__1. What types of math courses does MathQuest offer?__<br>
Ans: MathQuest offers a wide variety of math courses including Algebra, Geometry, Trigonometry, Calculus, Statistics, and more. Courses are available for middle school, high school, college prep, and college levels.

__2. Do I need any special software or hardware to use MathQuest?__<br>
Ans: No, MathQuest is a web-based platform that works on any modern web browser. The only requirement is an internet connection.

__3. How do I register for courses on MathQuest? Is there an enrollment period?__<br>
Ans: You can register for courses at any time by creating a student account on our platform. There is no enrollment period - you can sign up and start courses immediately.

__4. Can I access MathQuest on my phone or tablet?__<br>
Ans: Yes, MathQuest is mobile-friendly and can be accessed from any device with a web browser including phones and tablets. This allows for on-the-go learning.

__5. Are there options for getting help if I have questions on course material or assessments?__<br>
Ans: Yes, students can access discussion forums for each course to ask questions and interact with instructors or peers for help. Additionally, students can utilize 1-on-1 video chat options with instructors to ask questions.

__6. Does MathQuest provide accommodations for students with disabilities?__<br>
Ans: Yes, we provide closed-captioning for videos, screen reader compatibility, enhanced fonts/contrast options, alternative input options for quizzes/exams, and the ability to make other necessary accommodations.

__7. Is MathQuest accredited? Will course credits transfer to my university?__<br>
Ans: MathQuest itself is not an accredited program. However, most courses are designed to align with curriculum standards and prepare students for accredited exams that can earn future college credits at many institutions.

__8. Can I interact with the instructor and other students taking the same course? Is there a community component?__<br>
Ans: MathQuest courses include community discussion forums where you can interact with peers and instructors taking the course.

## Help us improve the project

Please discuss your concerns with Math Quest Team members before creating a new issue.<br>

_Please `STAR` the repository if you like the content and code_ <br>
_Also enable the `WATCH` button to keep watching the updates on the repository_
