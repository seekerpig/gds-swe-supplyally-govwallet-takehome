#!/usr/bin/env node

import readline from "readline";

import { StaffToTeamRepository } from "./repository/StaffToTeamRepository";
import { RedemptionRepository } from "./repository/RedemptionRepository";
import chalk from "chalk";

class ConsoleApp {
    private rl: readline.Interface;
    private staffToTeamRepository: StaffToTeamRepository;
    private redemptionRepository: RedemptionRepository;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        this.staffToTeamRepository = new StaffToTeamRepository();
        this.redemptionRepository = new RedemptionRepository();
    }

    public start() {
        this.promptForInput();
    }

    private showMenu() {
        console.log(chalk.blue("----------------------------------------------------------------"));
        console.log(chalk.blue("Please choose an option:"));
        console.log(chalk.green("1.") + " Find team of representative staff");
        console.log(chalk.green("2.") + " Verify whether the staff can redeem their team's gift");
        console.log(chalk.green("3.") + " Add New Redemption");
        console.log(chalk.green("0.") + " Exit\n");
    }

    private promptForInput() {
        try {
            this.showMenu();

            this.rl.question(chalk.blue("Enter your choice:"), (answer: any) => {
                switch (answer) {
                    case "1":
                        this.rl.question(
                            chalk.blue("Please enter representative staff pass id:"),
                            (staffPassId: any) => {
                                let staffMapping = this.staffToTeamRepository.getStaffMappingByStaffPassId(staffPassId);
                                if (staffMapping !== undefined) {
                                    console.log(
                                        chalk.green("Staff pass id found!", "Team: " + staffMapping.getTeamID() + "\n")
                                    );
                                } else {
                                    console.log(chalk.red("Staff pass id not found in mapping!\n"));
                                }
                                setTimeout(() => this.promptForInput(), 1000);
                            }
                        );

                        break;
                    case "2":
                        this.rl.question(
                            chalk.blue("Please enter representative staff pass id:"),
                            (staffPassId: any) => {
                                let staffMapping = this.staffToTeamRepository.getStaffMappingByStaffPassId(staffPassId);
                                if (staffMapping !== undefined) {
                                    let redemption = this.redemptionRepository.checkTeamRedeemed(
                                        staffMapping.getTeamID()
                                    );
                                    if (redemption) {
                                        console.log(
                                            chalk.red(
                                                "Team-" + staffMapping.getTeamID() + " has already redeemed a prize!\n"
                                            )
                                        );
                                    } else {
                                        console.log(
                                            chalk.green(
                                                "Team-" + staffMapping.getTeamID() + " can redeem their prize!\n"
                                            )
                                        );
                                    }
                                } else {
                                    console.log(chalk.red("Staff pass id not found in mapping!\n"));
                                }
                                setTimeout(() => this.promptForInput(), 1000);
                            }
                        );
                        break;
                    case "3":
                        this.rl.question(
                            chalk.blue("Please enter representative staff pass id:"),
                            (staffPassId: any) => {
                                let staffMapping = this.staffToTeamRepository.getStaffMappingByStaffPassId(staffPassId);
                                if (staffMapping !== undefined) {
                                    let redemption = this.redemptionRepository.checkTeamRedeemed(
                                        staffMapping.getTeamID()
                                    );
                                    if (redemption) {
                                        console.log(
                                            chalk.red(
                                                "Team-" + staffMapping.getTeamID() + " has already redeemed a prize!\n"
                                            )
                                        );
                                    } else {
                                        this.redemptionRepository.addNewRedemption(
                                            staffMapping.getTeamID(),
                                            new Date()
                                        );
                                        console.log(chalk.green("Added team to redemption!\n"));
                                    }
                                } else {
                                    console.log(chalk.red("Staff pass id not found in mapping!\n"));
                                }
                                setTimeout(() => this.promptForInput(), 1000);
                            }
                        );
                        break;
                    case "0":
                        console.log("Exiting application...");
                        this.rl.close();
                        this.redemptionRepository.saveRedemptions();
                        return;
                    default:
                        console.log("Unknown command. Please try again.");
                        this.promptForInput();
                        break;
                }
            });
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }
}

try {
    const app = new ConsoleApp();
    app.start();
} catch (error) {
    console.error(error);
    process.exit(1);
}
