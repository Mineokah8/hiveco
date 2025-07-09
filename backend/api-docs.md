## Hive API Documentation

---

### 📝 POST /api/posts/:id/comment

**Description:** Add a comment to a specific post.

**Method:** POST  
**Access:** Private (JWT Token Required)

**Headers:**
- Authorization: Bearer <your_jwt_token>

**Request Body:**
```json
{
  "text": "This is a nice post!"
}
