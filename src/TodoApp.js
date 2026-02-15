import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography, Card, CardContent, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Box } from '@mui/material';

// ✅ FIXED BASE URL (added /api)
const API_BASE_URL = 'https://veer-webapp-backend.azurewebsites.net/api';

const backgroundImage = process.env.PUBLIC_URL + '/background.jpg';

function TodoApp() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/tasks`);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };

    const createTask = async () => {
        try {
            await axios.post(`${API_BASE_URL}/tasks`, newTask);
            fetchTasks();
            setNewTask({ title: '', description: '' });
        } catch (error) {
            console.error('Error creating task', error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <Box
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
            }}
        >
            <Container maxWidth="sm">
                <Typography
                    variant="h3"
                    gutterBottom
                    style={{
                        textAlign: 'center',
                        color: 'white',
                        margin: '8px',
                    }}
                >
                    <img src="/devopsinsiderslogo.png" alt="My Logo" />
                    ToDo App
                </Typography>

                <div>
                    <TextField
                        label="Title"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        value={newTask.title}
                        margin="normal"
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        InputProps={{ style: { color: 'white' } }}
                        InputLabelProps={{ style: { color: 'white' } }}
                    />

                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={newTask.description}
                        margin="normal"
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        InputProps={{ style: { color: 'white' } }}
                        InputLabelProps={{ style: { color: 'white' } }}
                    />

                    <Button variant="contained" color="primary" onClick={createTask} style={{ margin: '8px' }}>
                        Add Task
                    </Button>
                </div>

                <div>
                    <Typography
                        variant="h4"
                        gutterBottom
                        style={{
                            textAlign: 'center',
                            color: 'white',
                            margin: '15px',
                        }}
                    >
                        Existing Tasks
                    </Typography>
