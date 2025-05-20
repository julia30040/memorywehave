"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./FarewellPartners.module.css";

interface Partner {
  id: number;
  name: string;
  image: string;
  hoverImage: string;
  socialImage?: string;
  message: string;
  color: string;
}

const partners: Partner[] = [
  {
    id: 1,
    name: "安安 Anan",
    image: "/farewell-an.png",
    hoverImage: "/farewell-an.png",
    socialImage: '/ig-an.png',
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
    socialImage: '/ig-chi.jpg',
    message: `哎呀到了這個時候反而不知道說什麼好<br/>
但 Hahow 這六年真的是奇幻旅程 連小學都不會同班這麼久<br/>
謝謝大家陪我玩了六年，辛苦你們了捏 ε(´｡•᎑•\`)っ 💕<br/>
趕緊把接下來一年份的祝福講完<br/>
端午快樂 中秋快樂 萬聖快樂 聖誕快樂 新年快樂 生日快樂<br/>
台灣很小 你各位小心一定還會在哪個角落遇到我的！▄︻デ══━一💥<br/>
大家～～～敏拿桑～～～有～～緣～～再～～見～～<br/>
出去玩要約我、吃好吃的要想到我歐！我要跟法哥一樣當 Hahow 地縛靈💀！<br/>
⸜(｡˃ ᵕ ˂ )⸝♡ 愛心光波！！！<br/>.`,
    color: "#FF5B51",
  },
  {
    id: 3,
    name: "學姊 Julia",
    image: "/farewell-julia.png",
    hoverImage: "/farewell-julia.png",
    socialImage: '/ig-julia.png',
    message: `時間咻－－地，四年就過了。<br/>
    還記得剛進來第一個禮拜就和大家去 Team Building，那時花蓮的旅行回憶仍歷歷在目。<br/>
    後來遇到疫情只能在家遠端的日子，沒辦法和大家一起在辦公室打屁閒聊，老實說有點孤單 இдஇ．．．<br/>
    記得書書離職時說過「2C 夥伴是她最捨不得的」，<br/>
    這四年來和大家一起經歷許多事情，<br/>
    忘記什麼時候開始，強烈意識到這也是我在 Hahow 的感受：<br/>
    多麼難得，我們不只是工作上努力幫助彼此的夥伴，<br/>
    更一起分享生活大小事，經歷彼此人生的重要時刻。<br/>
    「<br/>
      ．請你別忘記 自由的微風 永遠不停息<br/>
      ．請你別忘記 黑暗的洞裡 夥伴的打氣<br/>
      ．溫柔的夏夜裡 河流在傾瀉<br/>
      ．空曠的荒野裡 萬物在更迭<br/>
      ．請你別忘記 簡單的心情<br/>
    」— 《找到你》雷擎<br/>
    <br/>
    敬從年少到現在，漸漸成熟卻仍不世俗的我們。<br/>
    慶幸加入 Hahow 找到每個可愛的你 ✨ 一定會再相見！<br/>
    `,
    color: "#00C964",
  },
];

const FarewellPartners = ({ onPartnerClick, onLetterClose }: { onPartnerClick: (index: number) => void, onLetterClose?: () => void }) => {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [letterOpen, setLetterOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (!letterOpen) {
      onLetterClose?.();
    }
  }, [letterOpen, onLetterClose]);

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

    onPartnerClick?.(partner.id - 1);
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
        <div className={styles.typewriterContainer}>
          <span className={styles.typewriterWrapper}>
            <span className={styles.typewriterText}>當我們一起走過</span>
          </span>
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
        initial={{ opacity: 0 }}
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

          {selectedPartner?.socialImage && (
            <motion.div
              className="absolute right-[16px] bottom-[16px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: isTypingComplete ? 1 : 0 }}
              transition={{ duration: 0.6, delay: isTypingComplete ? 0.96 : 0 }}>
              <Image
                src={selectedPartner.socialImage}
                alt={`Social Image for ${selectedPartner.name}`}
                width={120}
                height={120}
              />
            </motion.div>
          )}

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
