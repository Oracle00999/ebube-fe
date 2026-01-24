// components/SmartsuppChat.jsx
import { useEffect } from "react";

const SmartsuppChat = () => {
  useEffect(() => {
    // Create and inject the Smartsupp script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
    var _smartsupp = _smartsupp || {};
     _smartsupp.key = '96540d08e39dc1e4de3db9e505b7d07c4394aa97';
     window.smartsupp||(function(d) {
     var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
     s=d.getElementsByTagName('script')[0];c=d.createElement('script');
     c.type='text/javascript';c.charset='utf-8';c.async=true;
     c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
    })(document);
    `;

    // Add to document head
    document.head.appendChild(script);

    // Optional: Auto-open chat after 30 seconds if user hasn't interacted
    // setTimeout(() => {
    //   if (window.smartsupp && !localStorage.getItem("smartsupp_chat_opened")) {
    //     window.smartsupp("chat:open");
    //   }
    // }, 30000);

    // Track if user opens chat
    const handleChatOpen = () => {
      localStorage.setItem("smartsupp_chat_opened", "true");
    };

    // Listen for chat events
    document.addEventListener("smartsupp-chat-opened", handleChatOpen);

    // Cleanup function
    return () => {
      document.head.removeChild(script);
      document.removeEventListener("smartsupp-chat-opened", handleChatOpen);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default SmartsuppChat;
