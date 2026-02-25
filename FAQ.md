# Frequently Asked Questions (FAQ)

## General Questions

### What is WasteAI?
WasteAI is an AI-powered waste classification system that helps users identify and properly dispose of waste items. Using TensorFlow.js and MobileNet, it achieves 95% accuracy in categorizing waste as Organic, Recyclable, or Hazardous.

### Is WasteAI free to use?
Yes! WasteAI is completely free and open-source under the MIT License. You can use, modify, and distribute it freely.

### Does WasteAI work offline?
Yes! After the initial load, WasteAI works completely offline. The AI model runs in your browser, so no internet connection is needed for classification.

### Which cities does WasteAI support?
Currently, WasteAI is optimized for Delhi NCR with ward-specific features. We plan to expand to other Indian cities in 2025.

## Technical Questions

### What technologies does WasteAI use?
- **Frontend**: React 18, TypeScript, Vite, TailwindCSS
- **Backend**: Node.js, Express, MongoDB
- **AI/ML**: TensorFlow.js, MobileNet
- **Deployment**: Netlify/Vercel

### How accurate is the AI classification?
WasteAI achieves 95% accuracy using MobileNet and custom keyword mapping. We're working on a custom model to reach 98% accuracy.

### What image formats are supported?
WasteAI supports JPG, PNG, and WEBP formats. Maximum file size is 5MB.

### How fast is the classification?
Classification typically takes less than 2 seconds, including image preprocessing and model inference.

### Can I use WasteAI on mobile devices?
Yes! WasteAI is mobile-first and works on all modern smartphones. A native mobile app is planned for Q2 2025.

## Privacy & Security

### What data does WasteAI collect?
WasteAI collects:
- User account information (name, email, ward)
- Classification history (waste type, timestamp, points)
- Uploaded images (stored temporarily, can be deleted)

### Is my data secure?
Yes! We use:
- JWT authentication
- bcrypt password hashing
- HTTPS encryption
- Secure MongoDB connections

### Can I delete my data?
Yes! You can delete your account and all associated data at any time from your profile settings.

### Are my images stored permanently?
No. Images are processed client-side and only metadata is stored. You can delete your classification history anytime.

## Features & Usage

### How do I earn points?
- Organic waste: +10 points
- Recyclable waste: +10 points
- Hazardous waste: +25 points

### What is the streak system?
Scan waste daily to maintain your streak. Longer streaks unlock achievements and boost your leaderboard ranking.

### How does the leaderboard work?
Leaderboards are ward-based. Your rank is determined by total points earned. Top 10 users are displayed publicly.

### Can I compete with other wards?
Yes! The Ward Challenge system lets neighborhoods compete for the highest collective points.

### What is the carbon calculator?
Each waste item has an estimated CO₂ impact. The calculator shows how much carbon you've saved through proper waste segregation.

## Troubleshooting

### Classification is slow or not working
- Check your internet connection (for first load)
- Clear browser cache
- Try a different browser
- Ensure JavaScript is enabled
- Check if image is under 5MB

### I can't log in
- Verify your email and password
- Check if Caps Lock is on
- Try password reset
- Clear cookies and try again

### Images won't upload
- Check file format (JPG, PNG, WEBP only)
- Ensure file size is under 5MB
- Try compressing the image
- Check browser permissions

### Leaderboard not updating
- Refresh the page
- Check your internet connection
- Wait a few minutes for sync
- Contact support if issue persists

## Contributing

### How can I contribute?
See our [Contributing Guide](CONTRIBUTING.md) for detailed instructions. We welcome:
- Bug reports
- Feature requests
- Code contributions
- Documentation improvements
- Translations

### I found a bug. What should I do?
1. Check if it's already reported in [GitHub Issues](https://github.com/SaiyamJain468/wasteai/issues)
2. If not, create a new issue with details
3. Include screenshots and error messages
4. Specify your browser and OS

### Can I suggest new features?
Absolutely! Open a feature request on GitHub with:
- Problem statement
- Proposed solution
- Use cases
- Mockups (if applicable)

## Deployment

### Can I self-host WasteAI?
Yes! See our [Deployment Guide](DEPLOYMENT.md) for instructions on deploying to:
- Netlify
- Vercel
- AWS
- Docker

### What are the server requirements?
- Node.js 18+
- MongoDB (or MongoDB Atlas)
- 512MB RAM minimum
- 1GB storage

### How do I set up MongoDB?
1. Create a free MongoDB Atlas account
2. Create a cluster
3. Get connection string
4. Add to `.env` file

## Business & Partnerships

### Can I use WasteAI for my organization?
Yes! WasteAI is open-source. For enterprise features, contact us for custom solutions.

### Do you offer API access?
Yes! See our [API Documentation](API_DOCUMENTATION.md) for details.

### Can municipalities partner with WasteAI?
Yes! We're actively seeking municipal partnerships. Contact us for pilot programs.

### Is there a commercial version?
We're developing enterprise features (SaaS platform, municipal dashboard) planned for Q4 2025.

## Roadmap & Future

### When will the mobile app launch?
Native mobile apps (iOS/Android) are planned for Q2 2025.

### Will you support other languages?
Hindi language support is coming in Q2 2025. More languages will follow based on demand.

### What about blockchain rewards?
Blockchain-based rewards system is planned for Q3 2025, allowing users to earn and trade carbon credits.

### Will you expand to other cities?
Yes! Multi-city expansion is planned for Q3 2025, starting with Mumbai and Bangalore.

## Support

### How do I get help?
- Check this FAQ
- Read the [Documentation](README.md)
- Search [GitHub Issues](https://github.com/SaiyamJain468/wasteai/issues)
- Open a new issue
- Email: support@wasteai.com

### Where can I report security issues?
See our [Security Policy](SECURITY.md) for responsible disclosure guidelines.

### How do I stay updated?
- Star the repository on GitHub
- Watch for releases
- Follow on social media (coming soon)
- Join our community (Discord coming soon)

---

**Didn't find your answer?** [Open an issue](https://github.com/SaiyamJain468/wasteai/issues/new) or contact us directly.
