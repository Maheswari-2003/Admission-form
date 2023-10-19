import java.sql.Connection;

public class Main {
    public static void main(String[] args){
         dbFunction db=new dbFunction();
        Connection conn=db.connect_to_db("Admission","postgres","root");
        //db.createTable(conn,"employee");
       // db.insert_row(conn,"employee","maheswari","tirunelveli");
        db.update_name(conn,"employee","maheswari","mahii");
        db.read_data(conn,"employee");

    }
}