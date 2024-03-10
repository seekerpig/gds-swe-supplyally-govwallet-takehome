import { IRedemptionRepository } from "./IRedemptionsRepository";
import { Redemption } from "../model/Redemption";
import fs from "fs";
import csv from "csv-parser";
import path from "path";
/**
 * Represents a repository for managing redemptions.
 */
export class RedemptionRepository implements IRedemptionRepository {
    public _redemptions: Redemption[];

    /**
     * Constructs a new instance of the RedemptionRepository class.
     */
    constructor() {
        this._redemptions = [];
        fs.createReadStream(path.join(__dirname, "..", "..", "data", "redemptions.csv"))
            .pipe(csv())
            .on("data", (row) => {
                this.addNewRedemption(row.teamID, new Date(Number(row.redeemedAt)));
            })
    }

    /**
     * Adds a new redemption to the repository.
     * @param teamID - The ID of the team.
     * @param date - The date of redemption.
     */
    addNewRedemption(teamID: string, date: Date): void {
        if (!this.checkTeamRedeemed(teamID)) {
            let newRedemption = new Redemption(teamID, date);
            this._redemptions.push(newRedemption);
        }
    }

    /**
     * Checks if a team has already been redeemed.
     * @param teamName - The name of the team.
     * @returns True if the team has been redeemed, false otherwise.
     */
    checkTeamRedeemed(teamName: string): boolean {
        return this._redemptions.some((redemption) => redemption.teamID === teamName);
    }

    /**
     * Saves the redemptions to a CSV file.
     */
    saveRedemptions() {
        const data = this._redemptions.map((redemption) => {
            return {
                teamID: redemption.teamID,
                redeemedAt: redemption.redeemedAt,
            };
        });

        const csvData = [
            ["teamID", "redeemedAt"],
            ...data.map((redemption) => [redemption.teamID, redemption.redeemedAt.getTime()]),
        ];

        const csvString = csvData.map((row) => row.join(",")).join("\n");

        fs.writeFileSync(path.join(__dirname, "..", "..", "data", "redemptions.csv"), csvString);
    }
}
