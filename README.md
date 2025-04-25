# Movie Search App

A React Native mobile application that allows users to search and view movie information using the OMDB API. Built with Expo and React Navigation.

## 📱 Features

- Search movies by title
- View detailed movie information
- Pull to refresh functionality
- Error handling and loading states
- Responsive design
- Clean and intuitive user interface

## 🛠 Technologies

- React Native
- Expo
- React Navigation
- React Native Paper
- Axios
- OMDB API
- Lodash

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/movie-search-app.git
cd movie-search-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OMDB API key:
```
OMDB_API_KEY=your_api_key_here
```

4. Start the development server (you can use any of these commands):
```bash
npm start
# or
expo start
# or
npx expo start
```

5. Use the Expo Go app on your mobile device to scan the QR code or run on an emulator.

## 📱 Running on Emulator/Device

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

### Web
```bash
npm run web
```

## 🏗️ Project Structure

```
movie-search-app/
├── App.js
├── components/
│   └── MovieCard.js
├── screens/
│   ├── HomeScreen.js
│   └── MovieDetails.js
├── services/
│   └── api.js
└── assets/
```

## 📄 API Reference

This project uses the [OMDB API](https://www.omdbapi.com/). You'll need to obtain an API key from their website to run the application.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

Your Name
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your Name](https://linkedin.com/in/your-profile)

## 🙏 Acknowledgments

- [OMDB API](https://www.omdbapi.com/) for providing movie data
- [Expo](https://expo.dev/) for the amazing development platform
- [React Native Paper](https://callstack.github.io/react-native-paper/) for the UI components

