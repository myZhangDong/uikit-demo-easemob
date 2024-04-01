import { useState } from "react";
import { ContactList, ContactDetail } from "easemob-chat-uikit";
import "./contacts.scss";
import toast from "../../components/toast/toast";
import i18next from "../../i18n";
interface ContactsProps {
  onMessageClick?: () => void;
  onVideoCall?: () => void;
  onAudioCall?: () => void;
}
const Contacts = ({
  onMessageClick,
  onVideoCall,
  onAudioCall,
}: ContactsProps) => {
  const [contactData, setContactData] = useState({
    id: "",
    name: "",
    type: "contact",
  });

  return (
    <div className="contacts-container">
      <div className="contacts-container-list">
        <ContactList
          // className="conversation"
          onItemClick={(data) => {
            let type = data.type;
            // if (data.type == "request") {
            //   type = "contact";
            // }
            console.log("点击联系人", data);
            setContactData({
              id: data.id,
              name: data.name,
              type: type,
            });
          }}
        ></ContactList>
      </div>
      <div className="contacts-container-detail">
        <ContactDetail
          // @ts-ignore
          data={contactData}
          onMessageBtnClick={() => {
            onMessageClick?.();
          }}
          onVideoCall={() => {
            console.log("onVideoCall");
            onVideoCall?.();
          }}
          onAudioCall={() => {
            console.log("onAudioCall");
            onAudioCall?.();
          }}
          onUserIdCopied={(userId) => {
            toast.success(i18next.t("copySuccess"));
          }}
        ></ContactDetail>
      </div>
    </div>
  );
};

export default Contacts;
