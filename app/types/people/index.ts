import { gql } from "apollo-server-express"; //Used to createa a schema

export default gql`
    type Person{
        id: ID!
        firstName: String
        lastName: String
        jobTitle: String
        departmentId: String
        managerId: String
        departmentName: String        
    }

    type Query{       
        getAllPeople: [Person] # Will return all Person instances
        getPeople(id: String, firstName: String, lastName: String, jobTitle: String, departmentId: String, managerId: String): [Person] # Will return all people that match the provided criteria; currently only assumes one argument is provided or first and last name are provided        
    }

    # Define our Mutations
    type Mutation{
        addPerson(
            firstName: String
            lastName: String
            jobTitle: String
            departmentId: String
            managerId: String
        ): Person        
    }
`