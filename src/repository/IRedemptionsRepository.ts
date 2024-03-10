import { Redemption } from "../model/Redemption";

export interface IRedemptionRepository {
  addNewRedemption(teamID: string, date:Date): void;
  checkTeamRedeemed(teamName: string): boolean;
}
