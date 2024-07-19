/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.js",
    "./src/components/profile.jsx",
    "./src/components/login.jsx",
    "./src/components/Navbar.jsx",
    "./src/components/registerVolunteer.jsx",
    "./src/components/oppDetails.jsx",
    "./src/components/home.jsx",
    "./src/components/createOpp.jsx",
    "./src/components/opps.jsx",
    "./src/components/oppDetails.jsx",
    "./src/components/toggleTheme.jsx",
    "./src/components/registeredEvent.jsx",
    "./src/components/editProfile.jsx",
    "./src/components/manageVols.jsx",
    "./src/components/registeredEvent.jsx",
    "./src/components/manageRewards.jsx",
    "./src/components/manageOrgs.jsx",
    "./src/components/postedEvent.jsx",
    "./src/components/pagination.jsx",
  ],
  theme: {
    extend: {
      colors: {
        'gray': "#d1d5db",
      },
    },
  },

  plugins: [require("daisyui")],

  daisyui: {
    themes: true, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "dim"]
    darkTheme: "dim", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
