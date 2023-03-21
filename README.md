## Introduction

This is a GraphQL Server solution that will return data about users found in a directory database.  The database is found in a dataset.ts file; all mutations/changes made to the dataset will be reverted on a server reboot.  The dataset includes two collections: Departments and People.

## Build Instructions
npm start will execute: npx nodemon app/index.ts
npm test will execute: jest --config jest.config.ts ./__tests__

## Folder Structure
- __tests__
- app
	- resolvers
		- departments
		- people
	- types
		- departments
		- people	
	- index.ts
	- dataset.ts


## Supported CRUD Operations
Both departments and people have supported operations for GET, POST, PUT, and DELETE as defined in the 

## Examples
http://localhost:8080/departments
This will list out all available departments

http://localhost:8080/departments/640a109244fa7ab0e887afae
This will return the Marketing department

http://localhost:8080/people/
This will list out all available people

http://localhost:8080/people/640a105044fa7ab0e8876271
This will return the person Kody Conn