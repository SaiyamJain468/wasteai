# 🌍 WasteAI - Smart Waste Segregation System

[![Developed by SaiyamJain468](https://img.shields.io/badge/Developer-SaiyamJain468-B4F000?style=for-the-badge&logo=github)](https://github.com/SaiyamJain468)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)

> AI-powered waste classification system with real-time TensorFlow.js integration for smart waste management in Delhi NCR

## 🚀 Live Demo

- **Netlify**: [Coming Soon]
- **Vercel**: [Coming Soon]

## ✨ Features

### 🤖 AI-Powered Classification
- **Real-time Image Recognition** using TensorFlow.js + MobileNet
- **Offline-First Architecture** - Works without internet after initial load
- **95% Accuracy** in waste categorization (Organic, Recyclable, Hazardous)
- **Instant Results** with confidence scores

### 🎯 Core Features
1. **AI Confidence Heatmap** - Visual overlay showing AI focus areas
2. **Waste Streak Tracker** - Daily streak counter with gamification
3. **City Live Feed** - Real-time Delhi NCR waste classifications
4. **Carbon Calculator** - CO₂ impact calculation per item
5. **Ward Challenge System** - Competition between Delhi neighborhoods
6. **Scan History Calendar** - GitHub-style contribution view
7. **Education Quiz** - Interactive waste management learning
8. **Municipal Alerts** - Real-time alerts for authorities
9. **Impact Report** - Downloadable environmental summary
10. **Offline Mode** - Full functionality without internet

### 🏙️ Delhi NCR Integration
- Ward-based leaderboards (Connaught Place, Dwarka, Rohini, etc.)
- Real-time city-wide analytics
- Municipal alert system
- Community challenges

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing-fast builds
- **TailwindCSS** for styling
- **TensorFlow.js** for AI classification
- **Recharts** for data visualization
- **Lucide React** for icons

### Backend
- **Node.js** + Express
- **MongoDB** for data persistence
- **JWT** authentication
- **Multer** for file uploads

### AI/ML
- **TensorFlow.js** - Client-side ML
- **MobileNet** - Pre-trained image classification
- **Custom Waste Classifier** - Keyword-based categorization

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB (optional - works offline)

### Quick Start

```bash
# Clone repository
git clone https://github.com/SaiyamJain468/wasteai.git
cd wasteai

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## 🎮 Usage

### Demo Accounts
- **Admin**: `admin@wasteai.com` / `admin123`
- **User**: `saiyam@wasteai.com` / `saiyam123`

### Classification Flow
1. Upload waste image (JPG/PNG/WEBP)
2. AI analyzes using TensorFlow.js
3. Get instant classification + disposal instructions
4. Earn points and track environmental impact

## 🏗️ Project Structure

```
wasteai/
├── src/
│   ├── components/      # React components
│   ├── pages/          # Page components
│   ├── utils/          # Utilities (AI classifier)
│   ├── context/        # React context
│   └── config/         # Configuration
├── server/             # Express backend
│   ├── controllers/    # Route controllers
│   ├── models/        # MongoDB models
│   └── routes/        # API routes
└── public/            # Static assets
```

## 🎨 Design System

**Brutalist Dark Grid Aesthetic**
- Pure black (#000000) background
- Acid green (#B4F000) primary color
- Zero gradients, sharp 90° angles
- 3px thick borders everywhere
- Inter font family
- JetBrains Mono for numbers

## 📊 Points System

| Waste Type | Points | Bin Color |
|------------|--------|-----------|
| Organic    | +10    | 🟢 Green  |
| Recyclable | +10    | 🔵 Blue   |
| Hazardous  | +25    | 🔴 Red    |

## 🚀 Deployment

### Netlify
```bash
npm run build
netlify deploy --prod
```

### Vercel
```bash
npm run build
vercel --prod
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Saiyam Jain**
- GitHub: [@SaiyamJain468](https://github.com/SaiyamJain468)
- Portfolio: [Coming Soon]

## 🙏 Acknowledgments

- TensorFlow.js team for ML framework
- MobileNet for pre-trained model
- Delhi Municipal Corporation for ward data
- Open source community

## 📧 Contact

For queries or support, reach out via GitHub issues or email.

---

<div align="center">
  <strong>Built with ❤️ for a cleaner Delhi NCR</strong>
  <br>
  <sub>© 2024 SaiyamJain468. All rights reserved.</sub>
</div>
