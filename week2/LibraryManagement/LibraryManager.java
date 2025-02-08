import java.io.*;
import java.util.List;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class LibraryManager extends LibrarySystem {
    private final Lock lock = new ReentrantLock();
    private static final String FILE_NAME = "library_data.ser";

    public void addBook(Book book) { books.add(book); }
    public void addUser(User user) { users.add(user); }

    @Override
    public synchronized void borrowBook(String ISBN, String userID) throws BookNotFoundException, UserNotFoundException, MaxBooksAllowedException {
        User user = findUser(userID);
        Book book = findBook(ISBN);

        if (book.isBorrowed()) {
            throw new MaxBooksAllowedException("Book is already borrowed.");
        }

        user.borrowBook(book);
        book.setBorrowed(true);
        System.out.println(user.getName() + " borrowed " + book.getTitle());
    }

    @Override
    public synchronized void returnBook(String ISBN, String userID) throws BookNotFoundException, UserNotFoundException {
        User user = findUser(userID);
        Book book = findBook(ISBN);

        user.returnBook(book);
        book.setBorrowed(false);
        System.out.println(user.getName() + " returned " + book.getTitle());
    }

    @Override
    public synchronized void reserveBook(String ISBN, String userID) throws BookNotFoundException, UserNotFoundException {
        User user = findUser(userID);
        Book book = findBook(ISBN);

        if (!book.isReserved()) {
            book.setReserved(true);
            System.out.println(user.getName() + " reserved " + book.getTitle());
        } else {
            System.out.println("Book is already reserved.");
        }
    }

    private Book findBook(String ISBN) throws BookNotFoundException {
        return books.stream()
            .filter(book -> book.getISBN().equals(ISBN))
            .findFirst()
            .orElseThrow(() -> new BookNotFoundException("Book not found"));
    }

    private User findUser(String userID) throws UserNotFoundException {
        return users.stream()
            .filter(user -> user.getUserID().equals(userID))
            .findFirst()
            .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    public void saveLibraryData() {
        lock.lock();
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(FILE_NAME))) {
            oos.writeObject(books);
            oos.writeObject(users);
            System.out.println("Library data saved.");
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }

    public void loadLibraryData() {
        lock.lock();
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(FILE_NAME))) {
            books = (List<Book>) ois.readObject();
            users = (List<User>) ois.readObject();
            System.out.println("Library data loaded.");
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("No existing library data found.");
        } finally {
            lock.unlock();
        }
    }
}
