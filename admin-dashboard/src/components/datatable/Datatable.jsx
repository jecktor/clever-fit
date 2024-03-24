import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { ref, onValue } from 'firebase/database';
import {db, dbRealtime} from "../../firebase";

const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(()=>{
    const unsub = onSnapshot(collection(db, "usuarios"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach(doc=>{
        list.push({id:doc.id, ...doc.data()})
      });
      setData(list)
  },(error)=>{
    console.log(error)
  });
  return() =>{
    unsub();
  }
  },[])
  const handleDelete = async(id) => {
    try {
      await deleteDoc(doc(db, "usuarios", id));
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error)
    }
    
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Agregar nuevo usuario
        <Link to="/users/new" className="link">
          Agregar
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default Datatable;
