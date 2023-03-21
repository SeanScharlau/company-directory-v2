import { departments } from "../../dataset"; // Get our department data
import { Guid } from "guid-typescript" // Creates a method to auto-generate new guids for use in IDs

export default {
    Query:{
        getAllDepartments: () => departments, // getAllDepartments command will return all departments
        getDepartment: (_: any, args: any) => { // getDepartmentById command will allow user to filter on ID                        
            if(args.id){ // Check if user provided an ID, if they did lookup department by id
                return departments.find((department) => department.id === args.id)
            }else if(args.name){ // Check if user provided a name, if they did lookup department by name
                return departments.find((department) => department.name === args.name)
            }            
        },
    },

    Mutation: {
        addDepartment: (_: any, args: any) => { // Add a department
            try{
                const newDepartment = {
                    id: Guid.create().toString(), // Generate a new GUID using Guid
                    name: args.name, // Assign the provided name to the name of the new department object
                };
                departments.push(newDepartment); // Push our new department object back into our dataset
                return newDepartment; // Return our new department for validation
            }catch(e){
                throw new Error(`Error: ${e}`); // An error occurred
            }
        },
        updateDepartment: (_: any, args: any) => { // Allow user to update a department, selecting the department by id or name
            try{
                var department = null; // Placeholder variable for our department object

                if(args.id){ // Check if user provided an ID, if they did lookup department by id
                    department = departments.find((department) => department.id === args.id); // Get the department we are modifying
                }else if(args.name){ // Check if user provided a Name, if they did lookup department by name
                    department = departments.find((department) => department.name === args.name); // Get the department we are modifying
                }                
                
                if(!department){ // If we did not get back any data, alert the user
                    throw new Error(`Could not find department with id ${args.id}`);
                }else{
                    if(args.newName !== undefined){ // Check that a new name was provided
                        department.name = args.newName; // Update the name value for our department
                    }
                }                
                
                return department;
            }catch(e){
                throw new Error(`Error: ${e}`); // An error occurred
            }
        },
        deleteDepartment: (_: any, args: any) => {
            try{
                var department = null;                    

                if(args.id){ // Check if user provided an ID, if they did lookup department by id
                    department = departments.find((department) => department.id === args.id); // Get the department we are modifying
                }else if(args.name){ // Check if user provided a Name, if they did lookup department by name
                    department = departments.find((department) => department.name === args.name); // Get the department we are modifying
                }
                
                if(!department){ // If we did not get back any data, alert the user
                    throw new Error(`Could not find department with id ${args.id}`);
                }else{
                    var departmentIndex = departments.indexOf(department, 0) || -1; // Get the index for the current department
                    if(departmentIndex > -1){ // Check that we returned a valid index
                        departments.splice(departmentIndex, 1); // Delete the department from the array
                        department.name = `${department.name} - DELETED`; // Update the cached department name with DELETED for validation purposes
                        return department; // Return the current department object for validation purposes
                    }                    
                }
            }catch(e){
                throw new Error(`Error: ${e}`); // An error occurred
            }
        }
    }
};