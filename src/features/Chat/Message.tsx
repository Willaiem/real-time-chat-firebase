import { ElementRef, useEffect, useRef } from "react";
import { useAuth, type TMessage } from "../../services/firebase/firebase";

type MessageProps = TMessage

export const Message = ({ content, displayName, photoURL }: MessageProps) => {
  const { user } = useAuth();

  const messageRef = useRef<ElementRef<'div'>>(null);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const isOwnerMessage = user?.displayName === displayName;

  return (
    <div
      ref={messageRef}
      className={`my-4 flex justify-start ${isOwnerMessage && "mr-4 flex-row-reverse"
        } items-center gap-4`}
    >
      <img className="rounded-full w-16 h-16" src={photoURL} alt="" />
      <div className="flex flex-col gap-2 items-end">
        <span className="text-accent">{displayName}</span>
        <p
          className={`${isOwnerMessage ? "bg-blue-600" : "bg-green-600"
            }  py-2 md:px-6 px-3 rounded-xl `}
        >
          {content}
        </p>
      </div>
    </div>
  );
};
