# MedMap360

MedMap360 is a full-stack web application designed to assist users in locating nearby medical facilities, including clinics, pharmacies, and hospitals, especially during emergencies. The application integrates themes of Smart Cities, Healthcare, and Accessibility, providing real-time information and community-driven reporting.

## Key Features

1. **Live Health Map**: 
   - Displays hospitals, pharmacies, clinics, and ambulance hotspots on an interactive map.
   - Users can filter locations by type (e.g., Clinics, Oxygen, Ambulance).

2. **Emergency Mode Page**: 
   - Provides one-click access to the nearest ambulance, hospitals, and emergency helplines.
   - Offers real-time directions to the nearest medical support.

3. **Crowdsource Availability Form**: 
   - Allows users to report the availability of hospital beds, oxygen cylinders, and medicines.
   - Includes fields for type, location (with geolocation), and validity period.

4. **Accessibility-Focused Navigation**: 
   - Helps users find wheelchair-friendly hospitals and routes.
   - Displays accessibility indicators on the map and allows users to submit accessibility information.

5. **Responsive Navbar**: 
   - Features links to Home, Emergency, and Submit Availability pages.
   - Designed with Tailwind CSS for a clean and mobile-friendly experience.

6. **Admin Dashboard (optional)**: 
   - Enables admins to view and moderate submitted availability data.

## Tech Stack

- **Frontend**: React (with TypeScript), Tailwind CSS, React Router DOM
- **Backend**: Firebase Firestore for real-time data, Firebase Hosting if needed
- **Map Integration**: Google Maps API or Mapbox

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/MedMap360.git
   ```

2. Navigate to the project directory:
   ```
   cd MedMap360
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up your Firebase configuration in the `.env` file.

5. Start the development server:
   ```
   npm start
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.