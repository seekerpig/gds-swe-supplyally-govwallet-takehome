/**
 * A class to represent a redemption record, to indicate that a prize has been redeemed by a team.
 * Contains two fields, teamID and redeemedAt.
 */
export class Redemption {
    private _teamID: string;
    private _redeemedAt: Date;

    constructor(teamID: string, redeemedAt: Date) {
        this._teamID = teamID;
        this._redeemedAt = redeemedAt;
    }

    get teamID(): string {
        return this._teamID;
    }

    set teamID(value: string) {
        this._teamID = value;
    }

    get redeemedAt(): Date {
        return this._redeemedAt;
    }

    set redeemedAt(value: Date) {
        this._redeemedAt = value;
    }
}