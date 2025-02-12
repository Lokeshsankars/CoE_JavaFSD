package feereport;

import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("Report system");
        System.out.println("Enter 1 for Admin Login");
        System.out.println("Enter 2 for Accountant Login");

        int choice = sc.nextInt();

        if (choice == 1) {
            System.out.print("Enter Admin Username: ");
            String username = sc.next();
            System.out.print("Enter Password: ");
            String password = sc.next();

            if (Admin.validateAdmin(username, password)) {
                System.out.println("Admin login successful");
                System.out.println("1. Add Accountant");
                System.out.println("2. View Accountant");
                System.out.print("Enter choice: ");

                int adminChoice = sc.nextInt();
                sc.nextLine();

                if (adminChoice == 1) {
                    System.out.print("Enter Name: ");
                    String name = sc.nextLine();
                    System.out.print("Enter Email: ");
                    String email = sc.nextLine();
                    System.out.print("Enter Phone: ");
                    String phone = sc.nextLine();
                    System.out.print("Enter Password: ");
                    String accPassword = sc.nextLine();

                    int status = Accountant.addAccountant(name, email, phone, accPassword);
                    
                    if(status>0)
                    	System.out.println("Accountant added successfully");
                    else
                    	System.out.println("Error adding accountant");
                    
                } else if (adminChoice == 2) {
                    System.out.println("List of Accountants:");
                    Accountant.getAccountants().forEach(System.out::println);

                } else {
                    System.out.println("Invalid option");
                }
            } else {
                System.out.println("Invalid admin credentials");
            }
        }
        sc.close();
    }
}
