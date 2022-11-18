import SendbirdApp from "@sendbird/uikit-react/App";
import "@sendbird/uikit-react/dist/index.css";
import withSendbird from "@sendbird/uikit-react/withSendbird";
import sendbirdSelectors from "@sendbird/uikit-react/sendbirdSelectors";




const Chat = (props) => {
    const sdk = sendbirdSelectors.getSdk(props);

    const currentUser = sdk && sdk.currentUser;
    if (currentUser) {

        const getTotalUnreadMessageCount = async () => {
            const unreadMessageCount = await sdk.groupChannel.getTotalUnreadMessageCount();
            props.setUnreadMessageCount(unreadMessageCount);
        }
        getTotalUnreadMessageCount();
        props.setSbUserInfo(currentUser);
    }

    return (<SendbirdApp appId={props.config.APP_ID} userId={props.config.USER_ID} />);

}

const ChatWithSendbird = withSendbird(Chat)

export default ChatWithSendbird;