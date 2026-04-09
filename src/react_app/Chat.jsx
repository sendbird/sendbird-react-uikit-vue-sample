import SendbirdApp from "@sendbird/uikit-react/App";
import "@sendbird/uikit-react/dist/index.css";

const Chat = (props) => {
    return (<SendbirdApp appId={props.config.APP_ID} userId={props.config.USER_ID} />);
}

export default Chat;