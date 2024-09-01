window.onload = function () {
    const apiKey = 'QTd4H7HDVpLKhqIqtV42NmAthrt8ub4b'; // Replace with your API key if needed
    const apiUrl = `https://api.nytimes.com/svc/books/v3/lists/2019-01-20/hardcover-fiction.json?api-key=${apiKey}`;

    const bookList = document.getElementById("book-list");
    const searchInput = document.getElementById("search");
    const sortSelect = document.getElementById("sort");
    let booksData = [];

    // Fetch books from API and display all on load
    async function fetchBooks() {
        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const data = await response.json();
            booksData = data.results.books;

            // Display all books on load
            displayBooks(booksData);
        } catch (error) {
            console.error('Error fetching data:', error);
            bookList.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
        }
    }

    // Display books in the list
    function displayBooks(books) {
        bookList.innerHTML = ""; // Clear previous content
        books.forEach(book => {
            const bookItem = document.createElement("div");
            bookItem.className = "book-item";
            bookItem.innerHTML = `
                <img src="${book.book_image}" alt="${book.title} cover" class="book-cover">
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Description:</strong> ${book.description}</p>
            `;
            bookList.appendChild(bookItem);
        });
    }

    // Handle search functionality
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filteredBooks = booksData.filter(book =>
            book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
        );
        displayBooks(filteredBooks);
    });

    // Handle sorting functionality
    sortSelect.addEventListener("change", () => {
        const sortBy = sortSelect.value;
        const sortedBooks = [...booksData].sort((a, b) =>
            a[sortBy].localeCompare(b[sortBy])
        );
        displayBooks(sortedBooks);
    });

    // Initialize the application
    fetchBooks();
};
