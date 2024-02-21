import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "../styles/write.css";
import moment from "moment";
import axios from "axios";

function Write() {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || null);
  const [price, setPrice] = useState(state?.price || null);
  const [tripDate, setTripDate] = useState(state?.tripDate || null);
  const [value, setValue] = useState(state?.desc || null);
  const [cat, setCat] = useState(state?.cat || null);
  const { currentUser } = useContext(AuthContext);
  const hiddenFileInput = React.useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser == null) {
      navigate("/");
    }
  }, [currentUser]);

  const uplaod = async () => {
    if (file !== null) {
      try {
        console.log("flag1 ");
        const formData = new FormData();
        console.log("flag2 ");
        formData.append("file", file);
        console.log("flag3 ");
        const res = await axios.post("/upload", formData);
        console.log("in upload " + res.data);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await uplaod();
    try {
      state
        ? await axios.put(`/trips/${state.id}`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : state?.img,
          price,
          tripDate
        })
        : await axios.post(`/trips/`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : null,
          price,
          tripDate,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Prazna polja nisu dozvoljena!");
    }
  };

  const handleClick1 = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <div>
      {currentUser ? (
        <div className="main-div-write">
          <h1 className="title-write">DODAJ NOVO PUTOVANJE</h1>
          <label className="label-write">Naslov</label>
          <input
            className="input-write"
            type={"text"}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label className="label-write">Opis</label>
          <textarea
            className="input-write"
            type={"text"}
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <label className="label-write">Kategorija</label>
          <select className="select-write" onChange={(e) => setCat(e.target.value)}value={cat} >
            <option value={null}> Izaberi kategoriju:</option>
            <option value={"Evropa"}>Evropa</option>
            <option value={"Azija"}>Azija</option>
            <option value={"Afrika"}>Afrika</option>
            <option value={"Ljetna putovanja"}>Ljetna putovanja</option>
            <option value={"Zimska"}>Zimska</option>
            <option value={"Historijska putovanja"}>Historijska putovanja</option>
            <option value={"Prirodna cuda"}>Prirodna čuda</option>
          </select>
          <label className="label-write">Slika</label>
          <>
            <button onClick={handleClick1} className="button-write">
              Dodaj sliku
            </button>
            <input
              ref={hiddenFileInput}
              style={{ display: "none" }}
              type={"file"}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </>
          {file ? <p className="image-text">{file.name}</p> : null}
          <p className="error-write">{error}</p>
          <label className="label-write">Cijena</label>
          <input
            className="input-write"
            type={"text"}
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
          <label className="label-write">Datum polaska putovanja</label>
          <input
            className="input-write"
            type={"text"}
            onChange={(e) => setTripDate(e.target.value)}
            value={tripDate}
          />
          <button className="button-write" onClick={handleClick}>
            Objavi
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Write;
