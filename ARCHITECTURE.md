# WasteAI Architecture Documentation

## 🏗️ System Architecture

### High-Level Overview
```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   React UI   │  │ TensorFlow.js│  │ Service Worker│      │
│  │  Components  │  │   ML Model   │  │  (Offline)   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │     Auth     │  │  Classify    │  │  Leaderboard │      │
│  │   Endpoints  │  │  Endpoints   │  │  Endpoints   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                     Business Logic Layer                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Controllers  │  │  Middleware  │  │   Services   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                       Data Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   MongoDB    │  │ LocalStorage │  │  IndexedDB   │      │
│  │  (Cloud DB)  │  │  (Browser)   │  │  (Offline)   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
wasteai/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── classify/            # Classification UI
│   │   ├── dashboard/           # Dashboard widgets
│   │   ├── history/             # History views
│   │   ├── layout/              # Layout components
│   │   ├── leaderboard/         # Leaderboard UI
│   │   └── shared/              # Shared components
│   ├── pages/                   # Page-level components
│   │   ├── Dashboard.tsx        # Main dashboard
│   │   ├── EducationHub.tsx     # Quiz & learning
│   │   ├── History.tsx          # Scan history
│   │   ├── ImpactReport.tsx     # Environmental impact
│   │   └── Leaderboard.tsx      # Ward rankings
│   ├── services/                # API service layer
│   │   ├── api.ts              # Axios instance
│   │   ├── authService.ts      # Authentication
│   │   ├── classifyService.ts  # Classification API
│   │   └── wasteService.ts     # Waste data API
│   ├── utils/                   # Utility functions
│   │   ├── wasteClassifier.ts  # AI classification logic
│   │   ├── pointsCalculator.ts # Points calculation
│   │   └── dateFormatter.ts    # Date utilities
│   ├── context/                 # React context
│   │   ├── AuthContext.tsx     # Auth state
│   │   ├── ThemeContext.tsx    # Theme state
│   │   └── ToastContext.tsx    # Toast notifications
│   ├── hooks/                   # Custom React hooks
│   │   ├── useTheme.ts         # Theme hook
│   │   └── useToast.ts         # Toast hook
│   └── config/                  # Configuration
│       ├── constants.ts         # App constants
│       └── theme.ts             # Theme config
├── server/                      # Backend source code
│   ├── controllers/             # Request handlers
│   │   ├── authController.ts   # Auth logic
│   │   ├── classifyController.ts # Classification
│   │   └── wasteController.ts  # Waste CRUD
│   ├── models/                  # Database models
│   │   ├── User.ts             # User schema
│   │   └── WasteLog.ts         # Waste log schema
│   ├── routes/                  # API routes
│   │   ├── authRoutes.ts       # Auth endpoints
│   │   └── wasteRoutes.ts      # Waste endpoints
│   ├── middleware/              # Express middleware
│   │   ├── authMiddleware.ts   # JWT verification
│   │   └── uploadMiddleware.ts # File upload
│   └── config/                  # Server config
│       └── db.ts               # MongoDB connection
└── public/                      # Static assets
```

## 🔄 Data Flow

### 1. Image Classification Flow
```
User uploads image
    ↓
Frontend validates file (size, type)
    ↓
TensorFlow.js loads MobileNet model
    ↓
Image preprocessed (resize, normalize)
    ↓
Model predicts waste category
    ↓
Custom classifier maps to waste type
    ↓
Result displayed with confidence score
    ↓
Data sent to backend API
    ↓
Saved to MongoDB + LocalStorage
    ↓
Points calculated and awarded
    ↓
Leaderboard updated
```

### 2. Authentication Flow
```
User enters credentials
    ↓
Frontend validates input
    ↓
POST /api/auth/login
    ↓
Backend verifies credentials
    ↓
JWT token generated
    ↓
Token stored in localStorage
    ↓
Token included in API requests (Authorization header)
    ↓
Middleware validates token
    ↓
Protected routes accessible
```

### 3. Offline-First Flow
```
User opens app
    ↓
Service Worker checks cache
    ↓
If cached: Load from cache
    ↓
If online: Fetch from API + update cache
    ↓
If offline: Use cached data
    ↓
User performs action
    ↓
Save to IndexedDB queue
    ↓
When online: Sync queued actions
```

## 🧠 AI/ML Architecture

### TensorFlow.js Integration
```typescript
// Model Loading
const model = await mobilenet.load({
  version: 2,
  alpha: 1.0
});

// Image Classification
const predictions = await model.classify(imageElement);

// Custom Waste Mapping
const wasteType = mapPredictionToWasteType(predictions);
```

### Classification Logic
1. **Pre-trained MobileNet**: Identifies objects in image
2. **Keyword Mapping**: Maps predictions to waste categories
3. **Confidence Threshold**: Minimum 60% confidence required
4. **Fallback Logic**: Default to "Unknown" if low confidence

### Waste Categories
- **Organic**: Food waste, biodegradable materials
- **Recyclable**: Plastic, paper, metal, glass
- **Hazardous**: Batteries, electronics, chemicals

## 🗄️ Database Schema

### User Model
```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  password: string (hashed),
  ward: string,
  points: number,
  streak: number,
  lastScanDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### WasteLog Model
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  wasteType: 'organic' | 'recyclable' | 'hazardous',
  confidence: number,
  imageUrl: string,
  points: number,
  carbonSaved: number,
  location: {
    ward: string,
    coordinates: [number, number]
  },
  createdAt: Date
}
```

## 🔐 Security Architecture

### Authentication
- **JWT Tokens**: Stateless authentication
- **bcrypt**: Password hashing (10 rounds)
- **Token Expiry**: 7 days
- **Refresh Tokens**: Not implemented (future enhancement)

### Authorization
- **Middleware**: Validates JWT on protected routes
- **Role-Based**: Admin vs User permissions
- **Rate Limiting**: Prevents abuse (future enhancement)

### Data Protection
- **Input Validation**: Sanitize all user inputs
- **File Upload**: Restrict file types and sizes
- **CORS**: Configured for specific origins
- **Environment Variables**: Sensitive data in .env

## 🚀 Performance Optimizations

### Frontend
- **Code Splitting**: Lazy load routes
- **Image Optimization**: WebP format, lazy loading
- **Memoization**: React.memo for expensive components
- **Virtual Scrolling**: For large lists
- **Bundle Size**: < 500KB gzipped

### Backend
- **Database Indexing**: On userId, createdAt
- **Caching**: Redis for leaderboard (future)
- **Compression**: gzip middleware
- **Connection Pooling**: MongoDB connection reuse

### AI/ML
- **Model Caching**: Load once, reuse
- **Web Workers**: Offload processing
- **Quantization**: Reduced model size
- **Batch Processing**: Multiple images

## 📊 Monitoring & Analytics

### Metrics Tracked
- Classification accuracy
- Response times
- Error rates
- User engagement
- Carbon impact

### Tools (Future)
- Google Analytics
- Sentry (error tracking)
- LogRocket (session replay)
- Lighthouse (performance)

## 🔄 CI/CD Pipeline

### Development Workflow
```
Code Push → GitHub
    ↓
GitHub Actions triggered
    ↓
Run tests (Jest, Cypress)
    ↓
Build production bundle
    ↓
Deploy to Netlify/Vercel
    ↓
Run smoke tests
    ↓
Notify team (Slack)
```

## 🌐 Deployment Architecture

### Frontend (Netlify/Vercel)
- **CDN**: Global edge network
- **SSL**: Automatic HTTPS
- **Redirects**: SPA routing
- **Environment Variables**: Secure config

### Backend (Future: AWS/Heroku)
- **Load Balancer**: Distribute traffic
- **Auto-scaling**: Handle traffic spikes
- **Database**: MongoDB Atlas
- **File Storage**: AWS S3

## 🔮 Future Enhancements

### Phase 2
- [ ] Real-time notifications (WebSockets)
- [ ] Advanced ML model (custom trained)
- [ ] Mobile app (React Native)
- [ ] Blockchain rewards system

### Phase 3
- [ ] IoT integration (smart bins)
- [ ] AR waste scanning
- [ ] Community marketplace
- [ ] Government dashboard

## 📚 Technology Decisions

### Why React?
- Component reusability
- Large ecosystem
- Virtual DOM performance
- TypeScript support

### Why TensorFlow.js?
- Client-side processing
- No server costs
- Privacy (data stays local)
- Offline capability

### Why MongoDB?
- Flexible schema
- Scalability
- JSON-like documents
- Cloud-ready (Atlas)

### Why Vite?
- Fast HMR
- Modern build tool
- Optimized production builds
- Plugin ecosystem

---

**Last Updated**: 2026
**Maintained By**: SaiyamJain468
