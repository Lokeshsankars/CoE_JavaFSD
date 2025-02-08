public class Main {
    public static void main(String[] args) throws BookNotFoundException, UserNotFoundException, MaxBooksAllowedException {
        LibraryManager libManager = new LibraryManager();
        libManager.loadLibraryData();

    
        libManager.addBook(new Book("Java Basics", "James Gosling", "123"));
        libManager.addBook(new Book("Python Guide", "Guido van Rossum", "456"));

        libManager.addUser(new User("Lokesh", "U1001"));
        libManager.addUser(new User("Evan", "U1002"));

        
        Thread t1 = new Thread(() -> {
            try {
                libManager.borrowBook("123", "U1001");
            } catch (Exception e) { System.out.println(e.getMessage()); }
        });

        Thread t2 = new Thread(() -> {
            try {
                libManager.borrowBook("123", "U1002");
            } catch (Exception e) { System.out.println(e.getMessage()); }
        });

        t1.start();
        t2.start();

        try { t1.join(); t2.join(); } catch (InterruptedException e) { e.printStackTrace(); }
   
		libManager.returnBook("123", "U1001");

        libManager.borrowBook("123", "U1002");

        libManager.reserveBook("456", "U1001");
          
        
        libManager.saveLibraryData();
        
       
        
    }
}
