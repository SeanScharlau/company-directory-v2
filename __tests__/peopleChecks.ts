import { ApolloServer } from "apollo-server-express";
import peopleType from "../app/types/people"
import departmentType from "../app/types/departments"
import peopleResolver from "../app/resolvers/people";
import departmentResolver from "../app/resolvers/departments";
import * as _ from "lodash";
import { gql } from "apollo-server-express";

const server = new ApolloServer({
    typeDefs:[peopleType, departmentType],
    resolvers: _.merge({}, peopleResolver, departmentResolver),    
  });

it("runs a health check on mutation addPerson - adding Sean Scharlau", async () => {
    const result = await server.executeOperation({
        query: gql`
            fragment NameParts on Person{
                firstName
                lastName

            }
            mutation{
                addPerson(    
                    firstName: "Sean",
                    lastName: "Scharlau",
                    jobTitle: "Direct Operations Consultant",
                    departmentId: "aef293ee-8dcc-4d89-99cf-1b8f61bab07b",
                    managerId: "2798c35b-5b8f-4a5d-9858-0a818d48cbef"
                ){
                    id
                    ...NameParts
                }                
            }
        `,
    });
    expect(result).toBeTruthy();
    expect(result).toHaveProperty("data");
    expect(result.errors).toBeFalsy();    
    expect(result?.data?.addPerson?.firstName).toEqual("Sean");
    expect(result?.data?.addPerson?.lastName).toEqual("Scharlau");
});