# WasteAI API Documentation

## 📡 Base URL
```
Development: http://localhost:5000/api
Production: https://api.wasteai.com/api
```

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔑 Authentication Endpoints

### Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "ward": "Connaught Place"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "ward": "Connaught Place",
      "points": 0,
      "streak": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400` - Validation error (missing fields, invalid email)
- `409` - User already exists

---

### Login User
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "ward": "Connaught Place",
      "points": 150,
      "streak": 5
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400` - Missing credentials
- `401` - Invalid credentials
- `404` - User not found

---

### Get Current User
```http
GET /api/auth/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "ward": "Connaught Place",
    "points": 150,
    "streak": 5,
    "lastScanDate": "2024-01-15T10:30:00Z",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

**Error Responses:**
- `401` - Unauthorized (invalid/expired token)

---

## 🗑️ Waste Classification Endpoints

### Classify Waste Image
```http
POST /api/classify
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (FormData):**
```
image: <file> (JPG, PNG, WEBP, max 5MB)
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "wasteType": "recyclable",
    "confidence": 0.92,
    "predictions": [
      {
        "className": "plastic bottle",
        "probability": 0.92
      },
      {
        "className": "container",
        "probability": 0.85
      }
    ],
    "disposalInstructions": "Place in blue recycling bin. Rinse before disposal.",
    "points": 10,
    "carbonSaved": 0.5,
    "binColor": "blue"
  }
}
```

**Error Responses:**
- `400` - No image provided or invalid file type
- `413` - File too large (> 5MB)
- `401` - Unauthorized

---

## 📊 Waste Log Endpoints

### Get User Waste Logs
```http
GET /api/waste/logs
```

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
```
?page=1&limit=10&wasteType=recyclable&startDate=2024-01-01&endDate=2024-01-31
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "id": "507f1f77bcf86cd799439012",
        "wasteType": "recyclable",
        "confidence": 0.92,
        "imageUrl": "/uploads/image123.jpg",
        "points": 10,
        "carbonSaved": 0.5,
        "location": {
          "ward": "Connaught Place",
          "coordinates": [28.6139, 77.2090]
        },
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "total": 45,
      "page": 1,
      "pages": 5,
      "limit": 10
    }
  }
}
```

**Error Responses:**
- `401` - Unauthorized

---

### Get Single Waste Log
```http
GET /api/waste/logs/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "wasteType": "recyclable",
    "confidence": 0.92,
    "imageUrl": "/uploads/image123.jpg",
    "points": 10,
    "carbonSaved": 0.5,
    "location": {
      "ward": "Connaught Place",
      "coordinates": [28.6139, 77.2090]
    },
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error Responses:**
- `401` - Unauthorized
- `404` - Log not found

---

### Create Waste Log
```http
POST /api/waste/logs
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "wasteType": "recyclable",
  "confidence": 0.92,
  "imageUrl": "/uploads/image123.jpg",
  "points": 10,
  "carbonSaved": 0.5
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Waste log created successfully",
  "data": {
    "id": "507f1f77bcf86cd799439012",
    "wasteType": "recyclable",
    "confidence": 0.92,
    "points": 10,
    "carbonSaved": 0.5,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error Responses:**
- `400` - Validation error
- `401` - Unauthorized

---

### Delete Waste Log
```http
DELETE /api/waste/logs/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Waste log deleted successfully"
}
```

**Error Responses:**
- `401` - Unauthorized
- `403` - Forbidden (not owner)
- `404` - Log not found

---

## 🏆 Leaderboard Endpoints

### Get Global Leaderboard
```http
GET /api/leaderboard
```

**Query Parameters:**
```
?limit=10&ward=Connaught Place
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "leaderboard": [
      {
        "rank": 1,
        "userId": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "ward": "Connaught Place",
        "points": 450,
        "totalScans": 45,
        "streak": 12
      },
      {
        "rank": 2,
        "userId": "507f1f77bcf86cd799439013",
        "name": "Jane Smith",
        "ward": "Connaught Place",
        "points": 380,
        "totalScans": 38,
        "streak": 8
      }
    ],
    "userRank": {
      "rank": 5,
      "points": 150
    }
  }
}
```

---

### Get Ward Leaderboard
```http
GET /api/leaderboard/ward/:wardName
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "ward": "Connaught Place",
    "leaderboard": [
      {
        "rank": 1,
        "name": "John Doe",
        "points": 450,
        "totalScans": 45
      }
    ]
  }
}
```

---

## 📈 Dashboard Endpoints

### Get User Statistics
```http
GET /api/dashboard/stats
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalScans": 45,
    "totalPoints": 450,
    "currentStreak": 12,
    "longestStreak": 15,
    "carbonSaved": 22.5,
    "wasteBreakdown": {
      "organic": 15,
      "recyclable": 25,
      "hazardous": 5
    },
    "recentActivity": [
      {
        "date": "2024-01-15",
        "scans": 3,
        "points": 30
      }
    ]
  }
}
```

**Error Responses:**
- `401` - Unauthorized

---

### Get City Live Feed
```http
GET /api/dashboard/live-feed
```

**Query Parameters:**
```
?limit=20&ward=Connaught Place
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "feed": [
      {
        "id": "507f1f77bcf86cd799439012",
        "userName": "John D.",
        "ward": "Connaught Place",
        "wasteType": "recyclable",
        "points": 10,
        "timestamp": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

---

## 📊 Analytics Endpoints

### Get Impact Report
```http
GET /api/analytics/impact
```

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
```
?startDate=2024-01-01&endDate=2024-01-31
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "period": {
      "start": "2024-01-01",
      "end": "2024-01-31"
    },
    "summary": {
      "totalScans": 45,
      "totalPoints": 450,
      "carbonSaved": 22.5,
      "treesEquivalent": 1.5
    },
    "breakdown": {
      "organic": {
        "count": 15,
        "percentage": 33.3,
        "carbonSaved": 7.5
      },
      "recyclable": {
        "count": 25,
        "percentage": 55.6,
        "carbonSaved": 12.5
      },
      "hazardous": {
        "count": 5,
        "percentage": 11.1,
        "carbonSaved": 2.5
      }
    },
    "trends": [
      {
        "date": "2024-01-01",
        "scans": 2,
        "carbonSaved": 1.0
      }
    ]
  }
}
```

**Error Responses:**
- `401` - Unauthorized

---

## 🔔 Notification Endpoints (Future)

### Get User Notifications
```http
GET /api/notifications
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "507f1f77bcf86cd799439014",
        "type": "achievement",
        "title": "Streak Milestone!",
        "message": "You've reached a 10-day streak!",
        "read": false,
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "unreadCount": 3
  }
}
```

---

## ⚠️ Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `UNAUTHORIZED` | 401 | Missing or invalid token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource already exists |
| `PAYLOAD_TOO_LARGE` | 413 | File size exceeds limit |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

---

## 🔒 Rate Limiting

- **Authentication**: 5 requests per minute
- **Classification**: 10 requests per minute
- **General API**: 100 requests per minute

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248000
```

---

## 📝 Request/Response Examples

### cURL Examples

**Register:**
```bash
curl -X POST https://api.wasteai.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123",
    "ward": "Connaught Place"
  }'
```

**Classify Image:**
```bash
curl -X POST https://api.wasteai.com/api/classify \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@/path/to/image.jpg"
```

### JavaScript Examples

**Using Axios:**
```javascript
import axios from 'axios';

// Register
const register = async () => {
  const response = await axios.post('/api/auth/register', {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'securePassword123',
    ward: 'Connaught Place'
  });
  return response.data;
};

// Classify Image
const classifyImage = async (imageFile, token) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await axios.post('/api/classify', formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};
```

---

## 🧪 Testing

### Postman Collection
Download our Postman collection: [wasteai-api.postman_collection.json]

### Test Credentials
```
Email: test@wasteai.com
Password: test123
```

---

## 📚 Additional Resources

- [API Changelog](./CHANGELOG.md)
- [Architecture Documentation](./ARCHITECTURE.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/SaiyamJain468/wasteai/issues)
- **Email**: support@wasteai.com
- **Documentation**: [docs.wasteai.com]

---

**Last Updated**: January 2026
**API Version**: v1.0.0
