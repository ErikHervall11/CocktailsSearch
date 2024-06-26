Sure! Here's a formatted README for your GitHub repository:

---

# Cocktail Collective

## Live Site

[Link to Live Site](https://cocktailssearch.onrender.com/)

## Summary

Cocktail Collective is a comprehensive web app for cocktail enthusiasts. Users can create, favorite, and comment on cocktails, manage and edit their own recipes, view creations from other users, and search a non-user-created database of over 1,000 cocktails by name or ingredient.

## Screenshots

![Screenshot 1](/capstoneproject/react-vite/public/CCportfolio.png)
![Screenshot 2](/capstoneproject/react-vite/public/CCportfolio2.png)
![Screenshot 3](/capstoneproject/react-vite/public/CCportfolio3.png)
![Screenshot 3](/capstoneproject/react-vite/public/CCportfolio4.png)

<!-- ## Installation Instructions -->

<!-- 1. Clone the repository:
   ```sh
   git clone xxxxxxxxxxxx
   ``` -->

<!-- 1. Navigate to the project directory:
   ```sh
   cd capstoneproject
   ```
2. Install the dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Set up the environment variables in a `.env` file:
   ```
   FLASK_APP=app
   FLASK_ENV=development
   DATABASE_URL=your_database_url
   S3_BUCKET=your_s3_bucket_name
   S3_KEY=your_s3_key
   S3_SECRET=your_s3_secret
   ```
4. Run the application:
   ```sh
   flask run
   ``` -->

## Getting started

1. Clone this repository (only this branch).

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the **.env** file.

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable. Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. The React frontend has no styling applied. Copy the **.css** files from your
   Authenticate Me project into the corresponding locations in the
   **react-vite** folder to give your project a unique look.

8. To run the React frontend in development, `cd` into the **react-vite**
   directory and run `npm i` to install dependencies. Next, run `npm run build`
   to create the `dist` folder. The starter has modified the `npm run build`
   command to include the `--watch` flag. This flag will rebuild the **dist**
   folder whenever you change your code, keeping the production version up to
   date.

## Technologies Used

![](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![AWS](https://img.shields.io/badge/aws-%23316192.svg?style=for-the-badge&logo=amazonwebservices&logoColor=white)
![AWS](https://img.shields.io/badge/docker-%23316192.svg?style=for-the-badge&logo=docker&logoColor=white)
![](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

- API Ninjas Cocktail API

## Features

- **User Authentication**: Sign up, log in, and log out functionalities for users.
- **Create Cocktails**: Users can create their own cocktail recipes and share them with the community.
- **Favorite Cocktails**: Users can favorite cocktails they like and easily access them later.
- **Comment on Cocktails**: Users can comment on cocktails to share their thoughts and feedback.
- **Manage Recipes**: Users can edit and delete their own cocktail recipes.
- **Search Functionality**: Search through a database of over 1,000 cocktails by name or ingredient.
- **User Profiles**: Each user has a profile displaying their created and favorited cocktails.
- **Image Uploads**: Users can upload images for their cocktail recipes.

## Future Features

- User notifications
- Advanced search filters of user-created content
- Cocktail rating system
- Cocktail Card Collectables

## Technical Implementation Details

- **User Authentication**: Implemented with Flask-Login, including routes for login, logout, and signup.
- **Cocktail Management**: Users can create, update, and delete cocktail recipes. Images are uploaded to AWS S3.
- **Search Functionality**: Utilizes API Ninjas Cocktail API to search for cocktails by name or ingredients.

<!-- ## Challenges

- **Image Uploads**: Handling image uploads and storage securely in AWS S3.
- **Search Optimization**: Implementing an efficient search mechanism using the external cocktail API. -->

## Contact

- [Portfolio](https://www.erikhervall.com)
- [LinkedIn](https://www.linkedin.com/in/erikhervall/)
- Email: erikhervall11@gmail.com

## Endpoints

### Auth

| Request        | Purpose                                                                                                                                         | Return Value |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| GET /api/auth/ | This fetch is sent upon initial app load and on subsequent refreshes. It returns an object representing the current user, if user is logged in. |

```
{
"cocktails": ARRAY,
"comments": ARRAY,
"created_at": DATE,
"email": EMAIL,
"first_name": STRING,
"id": INT,
"last_name": STRING,
"profile_image": URL,
"updated_at": DATE,
"username": STRING
}
```

| Request              | Purpose                                                                                                                                        | Return Value |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| POST /api/auth/login | This fetch attempts to login a user with the provided credentials. It returns an object representing the current user, if validation succeeds. |

```
{
"cocktails": ARRAY,
"comments": ARRAY,
"created_at": DATE,
"email": EMAIL,
"first_name": STRING,
"id": INT,
"last_name": STRING,
"profile_image": URL,
"updated_at": DATE,
"username": STRING
}
```

### Cocktails

| Request                   | Purpose                          | Return Value                    |
| ------------------------- | -------------------------------- | ------------------------------- |
| GET /api/cocktails        | Fetches all cocktails.           | List of cocktail objects        |
| GET /api/cocktails/:id    | Fetches a single cocktail by ID. | Cocktail object                 |
| POST /api/cocktails/new   | Creates a new cocktail.          | Created cocktail object         |
| PUT /api/cocktails/:id    | Updates an existing cocktail.    | Updated cocktail object         |
| DELETE /api/cocktails/:id | Deletes a cocktail.              | {'message': 'Cocktail deleted'} |

### Comments

| Request                          | Purpose                                        | Return Value                   |
| -------------------------------- | ---------------------------------------------- | ------------------------------ |
| GET /api/cocktails/:id/comments  | Fetches all comments for a specific cocktail.  | List of comment objects        |
| POST /api/cocktails/:id/comments | Creates a new comment for a specific cocktail. | Created comment object         |
| PUT /api/comments/:id            | Updates an existing comment.                   | Updated comment object         |
| DELETE /api/comments/:id         | Deletes a comment.                             | {'message': 'Comment deleted'} |

### Favorites

| Request                             | Purpose                                              | Return Value                    |
| ----------------------------------- | ---------------------------------------------------- | ------------------------------- |
| POST /api/cocktails/favorites       | Adds a cocktail to the user's favorites.             | Created favorite object         |
| DELETE /api/cocktails/favorites/:id | Removes a cocktail from the user's favorites.        | {'message': 'Favorite removed'} |
| GET /api/cocktails/favorites        | Fetches all favorite cocktails for the current user. | List of favorite objects        |

---
