(better viewed as raw text)

business-requirement-be

I started working on this project during my time undergoing a mandatory quarantine in Vietnam.
This project can be used as an example to develop a back end application by using Node.js.
This back end service can accommodate business processes as follow:
1. End users can create an account by using their email account.
2. The express-validator is used to build a middleware to do some validations, i.e.:
   - The email address must be valid
   - Must be non-duplicated email address
   - Password must be 6-10 characters
   note: we can add more validations as needed.
3. Once registered, end users can update their profile, e.g. upload a photo and key in some details

Based on Domain-driven Design, the design is as follow:

+--------------------+                          +----------------------+
| Candidate          |                          | Profile              |
+--------------------+                          +----------------------+
| - id: int          |                          | - id: int            |
| - email: String    |                          | - photoPath: String  |
| - password: String |  1                    1  | - givenName: String  |
| - profile: Profile |--------------------------| - familyName: String |
| - active: boolean  |                          | - dob: date          |
+--------------------+                          | - height: int        |
                                                | - weight: float      |
                                                | - address1: String   |
                                                | - address2: String   |
                                                | - city: String       |
                                                | - province: String   |
                                                +----------------------+

We define two domains, Candidate and Profile, to accommodate the future development.
And we will not store any image file in the database.
The "photoPath: String" will store the path to the image file.

In most systems that has a User domain (or Candidate in this design), there are different roles for the User.
For example, a User with an Administrator role will have access to features that are not
available for a User who has the EndUser role.
Or if we are designing a Role-playing game, there will be different roles with different stats
for the player. To accommodate this requirement, the design should be:

+--------------------+                          +----------------------+
| Candidate          |                          | Profile              |
+--------------------+                          +----------------------+
| - id: int          |                          | - id: int            |
| - email: String    |                          | - photoPath: String  |
| - password: String |  1                    1  | - givenName: String  |
| - profile: Profile |--------------------------| - familyName: String |
| - active: boolean  |                          | - dob: date          |                          +--------------------------+
+--------------------+                          | - height: int        |                          | Role                     |
                                                | - weight: float      |                          +--------------------------+
                                                | - address1: String   |                          | - id: int                |
                                                | - address2: String   |                          | - name: String           |
                                                | - city: String       |                          | - modules: List<Module>  |
                                                | - province: String   |  0..*                 1  | - stats: List<Stat>      |
                                                | - role: Role         |--------------------------| - active: boolean        |
                                                +----------------------+                          +--------------------------+

Then the system will also have the Module and Stat domains.
The design with the Role domain will not be used for this back end application. But I hope you get the idea.
For this application, we will use String for role:

+--------------------+                          +----------------------+
| Candidate          |                          | Profile              |
+--------------------+                          +----------------------+
| - id: int          |                          | - id: int            |
| - email: String    |                          | - photoPath: String  |
| - password: String |  1                    1  | - givenName: String  |
| - profile: Profile |--------------------------| - familyName: String |
| - active: boolean  |                          | - dob: date          |
+--------------------+                          | - height: int        |
                                                | - weight: float      |
                                                | - address1: String   |
                                                | - address2: String   |
                                                | - city: String       |
                                                | - province: String   |
                                                | - role: String       |
                                                +----------------------+

If we look at the one-to-one relationship between Profile and Candidate,
we can move all attributes from Profile to Candidate.
Therefore, we can omit the Profile domain.
For this project, we are going to use one domain as follow to make it simpler:

+----------------------+
| Candidate            |
+----------------------+
| - id: int            |
| - email: String      |
| - password: String   |
| - photoPath: String  |
| - givenName: String  |
| - familyName: String |
| - dob: date          |
| - height: int        |
| - weight: float      |
| - address1: String   |
| - address2: String   |
| - city: String       |
| - province: String   |
| - role: String       |
| - active: boolean    |
+----------------------+

These are the APIs
Methods     Urls                   Actions
GET         api/candidates         get all Candidates
GET         api/candidates/:id     get Candidate by id
POST        api/candidates         add new Candidate
PUT         api/candidates/:id     update Candidate by id
DELETE      api/candidates/:id     remove Candidate by id

There are two options for DELETE (api/candidates/:id), namely soft delete and hard delete.
The soft delete will only change the value of attribute active to false.
While the hard delete will remove a record from the database.

To run this back end application, do the following:
 1. Install MySQL on your local machine.
 2. Run MySQL and use your root account.
 3. Create a user as follow:
    - username: resta_user
    - password: resu_atser
 4. Create a database as follow:
    - databasename: resta
 5. Grant all privileges on resta to resta_user.
 6. Quit MySQL.
 7. Install Node.js on your local machine.
 8. Clone this project.
 9. To create the table automatically:
    - open server.js in this project's root directory
    - uncomment lines 19-21
    - comment line 22
    - save the file
    - Sequelize will create a table according to the Model when we run the app
10. Run server.js
11. After the table has been created:
    - stop the app
    - open server.js in this project's root directory
    - comment lines 19-21
    - uncomment line 22
    - save the file
12. Re-run server.js
13. The back end service will run on your local machine with port number 8080

For the front end, please refer to https://github.com/Bram-Putra/business-requirement-fe
