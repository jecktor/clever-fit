// datatable.jsx
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { ref, onValue, remove } from 'firebase/database';
import { db, dbRealtime } from "../../firebase";

const Datatable = () => {
  const [data, setData] = useState({email: '', password: '' });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "usuarios"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setData(list);
    }, (error) => {
      console.log(error);
    });

    const usersRef = ref(dbRealtime, 'users');
    onValue(usersRef, (snapshot) => {
      const rtData = snapshot.val();
      // Aquí puedes procesar los datos obtenidos de la base de datos en tiempo real
      console.log(rtData);
    });

    return () => {
      unsub();
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "usuarios", id));
      await remove(ref(dbRealtime, 'users/' + id));
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
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
              <div className="viewButton">Ver</div>
            </Link>
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
              Eliminar
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