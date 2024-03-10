/**
 * A class to represent a redemption record, to indicate that a prize has been redeemed by a team.
 * Contains two fields, teamID and redeemedAt.
 */
/**
 * Represents a redemption.
 */
export class Redemption {
    private _teamID: string;
    private _redeemedAt: Date;

    /**
     * Creates a new Redemption instance.
     * @param teamID - The ID of the team.
     * @param redeemedAt - The date and time when the redemption occurred.
     */
    constructor(teamID: string, redeemedAt: Date) {
        this._teamID = teamID;
        this._redeemedAt = redeemedAt;
    }

    /**
     * Gets the ID of the team.
     * @returns The team ID.
     */
    get teamID(): string {
        return this._teamID;
    }

    /**
     * Sets the ID of the team.
     * @param value - The team ID.
     */
    set teamID(value: string) {
        this._teamID = value;
    }

    /**
     * Gets the date and time when the redemption occurred.
     * @returns The redemption date and time.
     */
    get redeemedAt(): Date {
        return this._redeemedAt;
    }

    /**
     * Sets the date and time when the redemption occurred.
     * @param value - The redemption date and time.
     */
    set redeemedAt(value: Date) {
        this._redeemedAt = value;
    }
}