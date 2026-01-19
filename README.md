# product-comparison

An interactive, responsive web interface for product comparison

# Product Comparison Interface

An interactive, responsive, and accessible web interface that allows users to compare products (phones, laptops, tablets) side-by-side. Built using **HTML, SCSS, and jQuery** with no backend — fully static and fast.

---

## Live Features

### Product Listing

- Displays a responsive grid of products.
- Each product shows:
  - Name
  - Brand
  - Image
  - Price
  - 2–3 key features
  - Category badge (Phones, Laptops, Tablets)

### Search & Filtering

- Real-time **search bar** to filter by name or brand.
- **Multi-select category filters** (checkbox-based).
- Filter selections persist using `localStorage`.

### Compare Functionality

- Users can select up to **3 products** to compare.
- A **compare bar** appears when at least 2 products are selected.
- Comparison view shows:
  - Product names
  - Product images
  - Prices
  - Feature rows
- Differences are visually highlighted.

### Accessibility

- Full keyboard support:
  - `Tab` navigation
  - Arrow key navigation between product cards
  - `Enter` / `Space` to add/remove from compare
- Proper ARIA labels and roles.

### Light / Dark Mode

- Toggle between light and dark themes.
- Theme preference is persisted using `localStorage`.

### Persistence

- Selected comparison items persist across reloads.
- Selected filters persist across reloads.
- Theme preference persists.

---

## Tech Stack

- **HTML5**
- **SCSS** (compiled to CSS)
- **jQuery**
- **LocalStorage** (for persistence)
- No backend, APIs, or frameworks.

---

## Setup instructions

- Clone the Repository
- Compile scss to css
- Open index.html in browser

---

## 🔗 Live Demo

[View the live project](https://product-compare-list.netlify.app/)
