import { gql } from "apollo-server-express"; //Used to createa a schema

export default gql`
    type Department{
        id: String!
        name: String        
    }

    type People{
        id: ID!
        firstName: String
        lastName: String
        jobTitle: String
        departmentId: String
        managerId: String
        departmentName: String        
    }

    type Query{
        getAllDepartments: [Department] # Will return multiple Department instances
        getDepartment(id: String,name: String): Department # Will return a single Department based on either an id or a name        
    }

    # Define our Mutations
    type Mutation{
        addDepartment( name: String ): Department # Will add a new department, id is not required as it will be auto-generated in the resolver
        updateDepartment( id: String, name: String, newName: String! ): Department
        deleteDepartment( id: String, name: String): Department
    }
`