"use client";
import React, { useState } from 'react';
import { 
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import Loader from '../components/Loader';

function Flash() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (text.trim() === "") {
        alert("Please enter some text to generate flashcards.");
        return;
    }
    setLoading(true);
    fetch("api", {
        method: "POST",
        body: JSON.stringify({ text }),
    })
    .then((res) => res.json())
    .then((data) => setFlashcards(data))
    .then(() => setLoading(false));
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };
   
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-xl p-6">
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter a prompt"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ mb: 2 }}
          className="mb-4"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          sx={{
            backgroundColor: "#5927e4",
            color: "#fff",
            "&:hover": { backgroundColor: "#5927e4" },
          }}
          className="hover:bg-purple-700"
        >
          Enter
        </Button>

        {flashcards.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" textAlign="center" mb={2} className="text-2xl font-semibold text-gray-800">
              Flashcards Preview
            </Typography>
            <Grid container spacing={3}>
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card className="transform transition-transform duration-500 hover:scale-105">
                    <CardActionArea onClick={() => handleCardClick(index)}>
                      <CardContent>
                        <Box
                          sx={{
                            perspective: "1000px",
                            "& > div": {
                              transition: "transform 0.6s",
                              transformStyle: "preserve-3d",
                              position: "relative",
                              width: "100%",
                              height: "200px",
                              transform: flipped[index]
                                ? "rotateY(180deg)"
                                : "rotateY(0deg)",
                            },
                          }}
                        >
                          <div>
                            <Box
                              sx={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                backfaceVisibility: "hidden",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 2,
                                boxSizing: "border-box",
                                backgroundColor: "background.paper",
                              }}
                              className="bg-white rounded-lg shadow-md"
                            >
                              <Typography variant="h6" component="div" className="text-lg font-medium text-gray-700">
                                {flashcard.front}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                backfaceVisibility: "hidden",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 2,
                                boxSizing: "border-box",
                                backgroundColor: "background.paper",
                                transform: "rotateY(180deg)",
                              }}
                              className="bg-black rounded-lg shadow-md"
                            >
                              <Typography variant="h6" component="div" className="text-lg font-medium text-gray-700">
                                {flashcard.back}
                              </Typography>
                            </Box>
                          </div>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen}
              fullWidth
              sx={{
                backgroundColor: "#936DFF",
                color: "#fff",
                "&:hover": { backgroundColor: "#936DFF" },
                mt: 4,
                mb: 2,
              }}
              className="hover:bg-purple-800"
            >
              Save Flashcards
            </Button>
          </Box>
        )}
      </div>
    </div>
  );
}

export default Flash;
