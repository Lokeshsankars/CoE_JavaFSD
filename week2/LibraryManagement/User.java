import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class User implements Serializable {
    private String name;
    private String userID;
    private List<Book> borrowedBooks;

    private static final int MAX_BORROW_LIMIT = 3;

    public User(String name, String userID) {
        this.name = name;
        this.userID = userID;
        this.borrowedBooks = new ArrayList<>();
    }

    public String getName() { return name; }
    public String getUserID() { return userID; }
    public List<Book> getBorrowedBooks() { return borrowedBooks; }

    public void borrowBook(Book book) throws MaxBooksAllowedException {
        if (borrowedBooks.size() >= MAX_BORROW_LIMIT) {
            throw new MaxBooksAllowedException("User has reached the maximum borrowing limit.");
        }
        borrowedBooks.add(book);
    }

    public void returnBook(Book book) {
        borrowedBooks.remove(book);
    }

    @Override
    public String toString() {
        return "User{Name='" + name + "', ID='" + userID + "', BorrowedBooks=" + borrowedBooks + "}";
    }
}

class BookNotFoundException extends Exception {
    public BookNotFoundException(String message){
    	super(message); 
    	}
}

class UserNotFoundException extends Exception {
    public UserNotFoundException(String message) { 
    	 super(message); 
    }
}

class MaxBooksAllowedException extends Exception {
    public MaxBooksAllowedException(String message) {   	
    	super(message); 
    	}
}

