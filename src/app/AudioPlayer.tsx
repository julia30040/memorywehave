'use client';

import { useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

interface AudioPlayerProps {
  activeTrackIndex: number | null;
  onNext?: () => void;
  onPrevious?: () => void;
  showPlayer?: boolean;
}

const tracks = [{
    src: "/music-an.mp3",
    title: "The Moment - 孫燕姿",
    from: "安安",
},
  {
    src: "/music-chi.mp3",
    title: "一起加油吧 - 來吧！焙焙",
    from: "致涵",
  },
  {
    src: "/music-julia.mp3",
    title: "找到你 - 雷擎",
    from: "學姊",
  },
];

const MarqueeText = ({  currentTrack }: { currentTrack: typeof tracks[number] }) => {
  return (
    <div className="relative overflow-hidden text-gray-400 whitespace-nowrap bg-white/90 backdrop-blur-sm p-2 rounded-lg
        flex flex-row items-center justify-start
    ">
      <div className="text-sm text-gray-700 animate-marquee-1 inline-block">
        來自 <span className="font-bold underline underline-offset-4">{currentTrack.from}</span> 的點播「{currentTrack.title}」
      </div>
    </div>
  );
};

export default function CustomAudioPlayer({ activeTrackIndex, onNext, onPrevious, showPlayer = true }: AudioPlayerProps) {
  const audioRef = useRef<AudioPlayer>(null);
  const currentTrack = activeTrackIndex !== null ? tracks[activeTrackIndex] : null;

  useEffect(() => {
    if(activeTrackIndex !== null && audioRef.current) {
      audioRef.current.audio.current.play()
    }

    return () => {
      if(audioRef.current) {
        audioRef.current.audio.current.pause();
      }
    }
  }, [activeTrackIndex, currentTrack]);

  if(!currentTrack) return null;
  
  return (
    <div className=" p-4 opacity-60" style={{ opacity: showPlayer ? 1 : 0, pointerEvents: showPlayer ? 'auto' : 'none' }}>
      <div style={{ display: "none" }}>
        <AudioPlayer
          ref={audioRef}
          src={currentTrack.src}
          showSkipControls={true}
          showJumpControls={false}
          autoPlay
          autoPlayNext={true}
          onEnded={onNext}
          onClickNext={onNext}
          onClickPrevious={onPrevious}
          customControlsSection={[
            "MAIN_CONTROLS",
            "VOLUME_CONTROLS",
          ]}
          layout="stacked"
          className="rounded-lg shadow-md"
        />
      </div>
      <div className="mt-1">
        <MarqueeText currentTrack={currentTrack} />
      </div>
    </div>
  );
}
