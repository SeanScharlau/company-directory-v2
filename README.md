## Introduction

This is a GraphQL Server solution that will return data about users found in a directory database.  The database is found in a dataset.ts file; all mutations/changes made to the dataset will be reverted on a server reboot.  The dataset includes two collections: Departments and People.

## Build Instructions
### npm start 
This will execute: npx nodemon app/index.ts 
### npm test
This will will execute: jest --config jest.config.ts ./__tests__

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