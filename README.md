# Prescription-Tracker

Project name: Prescription-Tracker
Render link: https://prescription-tracker-e1wk.onrender.com/ https://prescription-tracker-server.onrender.com/
Repo link: https://github.com/pepnochizzy/Prescription-Tracker

### Team members: 
Lara, Dylan, Nnamdi, Sinéad

### Project description:
An app to track prescriptions and set reminders for when to take/when to reorder

### Problem domain:
People often have different prescription information kept in various locations/on paper. 
They have to remember when to take their prescriptions and when to re-order, which can be difficult when someone is unwell or there are multiple to manage.

### User stories:

🐿️ As a user, I’d like to fill out a working form so that I can submit my prescription information effectively and without issues.

🐿️ As a user, I want the application to work as expected on my mobile device so that I can access and use it conveniently on the go.

🐿️ As a user, I want to easily view all the medications I need to take each day, based on what I have inputted into the form.

🐿️ As a user, I want to be reminded to take each medication at the correct time and date.

🐿️ As a developer, I want to create a working API GET route so that I can retrieve data from the server and display it to the users.

🐿️ As a developer, I want to create a working API POST route so that users can send data to the server and store it.

🐿️ As a developer, I want to create and seed a database with dummy data so that I have realistic test data for development purposes.

### Wireframe:
[Figma](url) 

A list of any libraries, frameworks, or packages that your application requires in order to properly function:
Express.js, pg, cors, vite, dotenv, supabase

## Instructions on how to run your app:
As a user, when you first load the website/app, you will be taken to the homepage. This will display the most important information, and offer navigation to other pages with different purposes. The information on the homepage shows which of the current day's prescriptions are still left to take, as well as the current day's prescriptions the user has already taken. Underneath this there are some buttons that allow the user to access multiple of their trackers, although different trackers for different functions are a future feature, as for now the app is based around one type of tracker. The top nav bar (bottom of screen on mobile) is all about navigating around the app, in order to add a prescription to your tracker, the user must click the "new tracker" button. This will take the user to a form in which they fill out all the necessary information for the reminder feature to work. To see a more in depth look at all the prescriptions in the tracker, the user can click the "see tracker" button, this will then display a more detailed look at the prescription tracker. It still contains the "left to take" and "already taken" sections from the homepage, but also contains a "prescription overview" section, which lists all added prescriptions, regardless of whether they are prescriptions that are/were needed on the current day. The user can click on the name of the prescription in order to see all relevant information about that medication.

### Lighthouse report: 
Screenshots saved in: [Figma](url) 

### Reflections:

# Please mention the requirements you met and which goals you achieved for this assignment.
- The application must include both client-side and server-side code. ✔️
- Ensure the application is fully responsive and works across modern browsers. ✔️
- Use Express.js to set up your server and define API endpoints. ✔️
- Use Supabase with the PG library for database operations. ✔️
- Implement async/await and the Fetch API for non-blocking database operations and API calls. ✔️
- Demonstrate an understanding of database design, relationships, and SQL queries. ✔️
- Design and Planning: Create wireframes and plan the layout and functionality of your web application.
      We were able to create wireframes and plan our layout, this was followed throughout the project.     
- Front-End Development: Develop the user interface with HTML and CSS, focusing on a responsive and intuitive design.
      Our project uses html and css to offer a paired back, clinical design. We opted for simplicity to make our product accessible for a wide range of users. We believe it is easy to navigate and understand.
- Interactivity: Implement dynamic content on the front end using vanilla JavaScript for DOM manipulation.
      We have used DOM manipulation for showing prescriptions on the page alongside the times to take or when they were taken. Once the medicine has been taken, they move into the correct divs. We also chose to show a snapshot of the tracker on the homepage for simplicity and ease of access.
- Back-End Development: Build a server with Express that handles HTTP requests and communicates with a Postgres database.
      We have a server that connects to a Supabase database, this is where all prescription info is stored. In an upscaled version of this app we would have to have tables for each user and secure them to protect data. Currently our app is designed as though you are one user that has logged in.
- Database Integration: Design a database and use Postgres to store, update, and retrieve data efficiently using SQL queries.
      A link to the screenshot is in Figma, this shows the database/table used. Our form section is able to send data to the database whilst the homepage and tracker page are able to collect the data and display it dynamically.
- Collaboration: Work as a team to design and build a web application that showcases your skills in full-stack development, and collaborate on code using Git and GitHub.
      For the most part, we were able to maintain communication and follow our original plans. Our GitHub collaboration became very strong, we knew how to merge and pull appropriately alongside reviewing eachother's code.
      As a team we were able to provide solutions when group members asked for help.

## Link to trello 
(https://trello.com/b/stVUuv6n/prescription-tracker-week5)

Nnamdi
🎯 Were there any requirements or goals that you were not quite able to achieve?

🎯 If so, could you please tell us what was it that you found difficult about these tasks?

What went really well and what could have gone better?
Detailing useful external sources that helped you complete the assignment (e.g Youtube tutorials).
Describing errors or bugs you encountered while completing your assignment.
 - found creating the new pages with Vite was a struggle to begin with, I (Lara) watched a few videos:
 - https://youtu.be/e60d_M-p8nc?si=aWIQjVJqKRYi7tCh
 - https://youtu.be/STeKBm67l6M?si=eh0MclzsyIlU2ogQ
 - In the end we found that the issue was the paths we were using in the viteConfigs file and after that, they worked as intended!
Other sources used:
- https://youtu.be/e_-fdmvIr4A?si=E5eat-JuMVEQKv6_
- https://youtu.be/0JQASwPuNB0?si=MbukC1wvbGpsEUKb

## Logo
<img width="auto" height="300" alt="calender week5" src="https://github.com/user-attachments/assets/532f09be-7295-4ff5-9cee-6f25030b4fe6" />


References:
Third-party APIs, CSS resets, icons, images...
font awesome for icons and google fonts for our font. Both linked in HTML files/CSS files
logo drawn by Lara
Database link : https://supabase.com/dashboard/project/ipliflxnsrexlihnjfwj/database/schemas
Database Schema : <img width="179" height="181" alt="6a1731cace5f131362cc54f8b342f204" src="https://github.com/user-attachments/assets/283a58c6-788f-42cf-80fd-0336b0f8ff5d" />

