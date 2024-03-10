import { StaffToTeamRepository } from '../src/repository/StaffToTeamRepository'; 

describe('StaffToTeamRepository', () => {
    let repo: StaffToTeamRepository;

    beforeEach(() => {
        repo = new StaffToTeamRepository();
    });

    test('addNewStaffMapping should add a mapping', () => {
        const count = repo.getAllStaffMappings().length;
        repo.addNewStaffMapping('jackson', 'Team Jack', new Date());
        expect(repo.getAllStaffMappings()).toHaveLength(count + 1);
    });


    test('getStaffMappingByStaffPassId should return undefined for staff id not in mapping', () => {
        repo.addNewStaffMapping('jackson', 'Team Jack', new Date());
        const mapping = repo.getStaffMappingByStaffPassId('invalidID');
        expect(mapping).toBeUndefined();
    });

    test('getStaffMappingByStaffPassId should team for valid staff pass id', () => {
        repo.addNewStaffMapping('jackson', 'Team Jack', new Date());
        const mapping = repo.getStaffMappingByStaffPassId("jackson");
        expect(mapping?.getTeamID()).toBe("Team Jack");
    });
});
