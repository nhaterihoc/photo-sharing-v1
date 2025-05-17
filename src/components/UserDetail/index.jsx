import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';
import fetchModel from '../../lib/fetchModelData';

export default function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchModel(`/api/user/${userId}`)
      .then(data => setUser(data))
      .catch(err => console.error(err));
  }, [userId]);

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">
          {user.first_name} {user.last_name}
        </Typography>
        <Typography variant="body1">Location: {user.location}</Typography>
        <Typography variant="body2">Description: {user.description}</Typography>
        <Typography variant="body2">Occupation: {user.occupation}</Typography>
        <Button component={Link} to={`/photos/${userId}`} color="primary">
          Xem ảnh của người dùng
        </Button>
      </CardContent>
    </Card>
  );
}
