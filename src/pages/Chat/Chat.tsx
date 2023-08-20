import { Message } from "../../features/Chat/Message";
import { MessageForm } from "../../features/Chat/MessageForm";
import { Header } from "../../features/Header/Header";
import { useChat } from "../../services/firebase/firebase";

export const Chat = () => {
  const { messages } = useChat();

  return (
    <div className="flex flex-col">
      <Header />
      <section className="overflow-y-scroll w-full h-full">
        {messages?.map((message) => <Message key={message.id} {...message} />)}
      </section>
      <MessageForm />
    </div>
  );
};
