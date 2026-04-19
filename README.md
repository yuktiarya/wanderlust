<h1 align="center">🌍 Wanderlust</h1>

<p align="center">
  <strong>A Full-Stack Home Rental & Travel Discovery Platform</strong><br>
  Built with Node.js, Express, MongoDB, and Bootstrap 5
</p>

---

## 📖 About The Project

**Wanderlust** is a comprehensive, full-stack web application heavily inspired by Airbnb. It serves as a digital marketplace for travel enthusiasts where users can explore available vacation homes, cabins, and villas. Registered users have the power to create their own listings, upload property images, interact with locations using live maps, and leave reviews or ratings on places they've visited.

## 🌟 Start-to-End User Flow (How It Works)

### 1. Discovery & Browsing (No Login Required)
- **Home/Listings Page:** When a user visits the app, they immediately see a grid of beautiful travel destinations and accommodations.
- **Search & Filters:** Users can search for specific locations, or filter listings by categories (e.g., Trending, Iconic Cities, Castles, Pools).
- **Listing Details:** Clicking on a listing reveals all details including the description, price, owner information, an interactive location map, and existing user reviews.

### 2. Authentication Flow
- **Sign Up / Login:** To interact with the platform (create a listing or leave a review), the user must create an account. Passwords are securely hashed and salted before being stored in the database.
- **Session Management:** Once logged in, the user stays authorized across pages via secure browser cookies and Express sessions.

### 3. Creating & Managing Listings (Host Flow)
- **Add a Listing:** An authenticated user can fill out a form detailing their property (Title, Description, Price, Country, Location).
- **Image Uploading:** Along with text data, users can upload an image of the physical location. The image is seamlessly uploaded and optimized via Cloudinary.
- **Geocoding & Maps:** The location string typed by the host is automatically converted into coordinates (Latitude/Longitude) using Mapbox's Geocoding API and plotted visually on the map.
- **Ownership Features:** Only the creator/owner of a listing has the permission to **Edit** or **Delete** that specific listing. 

### 4. Review System (Guest Flow)
- **Leave a Review:** Authenticated users can leave a 1-5 star rating and a comment on any listing.
- **Review Deletion:** Users can delete their own reviews, and the Listing owner can also moderate/delete reviews on their property.

---

## 💻 Tech Stack

### Frontend
- **HTML5 & CSS3:** For structural web design.
- **Bootstrap 5:** For a highly responsive, Mobile-First User Interface.
- **EJS (Embedded JavaScript):** Dynamic HTML templating engine.
- **Mapbox GL JS:** For beautiful, interactive, and customizable maps.

### Backend
- **Node.js:** JavaScript runtime.
- **Express.js:** Fast, unopinionated web framework for routing and middleware.
- **Cloudinary / Multer:** For parsing form data and storing images in the cloud.
- **Mapbox Geocoding API:** For translating location text into coordinate data.

### Database
- **MongoDB Atlas:** Cloud NoSQL Database.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB.

### Security & Utilities
- **Passport.js & Passport-Local:** For secure User Authentication patterns.
- **Joi:** robust Server-Side data validation to prevent bad DB queries.
- **Connect-Flash:** Presenting beautiful success/error alerts.

---

## ⚙️ Local Installation & Setup 

Follow these steps to get a local copy of this project up and running on your machine.

### Prerequisites
- Install **Node.js** (v18 or higher recommended)
- Install **Git**
- Create a **MongoDB Atlas** account and cluster.
- Create a **Cloudinary** account.
- Create a **Mapbox** account.

### 1. Clone the repository
```bash
git clone https://github.com/yuktiarya/wanderlust.git
cd wanderlust
```

### 2. Install NPM dependencies
```bash
npm install
```

### 3. Create a `.env` file
Create a new file named `.env` in the root directory of the project and add the following API keys from your accounts:

```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_mapbox_public_token

ATLASDB_URL=mongodb+srv://<username>:<password>@clusterX.mongodb.net/wanderlust?retryWrites=true&w=majority
SECRET=your_super_secret_session_string
```
*(Make sure to replace the placeholder values with your actual keys and ensure your current IP address is whitelisted in MongoDB Atlas Network Access).*

### 4. Initialize Database (Optional)
If you want to start with completely dummy data instead of a blank slate, run the initialization script. **Warning: This will clear any existing listings.**
```bash
node init/index.js
```

### 5. Start the Server
```bash
npm start
# or 
node app.js
```

### 6. View the App
Open your favorite web browser and navigate to:
**`https://wanderlust-47ff.onrender.com`**

---

## 📁 Project Structure

```text
├── public/          # Custom CSS, JS files, and static assets
├── views/           # EJS Template files (Layouts, Listings, Users)
├── models/          # Mongoose Database Schemas (Listing, Review, User)
├── routes/          # Express Routes (Separated into logical files)
├── controllers/     # Core application logic & database queries
├── utils/           # Error handling wrapAsync and ExpressError classes
├── init/            # Dummy data and initialization scripts
├── app.js           # Main application entry point & middleware setup
├── middleware.js    # Authentication & Authorization checkers
├── schema.js        # Joi server-side validation schemas
└── cloudConfig.js   # Cloudinary configuration
```

---

<p align="center">
  Developed with ❤️ by Yukti Arya
</p>
