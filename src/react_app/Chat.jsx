import { useEffect } from "react";
import SendbirdApp from "@sendbird/uikit-react/App";
import "@sendbird/uikit-react/dist/index.css";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";
import { getSdk } from "@sendbird/uikit-react/sendbirdSelectors";

const ChatInner = (props) => {
    const state = useSendbirdStateContext();
    const sdk = getSdk(state);
    const currentUser = sdk && sdk.currentUser;

    useEffect(() => {
        if (!currentUser) return;
        props.setSbUserInfo(currentUser);

        const getTotalUnreadMessageCount = async () => {
            const count = await sdk.groupChannel.getTotalUnreadMessageCount();
            props.setUnreadMessageCount(count);
        };
        getTotalUnreadMessageCount();
    }, [currentUser]);

    return null;
};

const Chat = (props) => {
    return (
        <SendbirdApp appId={props.config.APP_ID} userId={props.config.USER_ID}>
            <ChatInner
                setSbUserInfo={props.setSbUserInfo}
                setUnreadMessageCount={props.setUnreadMessageCount}
            />
        </SendbirdApp>
    );
};

export default Chat;