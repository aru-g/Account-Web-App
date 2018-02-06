Account-Web-App
===============

A web Application to demonstrate read and display, as well as add data to a database using Node.js, Express, MySQL and Angular.  Node.js is used for API, Express as web server, MySQL as data store, and Angular for presentation.

#Required

-nodejs version 4.4.1 or higher

#NPM Packages

express: ^4.10.6

mysql: ^2.5.4

body-parser: ^1.15.1

#Install
1.  Download code. Extract all the files.

2. Create a mysql database as follows -
				1. It has one table called account.
				2. The table account has 3 columns - acc_name of type varchar, master_acc_name of type varchar, and region of type varchar.

3.  Edit **server.js** lines **16 , 17 & 18** with the username , password and name of your MySQL database.
		
4.  Via command line, change directory to extractes folder and run **npm install mysql**, **npm install express** and **npm install body-parser**. These commands install the required packages. 

4.  Type **node server.js** to start the application.

5.  Browse to http://localhost:8081 too see the web app working!

6. Extra Info : Line 25 can be changed in index.html to change the background image.
		Line 56 can be changed in index.html to change the logo.
		You also need to add the corresponding images into the folder public/resources.

