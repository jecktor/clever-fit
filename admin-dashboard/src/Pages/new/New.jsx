// new.jsx
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { authusuarios, db, storage, dbRealtime } from "../../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref, set } from "firebase/database";
import { useNavigate } from 'react-router-dom';

const BooleanInput = ({ label, value, onChange }) => {
  return (
    <div className="formInput">
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        <option value={true}>Sí</option>
        <option value={false}>No</option>
      </select>
    </div>
  );
};

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setPerc(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleInput = (e, id) => {
    const value = e.target.value;
    if (id === 'email' || id === 'password') {
      setData({ ...data, [id]: value }); // Asegurarse de que sean cadenas de texto
    } else if (typeof value === 'string') {
      const boolValue = value === 'true';
      setData({ ...data, [id]: boolValue });
    } else {
      setData({ ...data, [id]: value });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(authusuarios, data.email, data.password);
      
      // Escribir datos en Firestore
      await setDoc(doc(db, "usuarios", res.user.uid), { ...data, timeStamp: serverTimestamp() });
      
      // Escribir datos en Realtime Database
      await set(ref(dbRealtime, 'users/' + res.user.uid), { ...data });
      
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.type === 'boolean' ? (
                    <BooleanInput
                      label={input.label}
                      value={data[input.id]}
                      onChange={(e) => handleInput(e, input.id)}
                    />
                  ) : (
                    <input
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={(e) => handleInput(e, input.id)}
                    />
                  )}
                </div>
              ))}
              <button disabled={per !== null && per < 100} type="submit">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;