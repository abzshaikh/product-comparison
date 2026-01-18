$(document).ready(function () {
    const MAX_COMPARE = 3;
    const STORAGE_KEY = "productCompareItems";

    const products = [
        {
            id: 1,
            name: "iPhone 15",
            brand: "Apple",
            category: "phones",
            image: "./images/iphone15.webp",
            price: 999,
            features: { Battery: "20 hrs", Screen: "6.1\" OLED", Camera: "48 MP", Processor:"N/A" },
        },
        {
            id: 2,
            name: "Galaxy S24",
            brand: "Samsung",
            category: "phones",
            image: "./images/galaxyS24.webp",
            price: 899,
            features: { Battery: "22 hrs", Screen: "6.2\" AMOLED", Camera: "50 MP", Processor:"N/A" },
        },
        {
            id: 3,
            name: "Pixel 8",
            brand: "Google",
            category: "phones",
            image: "./images/pixel8.webp",
            price: 799,
            features: { Battery: "24 hrs", Screen: "6.1\" OLED", Camera: "50 MP", Processor:"N/A" },
        },
        {
            id: 4,
            name: "OnePlus 12",
            brand: "OnePlus",
            category: "phones",
            image: "./images/oneplus12.webp",
            price: 749,
            features: { Battery: "26 hrs", Screen: "6.7\" AMOLED", Camera: "50 MP", Processor:"N/A" },
        },
        {
            id: 5,
            name: "Xiaomi 14",
            brand: "Xiaomi",
            category: "phones",
            image: "./images/xiaomi14.webp",
            price: 699,
            features: { Battery: "25 hrs", Screen: "6.36\" AMOLED", Camera: "50 MP", Processor:"N/A" },
        },
        {
            id: 6,
            name: "Sony Xperia 5",
            brand: "Sony",
            category: "phones",
            image: "./images/xperia5.webp",
            price: 849,
            features: { Battery: "23 hrs", Screen: "6.1\" OLED", Camera: "48 MP", Processor:"N/A" },
        },
        {
            id: 7,
            name: "Motorola Edge 40",
            brand: "Motorola",
            category: "phones",
            image: "./images/edge40.webp",
            price: 599,
            features: { Battery: "24 hrs", Screen: "6.55\" OLED", Camera: "50 MP", Processor:"N/A" },
        },
        {
            id: 8,
            name: "Nothing Phone (2)",
            brand: "Nothing",
            category: "phones",
            image: "./images/nothingphone2.webp",
            price: 649,
            features: { Battery: "25 hrs", Screen: "6.7\" OLED", Camera: "50 MP", Processor:"N/A" },
        },

        // Laptops
        {
            id: 9,
            name: "MacBook Air M3",
            brand: "Apple",
            category: "laptops",
            image: "./images/macbookairm3.webp",
            price: 1299,
            features: { Battery: "18 hrs", Screen: "13.6\" Retina", Camera: "N/A", Processor: "Apple M3" },
        },
        {
            id: 10,
            name: "Dell XPS 13",
            brand: "Dell",
            category: "laptops",
            image: "./images/dellxps13.webp",
            price: 1199,
            features: { Battery: "14 hrs", Screen: "13.4\" FHD+", Camera: "N/A", Processor: "Intel i7" },
        },

        // Tablets
        {
            id: 11,
            name: "iPad Pro",
            brand: "Apple",
            category: "tablets",
            image: "./images/ipadpro.webp",
            price: 1099,
            features: { Battery: "10 hrs", Screen: "12.9\" Liquid Retina", Camera: "N/A", Processor: "Apple M2" },
        },
        {
            id: 12,
            name: "Galaxy Tab S9",
            brand: "Samsung",
            category: "tablets",
            image: "./images/galaxytabs9.webp",
            price: 899,
            features: { Battery: "13 hrs", Screen: "11\" AMOLED", Camera: "N/A", Processor: "Snapdragon 8 Gen 2" },
        },
    ];


    let compareItems = loadCompareItems();
    const FILTER_KEY = "productCategoryFilters";
    let activeCategories = loadCategoryFilters();

    /* ---------------- RENDER FUNCTIONS ---------------- */

    function renderProducts(filter = "") {
        const grid = $("#productGrid");
        grid.empty();

        const filtered = products.filter((p) => {
            const term = filter.toLowerCase();
            const matchesSearch =
            p.name.toLowerCase().includes(term) ||
            p.brand.toLowerCase().includes(term);

            const matchesCategory =
            activeCategories.length === 0 || activeCategories.includes(p.category);

            return matchesSearch && matchesCategory;
        });

        filtered.forEach((product) => {
            const isActive = compareItems.includes(product.id);
            const card = $(`
            <div class="product-card" tabindex="0" role="article" aria-label="${product.name} by ${product.brand}">
                <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" />
                <span class="category-badge">${product.category}</span>
                </div>
                <div class="product-title">${product.name}</div>
                <div class="product-brand">${product.brand}</div>
                <div class="product-price">$${product.price}</div>
                <ul class="product-features">
                ${Object.values(product.features)
                    .slice(0, 3)
                    .map((f) => `<li>${f}</li>`)
                    .join("")}
                </ul>
                <button class="compare-btn ${isActive ? "active" : ""}" data-id="${product.id}" aria-pressed="${isActive}">
                ${isActive ? "Remove from Compare" : "Add to Compare"}
                </button>
            </div>
            `);

            grid.append(card);
        });
    }

    function renderCompareBar() {
      const bar = $("#compareBar");
      const itemsContainer = $("#compareItems");
      itemsContainer.empty();

      if (compareItems.length >= 2) {
        bar.addClass("active");
      } else {
        bar.removeClass("active");
      }

      compareItems.forEach((id) => {
        const product = products.find((p) => p.id === id);
        if (!product) return;

        const chip = $(
          `<div class="compare-chip">
            <span>${product.name}</span>
            <button class="remove-chip" data-id="${product.id}" aria-label="Remove ${product.name} from comparison">&times;</button>
          </div>`
        );

        itemsContainer.append(chip);
      });
    }

    function renderComparisonView() {
      const view = $("#comparisonView");
      const table = $("#comparisonTable");
      table.empty();

      if (compareItems.length < 2) {
        view.removeClass("active");
        return;
      }

      view.addClass("active");

      const selectedProducts = compareItems.map((id) =>
        products.find((p) => p.id === id)
      );

      const allFeatures = Object.keys(selectedProducts[0].features);

      // Header row
      const headerRow = $("<tr><th>Feature</th></tr>");
      selectedProducts.forEach((p) => {
        headerRow.append(`<th>${p.name}</th>`);
      });
      table.append(headerRow);

      // 🖼️ Image row
      const imageRow = $("<tr><td>Image</td></tr>");
      selectedProducts.forEach((p) => {
        imageRow.append(`
          <td class="image-cell">
            <img src="${p.image}" alt="${p.name}" />
          </td>
        `);
      });
      table.append(imageRow);

      // Price row
      const priceRow = $("<tr><td>Price</td></tr>");
      const prices = selectedProducts.map((p) => p.price);
      selectedProducts.forEach((p, i) => {
        const isDiff = prices.some((val) => val !== p.price);
        priceRow.append(`<td class="${isDiff ? "diff" : ""}">$${p.price}</td>`);
      });
      table.append(priceRow);

      // Feature rows
      allFeatures.forEach((feature) => {
        const row = $(`<tr><td>${feature}</td></tr>`);
        const values = selectedProducts.map((p) => p.features[feature]);

        selectedProducts.forEach((p, i) => {
          const isDiff = values.some((val) => val !== p.features[feature]);
          row.append(
            `<td class="${isDiff ? "diff" : ""}">${p.features[feature]}</td>`
          );
        });

        table.append(row);
      });
    }

    /* ---------------- STORAGE ---------------- */

    function saveCompareItems() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(compareItems));
    }

    function loadCompareItems() {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      try {
        return JSON.parse(data);
      } catch {
        return [];
      }
    }

    function saveCategoryFilters() {
        localStorage.setItem(FILTER_KEY, JSON.stringify(activeCategories));
    }

    function loadCategoryFilters() {
        const data = localStorage.getItem(FILTER_KEY);
        if (!data) return [];
        try {
            return JSON.parse(data);
        } catch {
            return [];
        }
    }

    /* ---------------- INTERACTIONS ---------------- */

    // Add/remove compare
    $(document).on("click", ".compare-btn", function () {
      const id = parseInt($(this).data("id"));
      toggleCompare(id);
    });

    // Keyboard: Enter/Space on button or card
    $(document).on("keydown", ".product-card", function (e) {
      if (e.key === "Enter") {
        $(this).find(".compare-btn").click();
      }
    });

    $(document).on("keydown", ".compare-btn", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        $(this).click();
      }
    });

    function toggleCompare(id) {
      if (compareItems.includes(id)) {
        compareItems = compareItems.filter((item) => item !== id);
      } else {
        if (compareItems.length >= MAX_COMPARE) {
          alert(`You can compare up to ${MAX_COMPARE} products.`);
          return;
        }
        compareItems.push(id);
      }

      saveCompareItems();
      renderProducts($("#searchInput").val());
      renderCompareBar();
      renderComparisonView();
    }

    // Remove from chip
    $(document).on("click", ".remove-chip", function () {
      const id = parseInt($(this).data("id"));
      toggleCompare(id);
    });

    // Compare now
    $("#compareNow").on("click", function () {
      $("#comparisonView")[0].scrollIntoView({ behavior: "smooth" });
      renderComparisonView();
    });

    // Clear
    $("#clearCompareBar, #clearComparison").on("click", function () {
      compareItems = [];
      saveCompareItems();
      renderProducts($("#searchInput").val());
      renderCompareBar();
      renderComparisonView();
    });

    // Search
    $("#searchInput").on("input", function () {
      const value = $(this).val();
      renderProducts(value);
    });

    // Theme toggle
    $("#themeToggle").on("click", function () {
      const isDark = $("body").toggleClass("dark").hasClass("dark");
      $(this)
        .attr("aria-pressed", isDark)
        .text(isDark ? "☀️ Light Mode" : "🌙 Dark Mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });

    function loadTheme() {
      const theme = localStorage.getItem("theme");
      if (theme === "dark") {
        $("body").addClass("dark");
        $("#themeToggle")
          .attr("aria-pressed", true)
          .text("☀️ Light Mode");
      }
    }

    // On checkbox change
    $(document).on("change", ".category-checkbox", function () {
        const value = $(this).val();

        if (this.checked) {
            if (!activeCategories.includes(value)) {
            activeCategories.push(value);
            }
        } else {
            activeCategories = activeCategories.filter((cat) => cat !== value);
        }

        saveCategoryFilters();
        renderProducts($("#searchInput").val());
    });

    function syncCategoryCheckboxes() {
        $(".category-checkbox").each(function () {
            const value = $(this).val();
            $(this).prop("checked", activeCategories.includes(value));
        });
    }

    /* ---------------- INIT ---------------- */

    loadTheme();
    renderProducts();
    renderCompareBar();
    renderComparisonView();
    syncCategoryCheckboxes();
  });

  // Arrow key navigation between product cards
    $(document).on("keydown", ".product-card", function (e) {
    const $cards = $(".product-card:visible");
    const currentIndex = $cards.index(this);

    if (currentIndex === -1) return;

    // Estimate number of columns based on layout
    const containerWidth = $("#productGrid").width();
    const cardWidth = $(this).outerWidth(true);
    const columns = Math.max(1, Math.floor(containerWidth / cardWidth));

    let targetIndex = null;

    switch (e.key) {
        case "ArrowRight":
        targetIndex = currentIndex + 1;
        break;
        case "ArrowLeft":
        targetIndex = currentIndex - 1;
        break;
        case "ArrowDown":
        targetIndex = currentIndex + columns;
        break;
        case "ArrowUp":
        targetIndex = currentIndex - columns;
        break;
        default:
        return;
    }

    if (targetIndex >= 0 && targetIndex < $cards.length) {
        e.preventDefault();
        $cards.eq(targetIndex).focus();
    }
});