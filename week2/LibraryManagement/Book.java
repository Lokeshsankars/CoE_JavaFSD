import java.io.Serializable;

public class Book implements Serializable {
    private String title;
    private String author;
    private String ISBN;
    private boolean isReserved;
    private boolean isBorrowed;

    public Book(String title, String author, String ISBN) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.isReserved = false;
        this.isBorrowed = false;
    }

    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public String getISBN() { return ISBN; }
    
    public boolean isReserved() { return isReserved; }
    public void setReserved(boolean reserved) { this.isReserved = reserved; }

    public boolean isBorrowed() { return isBorrowed; }
    public void setBorrowed(boolean borrowed) { this.isBorrowed = borrowed; }

    @Override
    public String toString() {
        return "Book{Title='" + title + "', Author='" + author + "', ISBN='" + ISBN + "'}";
    }
}
