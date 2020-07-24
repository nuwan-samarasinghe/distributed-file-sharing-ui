# DistributedFileSharingUI


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.1.

---
## To Run the Development server

### Step 01: Install Dependencies
Install node dependencies using `npm install` command.

### Step 02: Run the Application
Use `ng serve` for run the front end web application.
### Step 03: Open Application in Browser
Navigate to `http://localhost:4200/`.

---
## To Build the Application

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

---
## View Specified Node(Node Other Than Current Node) Data(Routing table,Files..etc)
If you need to change connecting node please change the following files (``environment.ts``) ``distributed_file_sharing_app_service`` property with relevant service IP & PORT
EX: ``distributed_file_sharing_app_service: 'https://<ip>:<port>'``
then start the server different port ``ng serve --port 4401``
