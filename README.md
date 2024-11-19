
# 📦 Asset Management System

An efficient and user-friendly **Asset Management System** designed to help organizations manage their assets effectively. This system allows users to track asset locations, monitor specifications, and analyze asset values by category and location.  

---

## 🚀 Features

### 📊 **Dashboard**  
- Summarized view of **asset values** by category and location.  
- Visual representation of data for quick insights.  

### 🗂️ **Asset Monitoring**  
- Detailed tracking of asset locations (Buildings and Rooms).  
- Complete asset specifications available for each asset.  

### 📋 **Data Management**  
- CSV Upload: Import assets in bulk via a structured CSV template.  
- Detailed asset data, including:  
  - Asset Code, Serial Number, Description, Category, Condition, and more.  
  - Acquisition and Valuation details.  

### 🏢 **Buildings and Rooms**  
- List all assets in a selected building or room.  
- Modal view for room-specific asset details.  

### 🔐 **Authentication**  
- User management with role-based access control.  
- Change Password feature with secure token-based authentication.  

---

## 📂 **Project Structure**

```
📁 src
├── 📁 components      # Reusable React components
├── 📁 container       # Asset-specific features (dashboard, Monitoring, etc.)
├── 📁 redux           # Redux setup for state management
│   ├── 📄 actions     # Action creators
│   ├── 📄 reducers    # Reducers for state updates
│   └── 📄 store.js    # Redux store configuration
├── 📁 utils           # Utility functions (CSV parsing, formatting, etc.)
└── 📄 App.tsx         # Main application file
```

---

## 🛠️ **Technologies Used**

- **Frontend**: React, TypeScript, Tailwind CSS  
- **State Management**: Redux Toolkit  
- **Backend**: Node.js, Express  
- **Database**: PostgreSQL  
- **API Client**: Axios  

---


## 🎨 **Design Highlights**

- **Responsive UI**: Optimized for all devices.  
- **Color Palette**: Blue, White, and Black for professional aesthetics.  
- **Interactive Modals**: For enhanced user experience in asset details.  

---

## 💾 **How to Run the Project**

1. Clone the repository:  
   ```bash
   git clone https://github.com/codeWithEdison/UR-AMS.git
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Set up environment variables (`.env` file):  
   ```env
   REACT_APP_API_BASE_URL=https://ur-assets-management-system-backend.onrender.com/api/v1
   ```
4. Start the application:  
   ```bash
   npm start
   ```

---

## 📅 **Future Enhancements**

- **Advanced Analytics**: Predictive insights and asset performance trends.  
- **Mobile App**: Companion app for on-the-go asset management.  
- **QR Code Integration**: Simplify asset tracking using QR codes.  

---

## 🤝 **Contributing**

Contributions are welcome! Please follow these steps:  
1. Fork the repository  
2. Create a feature branch: `git checkout -b feature-name`  
3. Commit your changes: `git commit -m 'Add some feature'`  
4. Push to the branch: `git push origin feature-name`  
5. Open a Pull Request  

---

## 📧 **Contact**

For inquiries or support, please contact:  
**Email**: [your-email@example.com](mailto:edsnkvn@gmail.com)  
**Website**: [X-Ticket](ur-ams.vercel.app)  
