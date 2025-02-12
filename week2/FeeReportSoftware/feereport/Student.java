package feereport;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class Student {
	public static int addStudent(String name,String email,String course,double fee,double paid,double due,String address,String phone) {
		int status = 0;
		try {
			Connection con = DBConnection.getConnection();
			PreparedStatement ps = con.prepareStatement("INSERT INTO student (name, email, course, fee, paid, due, address, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"); 
	            ps.setString(1, name);
				ps.setString(2, email);
				ps.setString(3, course);
				 ps.setDouble(4, fee);
		          ps.setDouble(5, paid);
		         ps.setDouble(6, due);
		            ps.setString(7, address);
		            ps.setString(8, phone);
		         status = ps.executeUpdate();
				
			
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return status;
	}
}
