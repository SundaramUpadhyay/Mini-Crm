# Mini CRM Platform

A full-stack Customer Relationship Management platform built with Next.js, featuring AI-powered campaign creation, customer management, and analytics dashboard.

## 🚀 Features

- **Authentication**: Google OAuth 2.0 integration
- **Dashboard**: Real-time stats and analytics
- **Customer Management**: Add, view, and manage customer data
- **Campaign Creation**: AI-powered audience targeting with natural language
- **Campaign History**: Track performance and delivery statistics
- **RESTful APIs**: Secure endpoints for data management
- **Responsive Design**: Clean, modern UI inspired by professional CRM tools

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js with Google OAuth
- **Validation**: Joi
- **UI Components**: Radix UI, Lucide React Icons

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd mini-crm-platform
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   \`\`\`env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-here
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   MONGODB_URI=mongodb://localhost:27017/mini-crm
   OPENAI_API_KEY=your-openai-api-key (optional)
   \`\`\`

4. **Set up Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

5. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Update the `MONGODB_URI` in your `.env.local` file

6. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 API Endpoints

### Authentication Required
All API endpoints require authentication via NextAuth session.

### Customers API
- `GET /api/customers` - Fetch all customers
- `POST /api/customers` - Create a new customer

**Customer Schema:**
\`\`\`json
{
  "name": "string (required)",
  "email": "string (required, unique)",
  "phone": "string (required)",
  "profileImage": "string (optional, URL)",
  "totalSpend": "number (default: 0)",
  "lastPurchaseDate": "date (optional)"
}
\`\`\`

### Orders API
- `GET /api/orders` - Fetch all orders
- `POST /api/orders` - Create a new order

**Order Schema:**
\`\`\`json
{
  "customerId": "string (required, MongoDB ObjectId)",
  "amount": "number (required, min: 0)",
  "date": "date (default: current date)"
}
\`\`\`

### Campaigns API
- `GET /api/campaigns` - Fetch all campaigns
- `POST /api/campaigns` - Create a new campaign

**Campaign Schema:**
\`\`\`json
{
  "name": "string (required)",
  "description": "string (required)",
  "naturalLanguageRule": "string (optional)",
  "generatedRules": "string (optional)"
}
\`\`\`

### AI API
- `POST /api/ai/generate-rules` - Generate audience rules from natural language

## 🏗️ Architecture

\`\`\`
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (API Routes)  │◄──►│   (MongoDB)     │
│                 │    │                 │    │                 │
│ • Dashboard     │    │ • Authentication│    │ • Customers     │
│ • Campaigns     │    │ • CRUD APIs     │    │ • Orders        │
│ • Customers     │    │ • AI Integration│    │ • Campaigns     │
│ • Auth Pages    │    │ • Validation    │    │ • Comm. Logs    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
\`\`\`

## 🤖 AI Integration

The platform includes AI-powered features for campaign creation:

1. **Natural Language Processing**: Convert plain English descriptions into structured audience rules
2. **Rule Generation**: Automatically generate targeting criteria based on user input
3. **Mock Implementation**: Currently uses a mock AI service (replace with OpenAI/Gemini in production)

**Example AI Prompts:**
- "People who haven't shopped in 6 months and spent over ₹5000"
- "New customers who joined in the last 30 days"
- "High-value customers with total spend above ₹10000"

## 📊 Features Overview

### Dashboard
- Real-time statistics (customers, orders, campaigns, revenue)
- Quick action buttons for common tasks
- Clean, responsive design matching the provided screenshots

### Campaign Management
- Create campaigns with AI-assisted audience targeting
- View campaign history with delivery statistics
- Simulate message delivery (90% success rate)
- Track sent/failed message counts

### Customer Management
- View all customers with search functionality
- Display customer profiles with purchase history
- Track total spend and last purchase date

## 🚀 Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Backend
The backend runs on Next.js API routes, so it deploys with the frontend on Vercel.

### Database
- Use MongoDB Atlas for production
- Update `MONGODB_URI` environment variable

## 🔒 Security Features

- **Authentication**: Google OAuth 2.0 via NextAuth.js
- **API Protection**: All endpoints require valid session
- **Input Validation**: Joi schema validation for all API inputs
- **CORS Protection**: Built-in Next.js security headers
- **Environment Variables**: Sensitive data stored securely

## 🧪 Testing the APIs

### Using Postman

1. **Authentication**: First sign in through the web interface to establish a session
2. **Customer Creation**:
   \`\`\`bash
   POST /api/customers
   Content-Type: application/json
   
   {
     "name": "John Doe",
     "email": "john@example.com",
     "phone": "+1234567890",
     "totalSpend": 5000
   }
   \`\`\`

3. **Order Creation**:
   \`\`\`bash
   POST /api/orders
   Content-Type: application/json
   
   {
     "customerId": "customer_id_here",
     "amount": 1500,
     "date": "2024-01-15"
   }
   \`\`\`

## 🎯 Known Limitations

1. **AI Integration**: Currently uses mock AI responses (implement OpenAI/Gemini for production)
2. **File Uploads**: Profile image uploads not implemented (URLs only)
3. **Real-time Updates**: Dashboard stats require page refresh
4. **Message Delivery**: Simulated delivery (implement real SMS/Email service)
5. **Advanced Filtering**: Customer search is basic (implement advanced filters)

## 🔮 Future Enhancements

- Real AI integration with OpenAI/Gemini
- File upload for customer profile images
- Real-time dashboard updates with WebSockets
- Advanced customer segmentation
- Email/SMS integration for actual message delivery
- Campaign analytics and reporting
- Bulk customer import/export
- Role-based access control

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the GitHub issues
2. Review the API documentation
3. Ensure all environment variables are set correctly
4. Verify MongoDB connection

---

**Built with ❤️ using Next.js, MongoDB, and modern web technologies.**
