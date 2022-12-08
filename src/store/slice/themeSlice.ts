import { createSlice } from "@reduxjs/toolkit";





// const toggleTheme = () => {
//     if (theme === 'light-theme') {
//       setTheme('dark-theme');
//     } else {
//       setTheme('light-theme');
//     }
//   };

const initialState = {
    darkMode: true
}



const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {

        }
    }
})





export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;