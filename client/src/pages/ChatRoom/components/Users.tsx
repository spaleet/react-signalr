import { Grid, List, ListItem, ListItemIcon, ListItemText, Avatar } from '@mui/material';
import usernameToAvatar from '../../../utils/usernameToAvatar';

const Users = () => {
    return (
        <Grid item md={3} sx={
            {
                overflowY: 'auto',
                display: { xs: "none", sm: "block" }
            }
        }>
            <List>
                <ListItem key="CindyBaker">
                    <ListItemIcon>
                        <Avatar {...usernameToAvatar('Ali')} />
                    </ListItemIcon>
                    <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                </ListItem>
            </List>
        </Grid>
    )
}

export default Users