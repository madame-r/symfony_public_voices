
import { loadBooks, setupLazyLoading } from "./js_modules/booksLoader.js";
import { setupSearchBar } from "./js_modules/searchBar.js";


loadBooks();        
setupLazyLoading(); 
setupSearchBar();