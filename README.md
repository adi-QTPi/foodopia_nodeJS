## Getting Started

1. Install dependencies:

   ```bash
   npm i
   ```

2. Run the setup script and follow the instructions :

   ```bash
   node setup_script.js
   ```

3. Et voilà! You are good to go.

4. Start the application:

   ```bash
   npm start
   ```

5. If the setup script DOES NOT WORK PROPERLY for you, don't worry. Create your own .env file and fill in details as in .env.example.

6. After this run createDB.sql and add_dummyDB.sql locally on mysql server.

7. Then run the following command to create an admin user with username `admin` and password as set in .env file.
   ```bash
   node setup/set_the_admin.js
   ```

8. And then you are good to go.
