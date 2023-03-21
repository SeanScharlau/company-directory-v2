import { people } from "../../dataset"; // Get our people data
import { departments } from "../../dataset"; // Get our department data
import { Guid } from "guid-typescript" // Creates a method to auto-generate new guids for use in IDs

export default {
    Query:{       
        getAllPeople: async() => people, // getAllPeople command will return all people
        getPeople: async(_: any, args: any) => { // getPersonById command will allow user to filter on ID
            
            if(args.id){ // Check if user provided an ID, if they did lookup person by id
                return people.filter((person) => person.id === args.id)                
            }else if(args.firstName && args.lastName){ // Check if user provided a first and last name, if they did lookup people by name
                return people.filter((person) => person.firstName === args.firstName && person.lastName === args.lastName)            
            }else if(args.jobTitle){ // Check if user provided jobTitle, if they did lookup people by job title
                return people.filter((person) => person.jobTitle === args.jobTitle);
            }else if(args.departmentId){ // Check if user provided departmentId, if they did lookup people by department ID
                return people.filter((person) => person.departmentId === args.departmentId);
            }else if(args.managerId){ // Check if user provided managerId, if they did lookup people by manager ID
                return people.filter((person) => person.managerId === args.managerId);
            }
        },
    },

    Mutation: {
        addPerson: (_: any, args: any) => {
            const newPerson = {
                id: Guid.create().toString(),
                firstName: args.firstName,
                lastName: args.lastName,
                jobTitle: args.jobTitle,
                departmentId: args.departmentId,
                managerId: args.managerId,
            };
            people.push(newPerson);
            return newPerson;
        }
    }
};