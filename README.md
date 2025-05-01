
---

# 🧑‍🍳 FlavorShare: Recipe Sharing Platform


## 📌 Overview

**FlavorShare** is a modern, collaborative web application that allows users to discover, share, and rate culinary recipes. It includes profile management and social features like comments and ratings, all wrapped in a responsive and user-friendly interface.

The app fetches real recipe data using the public [TheMealDB API](https://www.themealdb.com/api.php), providing a rich culinary experience with real-world data.

---

## 🚀 Features

### 👤 As a user, I can:
- View a list of recipes retrieved from [TheMealDB](https://www.themealdb.com/api.php).
- Read a recipe in detail (name, ingredients, instructions, photo, and category).
- Filter recipes by category (e.g., vegetarian, dessert) or main ingredient.
- Search for recipes by name or by chef.
- Comment on and rate recipes (1–5 stars) – stored locally or via a future custom backend.

### 🔒 As an authenticated user:
- Log in via a local login form (authentication using `LocalStorage`).

---

## 🧩 Angular Components

- `navbar`: Navigation bar with category links and search.
- `home`: Homepage with trending or random recipes.
- `recipe-list`: List of recipes with filtering options.
- `recipe-detail`: Detailed view of a selected recipe, with comments and ratings.
- `login`: Local authentication form.
- `rating`: Users can rate and review recipes.

---

## 🔧 Angular Services

- `RecipeService`: Fetches data from [TheMealDB API](https://www.themealdb.com/api.php).
- `RatingService`: Manages local user ratings and comments .

---

## 🛠️ Technologies Used

| Area | Tools & Frameworks |
|------|---------------------|
| **Frontend Framework** | Angular 17 |
| **Languages** | TypeScript, HTML, CSS |
| **UI Framework** | Tailwind CSS  |
| **External API** | [TheMealDB API](https://www.themealdb.com/api.php) |
| **Auth Storage** | LocalStorage |
| **Dev Tools** | Git, GitHub, Angular CLI, Postman, Figma |

---

## 🔗 Example API Endpoints (TheMealDB)

- List categories: `https://www.themealdb.com/api/json/v1/1/categories.php`
- Filter by ingredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken`
- Search by name: `https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata`
- Recipe details by ID: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`

---

## 🎨 UI Mockups

Designed using **Figma** 
- **Home Page**: Showcasing recipe cards  
- **Recipe Detail Page**: Full recipe view with image, steps, ingredients, and user interactions

---

