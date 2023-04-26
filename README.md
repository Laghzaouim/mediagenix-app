# Mediagenix app

This project is a React application that provides a dynamic form and table. It allows users to create their own forms and tables based on a schema. The user can then fill in the form, and the data will be displayed in the table.

## Project Setup

The project was bootstrapped with Create React App using TypeScript template.

## Dependencies

The following dependencies were added to the project:

- Ant Design - a React UI library that provides a set of high-quality React components.
- Axios - a promise-based HTTP client for the browser and node.js.
- date-fns - a lightweight library for working with dates in JavaScript.
- React Query - a library for managing, caching, and updating server state in React applications.
- uuid - a library for generating UUIDs.
  Development Dependencies

The following development dependencies were added to the project:

- @testing-library/user-event - a utility library for triggering DOM events in testing.
- @testing-library/jest-dom - a library that provides custom Jest matchers for testing DOM elements.
- @testing-library/react - a library that provides utilities for testing React components.
- @types/jest - TypeScript typings for the Jest testing framework.
- @types/node - TypeScript typings for Node.js.
- @types/react - TypeScript typings for React.
- @types/react-dom - TypeScript typings for React DOM.
- @types/uuid - TypeScript typings for UUID.
- axios-mock-adapter - a library for mocking Axios requests in testing.
- Jest - a JavaScript testing framework.
- msw - a library for mocking HTTP requests in testing.
- TypeScript - a superset of JavaScript that adds type annotations to the language.
- web-vitals - a library for measuring website performance.

## Steps Taken

### 1. Set up the project

Set up the project using create-react-app with TypeScript template
Install the necessary libraries: Ant Design, React Query, MSW (or JSON-server), TypeScript, and Jest with testing-library.

### 2. Create a data fetching hook

Use React Query to create a custom hook that fetches data from the mock server (MSW or JSON-server).

### 3. Create a dynamic table component

Use Ant Design's Table component to create a dynamic table that accepts schema and data as props.
Generate table columns based on the provided schema.
Fetch data using the custom data fetching hook and populate the table.

### 4. Create a dynamic form component

Use Ant Design's Form component to create a dynamic form that accepts schema as a prop.
Use the Antd Modal component to display the form in a modal when creating or editing data.
Generate form fields based on the provided schema and Ant Design components.
Implement validation based on the "required" property of schema fields.
Submit the form and send data to the mock server for CREATE or UPDATE operations.

### 5. Implement search functionality

Add a search bar that allows searching by title and description.
Filter table data based on the search query using the mock server.

### 6. Write tests

Use Jest and testing-library to create tests for the table and form components.
Test if the table is populated with the correct data.
Test if filling in the fields in the modal will succeed (with a toast message on success) and if the table gets a new entry (row).
Test if the validation is working correctly.

### 7. Connect components and implement the main application layout

Use Ant Design's Button and Modal components to open the form for CREATE and UPDATE operations.
Display the dynamic table and form components based on the provided schema and data.
Implement the search functionality and update the table with filtered data.

### 8. Others

* Fix Table Date

In this step, the date in the dynamic table was fixed to display in a readable format using the Ant Design Datepicker component.

* Move Dependencies to Dev Dependencies

In this step, dependencies that were not needed in production were moved to the dev dependencies section.

* Fix DynamicForm Test

In this step, a bug in the DynamicForm test was fixed to ensure that the test was correctly simulating user input and submitting the form.

* Change Folder Structure

In this step, the folder structure of the project was changed to group related files together and improve organization.


## Available Scripts

In the project directory, you can run:

`npm start`

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

`npm test`

Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

## Typescript test(extra)

```javascript
type FirstElementType<T extends any[]> = T extends [infer U, ...any[]] ? U : never;
```

This type utilizes TypeScript's conditional types and the `infer` keyword to extract the type of the first element of the array. Here's how it works:

1. `T extends any[]`: The generic type `T` is constrained to be an array.
2. `T extends [infer U, ...any[]]`: If `T` is an array that has at least one element, we infer the type of the first element as `U`.
3. `? U : never`: If the condition in step 2 is satisfied, the resulting type is `U`. Otherwise, the resulting type is `never`, which indicates that the input type doesn't match the expected structure.
You can test this generic type with some example types:

Test:

```javascript
type Example1 = FirstElementType<[string, number, boolean]>; // string
type Example2 = FirstElementType<[number, boolean]>; // number
type Example3 = FirstElementType<[boolean]>; // boolean
type Example4 = FirstElementType<[]>; // never
```
