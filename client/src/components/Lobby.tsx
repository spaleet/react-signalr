import { Button, FormGroup, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'

interface LobbyProps {
    joinRoom: (username: string, room: string) => void,
}

const Lobby = (props: LobbyProps) => {

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    return (
        <Box 
            component="form"
            onSubmit={e => {
                e.preventDefault();
                props.joinRoom(username, room)
            }}
        >

            <FormGroup>
                <TextField placeholder="username" variant="outlined"
                    onChange={e => setUsername(e.target.value)}
                />
                <TextField placeholder="room" variant="outlined"
                    onChange={e => setRoom(e.target.value)} />
            </FormGroup>
            
            <Button variant="contained" type="submit" disabled={!username || !room}>Join</Button>

        </Box>
    )
}

export default Lobby