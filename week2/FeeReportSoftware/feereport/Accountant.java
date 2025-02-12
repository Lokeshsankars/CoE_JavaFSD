package feereport;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Accountant {
	
	public static int addAccountant(String name, String email, String phone, String password) {
		int status = 0;
		try {
			Connection con = DBConnection.getConnection();
			PreparedStatement ps = con.prepareStatement("INSERT into accountant (name,email,phone,password) values (?,?,?,?)");
			ps.setString(1, name);
			ps.setString(2, email);
			ps.setString(3, phone);
			ps.setString(4, password);
			
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return status;
	}
	
	public static List<String> getAccountants(){
		List<String> list = new ArrayList<>();
		try {
			Connection con = DBConnection.getConnection();
			PreparedStatement ps = con.prepareStatement("select * from accountant");
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()) {
				list.add(rs.getInt("id") + " - " + rs.getString("name") + " - " + rs.getString("email"));
				
			}
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return list;
	}
}
