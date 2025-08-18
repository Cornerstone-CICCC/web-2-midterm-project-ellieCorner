# 🎬 Movie site

![cover image](/public/cover.png)

A modern, responsive movie discovery web app built with **React**, **Tailwind CSS**, and **React Router**. Explore movies in both grid and list views, toggle dark/light mode, and enjoy animated loading components.

[Figma Link](https://www.figma.com/design/C2L1HdVGDySTiKXntUnSFD/Movie-site?node-id=2-460&t=qL18OAOSkCisVyAf-0)

---

## 🍿 Features

- **Responsive Layout**  
  Fully responsive design supporting mobile, tablet, and desktop screens.
- **Dark & Light Mode**  
  Automatic theme switching using Tailwind's dark mode utilities.
- **View Modes**  
  Toggle between **grid** and **list** views for browsing movies.

- **Animated Loading Screen**  
  A fun and engaging loading component with spinning icons, emoji, and gradient progress bar.

- **Header & Footer**  
  Sticky header with search functionality and view mode toggle.  
  Footer includes navigation links and credits, responsive across screen sizes.

- **Movie Details Modal**  
  Click on a movie card to see more details in a modal window.

---

## 🎥 Tech Stack

- **React 18**
- **TypeScript**
- **Tailwind CSS** (with dark mode)
- **React Router v6**
- **Lucide Icons**
- Custom hooks for local storage, search, and media queries

---

## 🎞️ Project Structure

```markdown
src/
├─ components/
│ ├─ common/ # Header, Footer, Loading, EmptyState
│ ├─ HeroSlideSection.tsx
│ ├─ MovieCard.tsx
│ ├─ MovieListView.tsx
│ └─ MovieDetailModal.tsx
├─ hooks/ # useLocalStorage, useSearch, useMedia
├─ layout/ # RootLayout.tsx
├─ types/ # TypeScript types for movies
├─ utils/ # Helper functions (e.g., sort, movie details)
├─ App.tsx
├─ Home.tsx
├─ About.tsx
└─ index.css
```

---

License
MIT License © Ellie Jung
