import Channel from '@sendbird/uikit-react/Channel';
import ChannelList from '@sendbird/uikit-react/ChannelList';
import '@sendbird/uikit-react/dist/index.css';
import SendbirdProvider from '@sendbird/uikit-react/SendbirdProvider';
import sendbirdSelectors from '@sendbird/uikit-react/sendbirdSelectors';
import useSendbirdStateContext from '@sendbird/uikit-react/useSendbirdStateContext';
import { useState } from 'react';

const Chat = (props) => {
  const [channelUrl, setChannelUrl] = useState(null);
  const context = useSendbirdStateContext();
  const sdkInstance = sendbirdSelectors.getSdk(context);

  const currentUser = sdkInstance && sdkInstance.currentUser;
  if (currentUser) {
    const getTotalUnreadMessageCount = async () => {
      const unreadMessageCount = await sdkInstance.groupChannel.getTotalUnreadMessageCount();
      props.setUnreadMessageCount(unreadMessageCount);
    };
    getTotalUnreadMessageCount();
    props.setSbUserInfo(currentUser);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ height: '100dvh', width: '100%' }}>
        <ChannelList
          onChannelSelect={(channel) => {
            setChannelUrl(channel.url);
          }}
        />
      </div>
      <div style={{ height: '100dvh', width: '100%' }}>
        <Channel channelUrl={channelUrl} />
      </div>
    </div>
  );
};

const Provider = (props) => {
  return (
    <SendbirdProvider appId={props.config.APP_ID} userId={props.config.USER_ID} nickname={props.config.NICKNAME}>
      <Chat {...props} />
    </SendbirdProvider>
  );
};

export default Provider;
