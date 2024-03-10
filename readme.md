# Project Structure
The project follows a model, repository structure to reduce coupling between classes. 

- `src/`: Where the source code is
    - `index.ts`: Main app to run - contains the code for the console based app
    - `model/`: Contains the data models
    - `repository/`: Contains the interfaces and repository classes
- `data/`: CSV files that serves as local storage for this project
- `tests/`: Unit tests

The application is a console-based application that the "admin" member interacts with, the admin in charge of providing the redemption services to the representative staff that comes up to them.

Note: new redemptions data is persistent and stored inside redemptions.csv

# To Start App
npm install
and
npm run dev

# To Run Unit tests (using Jest)
npm test

# Assumptions

"System" refers to a client the staff can interact with to:
1. Perform look up of the representative's staff pass ID against the mapping file
2. Verify if the team can redeem their gift by comparing the team name against past
redemption in the redemption data
3. Add new redemption to the redemption data if this team is still eligible for
redemption, otherwise, do nothing and send the representative away

As the mapping file data is in csv format and this is for a take home assignment, I will assume to treat the csv as some form of local database storage, where I will perform the read/writes operations.

In addition, since the only data I have access to is the mapping data, I will assume that each staff and team shown in the staff-id-to-team-mapping.csv actually exists in the database as I am unable to verify against the actual data.

Lastly, I will save redemptions to the data/redemptions.csv file when the user exits (with the 0 input).