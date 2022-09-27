import { Divider } from '@mui/material';

const ChatDivider = (props: { width: string }) => {
    return (
        <Divider sx={{ mt: 1, mb: 2, width: props.width, borderColor: "primary.main", borderWidth: '1px' }} />
    )
}

export default ChatDivider