import { RedemptionRepository } from "../src/repository/RedemptionRepository";


describe("RedemptionRepository", () => {
    let repo: RedemptionRepository;

    beforeEach(() => {
        repo = new RedemptionRepository();
        
    });

    describe("addNewRedemption", () => {
        it("should add new redemption if not redeemed before", () => {
            const count = repo._redemptions.length;
            repo.addNewRedemption("TEST2", new Date());
            expect(repo._redemptions.length).toBe(count + 1);
        });

        it("should not add a redemption since team has redeemed before", () => {
            const count1 = repo._redemptions.length;
            repo.addNewRedemption("BCD", new Date());
            repo.addNewRedemption("BCD", new Date());
            expect(repo._redemptions.length).toBe(count1 + 1);
        });
    });

    describe("checkTeamRedeemed", () => {
        it("should return true if team has redeemed", () => {
            repo.addNewRedemption("123", new Date());
            expect(repo.checkTeamRedeemed("123")).toBe(true);
        });

        it("should return false if team has not redeemed", () => {
            expect(repo.checkTeamRedeemed("456")).toBe(false);
        });
    });
});
