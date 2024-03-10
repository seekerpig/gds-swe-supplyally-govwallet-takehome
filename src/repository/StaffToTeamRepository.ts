import { StaffToTeam } from "../model/StaffToTeam";
import { IStaffToTeamRepository } from "./IStaffToTeamRepository";
import fs from "fs";
import csv from "csv-parser";
import path from "path";

/**
 * Represents a repository for managing staff-to-team mappings.
 */
export class StaffToTeamRepository implements IStaffToTeamRepository {
    private _mappings: StaffToTeam[];

    constructor() {
        this._mappings = [];
        fs.createReadStream(path.join(__dirname, "..", "..", "data", "staff-id-to-team-mapping-long.csv"))
            .pipe(csv())
            .on("data", (row) => {
                this.addNewStaffMapping(row.staff_pass_id, row.team_name, row.created_at);
            })
            .on("end", () => {
                //console.log("Populated staff to team mapping from CSV file.");
            });
    }

    /**
     * Adds a new staff-to-team mapping.
     * @param staffID - The ID of the staff member.
     * @param teamID - The ID of the team.
     * @param dateTime - The date and time when the mapping was created.
     */
    public addNewStaffMapping(staffID: string, teamID: string, dateTime: Date): void {
        let newMapping = new StaffToTeam(staffID, teamID, dateTime);
        this._mappings.push(newMapping);
    }

    /**
     * Retrieves the staff-to-team mapping for a given staff pass ID.
     * @param staffPassId - The staff pass ID.
     * @returns The staff-to-team mapping, or undefined if not found.
     */
    public getStaffMappingByStaffPassId(staffPassId: string): StaffToTeam | undefined {
        return this._mappings.find((mapping) => mapping.getStaffPassID() === staffPassId);
    }

    /**
     * Retrieves all staff-to-team mappings.
     * @returns An array of staff-to-team mappings.
     */
    public getAllStaffMappings(): StaffToTeam[] {
        return this._mappings;
    }
}
