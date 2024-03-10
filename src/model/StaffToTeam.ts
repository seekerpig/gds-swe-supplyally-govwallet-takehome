/**
 * A class that maps a staff to a team.
 * Note: Each staff belongs only to one and only one team.
 */
export class StaffToTeam {
    private _staffPassID: string;
    private _teamID: string;
    private _createdAt: Date;

    constructor(staffPassID: string, teamID: string, createdAt: Date) {
        this._staffPassID = staffPassID;
        this._teamID = teamID;
        this._createdAt = createdAt;
    }

    /**
     * Gets the staff pass ID of mapping
     * @returns The staff pass ID of current mapping
     */
    getStaffPassID(): string {
        return this._staffPassID;
    }

    /**
     * Sets the staff pass ID of mapping
     * @param staffPassID - Staff Id of current mapping
     */
    setStaffPassID(staffPassID: string): void {
        this._staffPassID = staffPassID;
    }

    /**
     * Gets the team ID of mapping
     * @returns Team ID of current mapping
     */
    getTeamID(): string {
        return this._teamID;
    }

    /**
     * Set the team ID of mapping
     * @param teamID - Team ID of current mapping
     */
    setTeamID(teamID: string): void {
        this._teamID = teamID;
    }

    /**
     * Gets the created date.
     * @returns Created Date
     */
    getCreatedAt(): Date {
        return this._createdAt;
    }
}