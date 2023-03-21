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

it("runs a health check on query getDepartment - checking for Engineering", async () => {
    const result = await server.executeOperation({
        query: gql`
            query{
                getDepartment(name:"Engineering"){
                    id
                }
            }
        `,
    });
    expect(result).toBeTruthy();
    expect(result).toHaveProperty("data");
    expect(result.errors).toBeFalsy();    
    expect(result?.data?.getDepartment?.id).toEqual("920a774e-617a-4a5b-82ea-8205c18eef75");
});

it("runs a health check on mutation addDepartment - adding Test Department", async () => {
    const result = await server.executeOperation({
        query: gql`
            mutation{
                addDepartment(name:"Test Department"){
                    id
                    name
                }
            }
        `,
    });
    expect(result).toBeTruthy();
    expect(result).toHaveProperty("data");
    expect(result.errors).toBeFalsy();    
    expect(result?.data?.addDepartment?.name).toEqual("Test Department");
});

it("runs a health check on mutation updateDepartment - adding Test Department", async () => {
    const result = await server.executeOperation({
        query: gql`
            mutation{
                updateDepartment(name:"Test Department", newName:"Test Department 2"){
                    id
                    name
                }
            }
        `,
    });
    expect(result).toBeTruthy();
    expect(result).toHaveProperty("data");
    expect(result.errors).toBeFalsy();    
    expect(result?.data?.updateDepartment?.name).toEqual("Test Department 2");
});

it("runs a health check on mutation deleteDepartment - adding Test Department", async () => {
    const result = await server.executeOperation({
        query: gql`
            mutation{
                deleteDepartment(name:"Test Department 2"){
                    id
                    name
                }
            }
        `,
    });
    expect(result).toBeTruthy();
    expect(result).toHaveProperty("data");
    expect(result.errors).toBeFalsy();    
    expect(result?.data?.deleteDepartment?.name).toEqual("Test Department 2 - DELETED");
});