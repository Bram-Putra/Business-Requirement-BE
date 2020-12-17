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
If we look at the one-to-one relationship,
we can also move all attributes from Profile to Candidate.
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
| - active: boolean    |
+----------------------+

The front end is business-requirement-fe.
