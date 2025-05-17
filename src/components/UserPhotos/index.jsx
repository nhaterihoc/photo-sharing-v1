import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import fetchModel from "../../lib/fetchModelData";

export default function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchModel(`/api/photo/${userId}`)
      .then((data) => setPhotos(data))
      .catch((err) => console.error(err));
  }, [userId]);

  if (!photos.length) return <Typography>Loading photos...</Typography>;

  return (
    <div>
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ mb: 2 }}>
          <img
            src={`/images/${photo.file_name}`}
            alt="User Upload"
            style={{ maxWidth: "600px", width: "100%", height: "auto" }}
          />
          <CardContent>
            <Typography variant="body2">
              Ngày đăng: {new Date(photo.date_time).toLocaleString()}
            </Typography>
            {photo.comments.map((c) => (
              <Typography
                key={c._id}
                variant="caption"
                display="block"
                sx={{ mt: 1 }}
              >
                {new Date(c.date_time).toLocaleString()} –{" "}
                <Link to={`/photos/${c.user._id}`}>
                  {c.user.first_name} {c.user.last_name}
                </Link>
                : {c.comment}
              </Typography>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
