import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

export function Profile() {
  const [userData, setUserData] = useState({});
  const [totalTracks, setTotalTracks] = useState({});
  const [savedTracks, setSavedTracks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/callback");
        const { data } = response;
        setUserData(data.user_data);
        setTotalTracks(data.saved_tracks);
        setSavedTracks(data.saved_tracks.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="proContainer">
        <h2>¡Hola de nuevo, {userData.display_name}!</h2>
        <h3>
          ¿Sabías que tienes un total de {totalTracks.total} canciones
          favoritas?
        </h3>
        <h3>Estas son tus más recientes</h3>
        {savedTracks.map((track, index) => (
          <li key={index}>
            {track.track.name} -{" "}
            {track.track.artists.map((artist) => artist.name).join(", ")}
          </li>
        ))}
      </div>
      <Link to="/EncuestaPage">
        <button className="btn"> ¡Descubre más!</button>
      </Link>
    </div>

  );
}
