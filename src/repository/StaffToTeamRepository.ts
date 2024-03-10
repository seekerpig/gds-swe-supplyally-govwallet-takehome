import { StaffToTeam } from "../model/StaffToTeam";
import { IStaffToTeamRepository } from "./IStaffToTeamRepository";
import fs from "fs";
import csv from "csv-parser";
import path from "path";

export class StaffToTeamRepository implements IStaffToTeamRepository {
    private _mappings: StaffToTeam[];

    constructor() {
        this._mappings = [];
        fs.createReadStream(path.join(__dirname, "..", "..", "data", "staff-id-to-team-mapping-long.csv"))
            .pipe(csv())
            .on("data", (row) => {
                // const data = JSON.parse(JSON.stringify(row));
                // console.log(data["staff_pass_id"], data["team_name"], data["created_at"]);
                this.addNewStaffMapping(row.staff_pass_id, row.team_name, row.created_at);
            })
            .on("end", () => {
                //console.log("Populated staff to team mapping from CSV file.");
            });
    }

    public addNewStaffMapping(staffID: string, teamID: string, dateTime: Date): void {
        let newMapping = new StaffToTeam(staffID, teamID, dateTime);
        this._mappings.push(newMapping);
    }

    public getStaffMappingByStaffPassId(staffPassId: string): StaffToTeam | undefined {
        return this._mappings.find((mapping) => mapping.getStaffPassID() === staffPassId);
    }

    public getAllStaffMappings(): StaffToTeam[] {
        return this._mappings;
    }
}
