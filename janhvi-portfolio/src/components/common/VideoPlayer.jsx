import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import './VideoPlayer.css';

const VideoPlayer = ({
    src = "https://vjs.zencdn.net/v/oceans.mp4",
    poster = "",
    className = "",
    showPlayButton = true,
    alwaysShowControls = false,
    showMuteButton = true
}) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isMuted, setIsMuted] = useState(true);

    // Synchronize state with actual video playing state
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);

        return () => {
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
        };
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(currentProgress);
        }
    };

    const handleSeek = (e) => {
        if (videoRef.current) {
            const seekTime = (e.target.value / 100) * videoRef.current.duration;
            videoRef.current.currentTime = seekTime;
            setProgress(e.target.value);
        }
    };

    const handleVideoEnd = () => {
        setIsPlaying(false);
        setProgress(100);
    };

    const isDriveVideo = src.includes('drive.google.com');
    const driveEmbedUrl = isDriveVideo ? src.replace('/view', '/preview').replace('?usp=sharing', '') : src;

    if (isDriveVideo) {
        return (
            <div className={`custom-video-wrapper ${className} controls-always-visible`}>
                <iframe
                    src={driveEmbedUrl}
                    className="custom-video-element"
                    style={{ border: 'none', width: '100%', aspectRatio: '16/9' }}
                    allow="autoplay; flash"
                    allowFullScreen
                ></iframe>
            </div>
        );
    }

    return (
        <div className={`custom-video-wrapper ${className} ${alwaysShowControls || !isPlaying ? 'controls-always-visible' : ''} ${!isPlaying ? 'video-paused' : ''}`}>
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                muted={isMuted}
                className="custom-video-element"
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnd}
                onClick={togglePlay}
            />

            {showPlayButton && (
                <div className="custom-video-play-btn custom-video-play-btn-center" onClick={togglePlay} role="button" tabIndex={0} aria-label={isPlaying ? "Pause" : "Play"} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); togglePlay(); } }}>
                    {isPlaying ? <Pause size={48} fill="currentColor" /> : <Play size={48} fill="currentColor" />}
                </div>
            )}

            <div className="custom-video-controls">
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={isNaN(progress) ? 0 : progress}
                    onChange={handleSeek}
                    className="custom-video-seek-bar"
                    style={{
                        background: `linear-gradient(to right, #fff ${isNaN(progress) ? 0 : progress}%, rgba(255, 255, 255, 0.3) ${isNaN(progress) ? 0 : progress}%)`
                    }}
                />

                {showMuteButton && (
                    <button className="custom-video-play-btn" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
                        {isMuted ? <VolumeX size={48} fill="currentColor" /> : <Volume2 size={48} fill="currentColor" />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default VideoPlayer;