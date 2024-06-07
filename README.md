
# React.js, Node.js, MongoDB, and Express App Installation Guide
---
## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js and npm (Node Package Manager)
- MongoDB (Make sure it's running)

## Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/SarweshKumarTiwari/WanderOn_Assignment.git
   ```

2. **Navigate to the project directory**

   ```bash
   cd backend
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Set up environment variables**

   - Create a `.env` file in the root directory of the project.
   - Add the following environment variables to the `.env` file:

     ```
     PORT=4000
     DB_CONNECTION_URL=mongodb://localhost:27017/your-database-name
     ACCESS_TOKEN=some_token_value
     ORIGIN=http://localhost:3000

     ```

   Make sure to replace `your-database-name` with the name of your MongoDB database.

5. **Start the server**

   ```bash
   npm run dev
   ```

   This command will start the Node.js server.

6. **Go back to main project directory**

   ```bash
   cd..
   npm install
   ```
5. **Start the client server**

   ```bash
   npm start
   ```

   This command will start the React.js server.

## Accessing the Application

You can access the application by visiting `http://localhost:3000` in your web browser.

## API's Description
    Base url= `http://localhost:4000`
1. **Auth or user APIs**

- ***Register user***
```bash 
    POST http://localhost:4000/user/register
``` 
- This api registers user in database it takes three parameters `username`, `email` and `password`.
```bash
    {
        username:your_name,
        email:your_email,
        password:your_password
    }
```
- ***Login User***
```bash 
    POST http://localhost:4000/user/authorise
``` 
- This api logs user in and it takes three parameters `email`,`username` and `password`.
```bash
    {
        email:your_email_or_your_username,
        password:your_password
    }
```

- ***Get user information***
```bash 
    GET http://localhost:4000/user/userInfo
``` 
- This api is used to get user informatin if user is logged in and its access token is valid.

- ***logout user***
```bash 
    GET http://localhost:4000/user/logout
``` 
- This api is used to logout user session and remove access token.

## Functional Programming Approach in This Project

In this project, we have adopted a functional programming approach, utilizing functions as the primary building blocks of our application. This decision was made to leverage the benefits that functional programming offers, such as code predictability, modularity, and ease of testing.

### Why Functional Programming?

1. **Predictability and Testability:**
   - **Pure Functions:** By using pure functions that return the same output for the same input without side effects, our code becomes more predictable. This predictability simplifies debugging and makes the application behavior easier to understand.
   - **Immutability:** Emphasizing immutable data structures ensures that data is not modified after creation. This immutability prevents unintended side effects, leading to more reliable and maintainable code.

2. **Modularity and Reusability:**
   - **First-Class Functions:** In JavaScript, functions are first-class citizens, meaning they can be passed as arguments, returned from other functions, and assigned to variables. This feature allows us to create highly modular code, where small, reusable functions can be combined to perform complex tasks.
   - **Higher-Order Functions:** These functions, which either take other functions as arguments or return functions, enable us to build more abstract and flexible code structures. This abstraction leads to increased code reuse and easier maintenance.

3. **Concurrency and Parallelism:**
   - **Stateless Functions:** Functional programming encourages the use of stateless functions, which do not depend on or alter the state outside their scope. This stateless nature makes it easier to write concurrent and parallel code, as there are no shared states that can lead to race conditions or synchronization issues.

### Implementing Functional Programming in This Project

In our MERN stack authentication system, we have applied functional programming principles throughout the entire codebase:

- **Backend:** Each API endpoint handler is implemented as a pure function, ensuring no side effects and predictable behavior. Middleware functions are composed to process requests in a clear and modular manner.
- **Frontend:** React components are designed as pure functions, receiving props and returning JSX without altering any external state. State management is handled using immutable structures, and side effects are managed using hooks in a controlled manner.

### Conclusion

Adopting a functional programming approach in this project has led to a more robust, maintainable, and scalable codebase. By emphasizing pure functions, immutability, and composability, we have created an application that is not only easier to understand and test but also resilient to changes and extensions. This approach underscores our commitment to writing clean, efficient, and reliable code.

We encourage developers to explore and adopt functional programming techniques to enhance the quality and maintainability of their projects.
## Additional Notes

- Make sure MongoDB is running before starting the server.
- You may need to adjust the port number (`PORT`) and MongoDB URI (`MONGODB_URI`) in the `.env` file based on your configuration.
---
