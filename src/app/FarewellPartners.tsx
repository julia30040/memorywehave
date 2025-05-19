"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Partner {
  id: number;
  name: string;
  image: string;
  hoverImage: string;
  message: string;
  color: string;
}

const partners: Partner[] = [
  {
    id: 1,
    name: "安安 Anan",
    image: "/farewell-an.png",
    hoverImage: "/farewell-an.png",
    message: `總是喜歡把 Hahow 的概念和宇宙聯繫在一起，<br/>
因為對我來說，在這裡的一切神秘又遼闊——<br/>
就像宇宙，總有未知、驚喜，也充滿無數星光閃爍的時刻。<br/>
<br/>
這 8 年 8 個月的旅程，實在是我人生中數一數二精彩的奇幻星際航行。<br/>
<br/>
謝謝所有在這裡相遇的夥伴，<br/>
謝謝你們陪我穿越迷霧，也一同看見光亮，<br/>
謝謝這段旅程裡，給予我的滋養、勇氣與成長。<br/>
<br/>
即使不捨，還是來到了說再見的時刻。<br/>
願我們在同一個世界裡，各自幸福，<br/>
也期盼未來的某一天，<br/>
我們會在某個宇宙的角落，再次相遇 :- )`,
    color: "#FFB200",
  },
  {
    id: 2,
    name: "致涵 Chihhan",
    image: "/farewell-chi.png",
    hoverImage: "/farewell-chi.png",
    message: `哎呀到了這個時候反而不知道說什麼好<br/>
但 Hahow 這六年真的是奇幻旅程 連小學都不會同班這麼久<br/>
謝謝大家陪我玩了六年，辛苦你們了捏 ε(´｡•᎑•\`)っ 💕<br/>
趕緊把接下來一年份的祝福講完<br/>
端午快樂 中秋快樂 萬聖快樂 聖誕快樂 新年快樂 生日快樂<br/>
台灣很小 你各位小心一定還會在哪個角落遇到我的！▄︻デ══━一💥<br/>
大家～～～敏拿桑～～～有～～緣～～再～～見～～<br/>
出去玩要約我、吃好吃的要想到我歐！我要跟法哥一樣當 Hahow 地縛靈💀！<br/>
⸜(｡˃ ᵕ ˂ )⸝♡ 愛心光波！！！`,
    color: "#FF5B51",
  },
  {
    id: 3,
    name: "學姊 Julia",
    image: "/farewell-julia.png",
    hoverImage: "/farewell-julia.png",
    message: "I will miss you all!",
    color: "#00C964",
  },
];

const FarewellPartners = () => {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [letterOpen, setLetterOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // create a keyboard `esc` key event listener
  // when the key is pressed, close the letter
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLetterOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscapeKey);
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleClick = (partner: Partner) => {
    setSelectedPartner(partner);
    setLetterOpen(true);
  };

  useEffect(() => {
    if (selectedPartner?.message) {
      let index = 0;
      const message = selectedPartner.message;
      const messageArray = message.split(/(<br\/>)/g); // Split message by <br/>
      let currentText = "";
      setIsTypingComplete(false); // Reset typing complete state

      const interval = setInterval(() => {
        if (messageArray[index] === "<br/>") {
          currentText += "<br/>";
          setDisplayedText(currentText);
          index++;
        } else {
          currentText += messageArray[index].charAt(0);
          setDisplayedText(currentText);
          messageArray[index] = messageArray[index].slice(1);
          if (messageArray[index].length === 0) {
            index++;
          }
        }

        if (index === messageArray.length) {
          clearInterval(interval);
          setIsTypingComplete(true); // Set typing complete state
        }
      }, 100); // Adjust the speed by changing the interval time

      return () => clearInterval(interval);
    }
  }, [selectedPartner]);

  return (
    <>
      <div>
        <div
          className="text-4xl font-bold mb-24 text-center text-[#626c70]"
          style={{ letterSpacing: "0.24em" }}
        >
          當我們一起走過
        </div>
        <div className="flex justify-center items-center gap-16">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="relative cursor-pointer hover:scale-102 transition-transform duration-720"
            >
              <Image
                src={partner.image}
                alt={`Partner ${partner.id}`}
                width={240}
                height={240}
                className="transition-transform duration-300 hover:scale-105 "
                onClick={() => handleClick(partner)}
              />
              <motion.div
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.7 }}
              >
                <Image
                  src={partner.hoverImage}
                  alt={`Partner ${partner.id} Hover`}
                  width={240}
                  height={240}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <motion.div
        className="fixed inset-0 flex justify-center items-center z-50"
        style={{ backdropFilter: "blur(5px)", backgroundColor: "#000000a8" }}
        animate={{
          opacity: letterOpen ? 1 : 0,
          pointerEvents: letterOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.48, delay: letterOpen ? 0 : 0.48 }}
      >
        {/* 透明 overlay, 點擊後關閉 letter */}
        <div
          className="fixed inset-0 bg-[transparent]"
          onClick={() => setLetterOpen(false)}
        />
        <motion.div
          className={`p-[48px_48px] rounded-lg shadow-lg flex flex-col justify-start items-start tracking-wider relative`}
          animate={{ scale: letterOpen ? 1 : 0 }}
          style={{ backgroundColor: "#ffffff" }}
          transition={{ duration: 0.48, delay: letterOpen ? 0.48 : 0 }}
        >
          {/* Hint Text */}
          {/* <div className="absolute top-[-24px] right-2 text-xs text-gray-300">
            按 ESC 收起信件
          </div> */}

          <h2 className="text-xl text-[#81979a] font-bold mb-8 text-shadow-[-1px_-4px_3px_#ffffff]">
            來自{" "}
            <span style={{ color: selectedPartner?.color }}>
              {selectedPartner?.name}
            </span>{" "}
            的訊息：
          </h2>
          <p
            className="overflow-y-auto font-size-16 text-[#8a8a8a] leading-7 text-shadow-[6px_6px_4px_#ffffff]"
            dangerouslySetInnerHTML={{ __html: displayedText }}
          />

          <motion.button
            onClick={() => setLetterOpen(false)}
            style={{ backgroundColor: selectedPartner?.color }}
            className="mt-8 px-4 py-2 text-white rounded font-bold self-center cursor-pointer hover:scale-90 transition-transform duration-640"
            initial={{ opacity: 0, transform: "translateY(16px)" }}
            animate={{
              opacity: isTypingComplete ? 1 : 0,
              transform: "translateY(0px)",
              pointerEvents: isTypingComplete ? "auto" : "none",
            }}
            transition={{ duration: 0.6, delay: isTypingComplete ? 0.96 : 0 }}
          >
            收好信，放心裡
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default FarewellPartners;
