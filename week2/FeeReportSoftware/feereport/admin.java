package feereport;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Admin {
	public static boolean validateAdmin(String username,String password) {
		boolean status = false;
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		
		try {
			con = DBConnection.getConnection();
		    ps = con.prepareStatement("select * from admin where username = ? AND password = ?");
			ps.setString(1, username);
			ps.setString(2, password);
			rs = ps.executeQuery();
			status = rs.next();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return status;
	}
}
