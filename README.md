<<<<<<< HEAD
# pw-ts-assessment-test-optimization
Structuring of Playwright project with an example test to more reliable and maintainable shape
=======
# API Service

**Base URL:** https://jsonplaceholder.typicode.com/

**Key endpoints for this task:**

- GET /posts → get all posts
- GET /posts/{id} → get a single post
- POST /posts → create a post
- PUT /posts/{id} → update a post
- DELETE /posts/{id} → delete a post

> Note: This API is a mock service; POST/PUT/DELETE don’t actually persist data, but return a simulated response.

---

# Task Requirements

1. **Verify creating a new post (POST /posts)**

Send a POST request with a JSON payload:

```json
{
  "title": "foo",
  "body": "bar",
  "userId": 1
}
```

2. **Verify getting a post by ID (GET /posts/{id})**

3. **Verify updating a post (PUT /posts/{id})**

```json
{
  "id": 1,
  "title": "updated title",
  "body": "updated body",
  "userId": 1
}
```

4. **Verify deleting a post (DELETE /posts/{id})**

5. **Bonus / Negative Cases**
- POST without title → validate response contains generated id (mock API behavior)
- GET non-existent post ID → returns {} and status code 200 (JSONPlaceholder quirk)
- PUT/DELETE non-existent ID → validate mock behavior
>>>>>>> 319170a (Initial commit)
