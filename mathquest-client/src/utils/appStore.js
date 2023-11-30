// Import the userReducer from the userSlice file
import userReducer from './userSlice';
// Import the configureStore function from the @reduxjs/toolkit library
const { configureStore } = require("@reduxjs/toolkit");

// Create the Redux store using the configureStore function
const appStore = configureStore({
    // Specify the reducer for the store, where 'user' is the slice name and userReducer is the associated reducer
    reducer: {
        user : userReducer
    }
})

// Export the created Redux store for use in the application
export default appStore;