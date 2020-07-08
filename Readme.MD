## Logger the plan - powered by graphql

-   a backend that allows you to enter your email and get an api key in your mail. The same api key is returned if the email already exists in the systen

-   a frontend that contains a docs, a home page and signup/get api key for the kind of queries you can perform. might be done with flutter web, react or vuejs

-   the models are

    -   dependent(email, apikey, created_at, no_of_query, no_of_mutations)
    -   logs(message, stacktrace, timestamp, project_id )
    -   projects(id, name, user_id)

-   the database will be mongodb
-   the / will redirect to the front end when we are done
-   the user will be able to add new projects(probably place a maximum)
-   the user will be able to fetch by project or by user.
-   allowing them to send a new project via a log.(e.g if the project_name sent doesnt exist a new project will be created for that user and added to log)
    -the ui will just be for telling them about the project contacting us and getting an api key

## Queries

-   getApiKey(email)

    -   apikey is mailed to you

-   getProjects()

-   getLogs(project_name)

## Mutations

-   add to log(apiKey, project_name, message, stacktrace, timestamp)
