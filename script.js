document.addEventListener('DOMContentLoaded', function() {
  displayBooks();
});

function getBooks() {
  const storedData = localStorage.getItem('bookData');
  return storedData ? JSON.parse(storedData).books : [];
}

function saveBooks(books) {
  const bookData = { books };
  localStorage.setItem('bookData', JSON.stringify(bookData));
}

function displayBooks() {
  const books = getBooks();
  const belumSelesaiList = document.getElementById('list-belum-selesai');
  const selesaiList = document.getElementById('list-selesai');

  belumSelesaiList.innerHTML = '';
  selesaiList.innerHTML = '';

  books.forEach((book, index) => {
    const li = document.createElement('li');
    li.textContent = `${book.title} (${book.author}, ${book.year})`;

    const statusButton = document.createElement('button');
    statusButton.textContent = book.isComplete ? 'Belum Selesai' : 'Telah Selesai';
    statusButton.onclick = function() {
      toggleStatus(index);
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';
    deleteButton.onclick = function() {
      removeBook(index);
    };

    li.appendChild(statusButton);
    li.appendChild(deleteButton);

    if (book.isComplete) {
      selesaiList.appendChild(li);
    } else {
      belumSelesaiList.appendChild(li);
    }
  });
}

function addBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const year = document.getElementById('year').value;
  const isComplete = document.getElementById('status').value === 'selesai';

  if (title.trim() === '' || author.trim() === '' || year.trim() === '') {
    alert('Form tidak boleh kosong!');
    return;
  }

  const book = { id: generateId(), title, author, year: parseInt(year), isComplete };
  const books = getBooks();

  books.push(book);
  saveBooks(books);
  displayBooks();
  clearForm();
}

function removeBook(index) {
  const books = getBooks();
  books.splice(index, 1);
  saveBooks(books);
  displayBooks();
}

function toggleStatus(index) {
  const books = getBooks();
  books[index].isComplete = !books[index].isComplete;
  saveBooks(books);
  displayBooks();
}

function clearForm() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('year').value = '';
  document.getElementById('status').value = 'belum';
}

function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
