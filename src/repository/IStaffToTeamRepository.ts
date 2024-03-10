import { StaffToTeam } from "../model/StaffToTeam";

export interface IStaffToTeamRepository {
    addNewStaffMapping(staffID: string, teamID:string, dateTime: Date): void;
    getStaffMappingByStaffPassId(staffPassId: string): StaffToTeam | undefined;
    getAllStaffMappings(): StaffToTeam[];
}
