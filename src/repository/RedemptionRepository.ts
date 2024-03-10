import { IRedemptionRepository } from "./IRedemptionsRepository";
import { Redemption } from "../model/Redemption";
import fs from "fs";
import csv from "csv-parser";
import path from "path";

export class RedemptionRepository implements IRedemptionRepository {
    private _redemptions: Redemption[];

    constructor() {
        this._redemptions = [];
        fs.createReadStream(path.join(__dirname, "..", "..", "data", "redemptions.csv"))
            .pipe(csv())
            .on("data", (row) => {
                // const data = JSON.parse(JSON.stringify(row));
                // console.log(data["staff_pass_id"], data["team_name"], data["created_at"]);
                this.addNewRedemption(row.teamID, new Date(row.redeemedAt));
            })
            .on("end", () => {
                //console.log("Populated staff to team mapping from CSV file.");
            });
    }

    addNewRedemption(teamID: string, date: Date): void {
        if (!this.checkTeamRedeemed(teamID)) {
            let newRedemption = new Redemption(teamID, date);
            this._redemptions.push(newRedemption);
        }
    }

    checkTeamRedeemed(teamName: string): boolean {
        return this._redemptions.some((redemption) => redemption.teamID === teamName);
    }

    saveRedemptions() {
        const data = this._redemptions.map((redemption) => {
            return {
                teamID: redemption.teamID,
                redeemedAt: redemption.redeemedAt,
            };
        });

        const csvData = [
            ["teamID", "redeemedAt"],
            ...data.map((redemption) => [redemption.teamID, redemption.redeemedAt.toISOString()]),
        ];

        const csvString = csvData.map((row) => row.join(",")).join("\n");

        fs.writeFileSync(path.join(__dirname, "..", "..", "data", "redemptions.csv"), csvString);
    }
}
