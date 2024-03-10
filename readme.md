# Project Structure
This project follows a modular structure, with the main codebase located within the `src/` directory. Here's a brief overview of the main directories and files:

- `src/`: This is where the main application code resides.
    - `index.ts`: This is the entry point of the application. It initializes the repositories and starts the console application.
    - `model/`: This directory contains the data models used in the application, such as `Redemption.ts` and `StaffToTeam.ts`.
    - `repository/`: This directory contains the repository classes and interfaces that handle data operations. For example, `RedemptionRepository.ts` and `StaffToTeamRepository.ts` handle operations related to redemptions and staff-to-team mappings, respectively.
- `data/`: This directory contains CSV files that serve as the local database storage for this application.
- `tests/`: This directory is intended for unit tests.

The application is a console-based application that the "admin" member interacts with, the admin in charge of providing the redemption services to the representative staff that comes up to them.

# To Start App
npm run dev


# Assumptions

"System" refers to a client the staff can interact with to:
1. Perform look up of the representative's staff pass ID against the mapping file
2. Verify if the team can redeem their gift by comparing the team name against past
redemption in the redemption data
3. Add new redemption to the redemption data if this team is still eligible for
redemption, otherwise, do nothing and send the representative away

As the mapping file data is in csv format and this is for a take home assignment, I will assume to treat the csv as some form of local database storage, where I will perform the read/writes operations.

In addition, since the only data I have access to is the mapping data, I will assume that each staff and team shown in the staff-id-to-team-mapping.csv actually exists in the database as I am unable to verify against the actual data.