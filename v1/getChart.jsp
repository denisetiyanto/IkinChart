<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.sql.*"%>
<%@page import="java.util.*"%>
<%@page import="ikin.org.apa.*"%>

<%@page import="org.json.simple.JSONObject"%>
<%
//String user = request.getParameter("q");
//String kode = request.getParameter("bhku");
//String sandi= request.getParameter("sandi");
//String imei= request.getParameter("im");

//ikin.org.apa.LoginAPA apa = new ikin.org.apa.LoginAPA();
//String xsandi = apa.getCryptPassword(sandi);

//if(user == null || user.equals("")){
//  user = "ID";	
//}
boolean salah=false;
Connection kon;
//String nama = "GAGAL"; 
//String userid = "GAGAL";

String sql = "SELECT processguid, nama_monitoring FROM optimalisasi.monitoring_list ORDER BY id";


//JSONArray arr = new JSONArray();
//JSONObject obj = new JSONObject();
//List  list = new ArrayList();
String js ="";
String koma = ", ";


try {
Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

kon = DriverManager.getConnection("jdbc:sqlserver://localhost:1433;DatabaseName=PihakDB", "mobile", "ikinjaya2014");
PreparedStatement stat;

  stat = kon.prepareStatement(sql, ResultSet.TYPE_SCROLL_INSENSITIVE, 
  ResultSet.CONCUR_READ_ONLY);
  //stat.setString(1, user);
  ResultSet rSet = stat.executeQuery();  
	
  while(rSet.next()){ 

      if(rSet.isLast()){
         
         koma = "";
     } 

      js += "{\"id\" : \"" + rSet.getString(1) + "\", \"jenis\" : \"" + rSet.getString(2) +"\"}"+koma;
    
    
  }



}
catch(ClassNotFoundException cnfe){

//obj.put("Error : ","Class Not Found!!");
out.print(cnfe.getLocalizedMessage());
   
} catch (SQLException sqle) {
out.print(sqle.getLocalizedMessage());
}

//arr.addAll(list);
//String str = JSONValue.toJSONString(list);
//out.print(str);
out.print("[" + js + "]");
out.flush();

%>
