import {
    PhotographIcon,
    XIcon,
} from "@heroicons/react/outline";
import { CalendarIcon, ChartBarIcon, EmojiHappyIcon } from "@heroicons/react/outline";
import {useState, useRef} from "react";
// const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

function input() {
    const [input, setInput] = useState("");
    const [selectedFile, setSeletedFile] = useState(null);
    const [showEmojis, setShowEmojis] = useState(false);
    const [loading, setLoading] = useState(false)
    const filePickerRef = useRef(null);

    const sendPost = () => {
        if(loading) return;
        setLoading(true);
    }

    const addImageToPost = () => {};

    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input + emoji);
    };



    return (
        <div
            className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll scrollbar-hide`}>
            <img
                src="https://lh3.googleusercontent.com/ogw/AOh-ky1bWRTKz_Scj6iKoXfSZNJGDVDPbmtG1AU7UTCe_Q=s32-c-mo"
                alt=""
                className="h-11 w-11 rounded-full cursor-pointer"
            />
            <div className="divide-y divide-gray-700 w-full">
                <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows="2"
                        placeholder="무슨 일이 일어나고 있나요?"
                        className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
                    />
                
                    {selectedFile && (
                        <div className="relative">
                            <div
                                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                            >
                                <XIcon className="text-white h-5"/>
                            </div>
                            <img 
                                src={selectedFile} alt="" className="rounded-2xl max-h-80 object-contain"
                            />
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-between pt-2.5">
                    <div className="flex items-center">
                        <div className="icon">
                            <PhotographIcon className="text-[#1d9bf0] h-[22px]"/>
                            <input
                                type="file"
                                hidden
                                onChange={addImageToPost}
                                ref={filePickerRef}
                            />
                        </div>
                        <div className="icon rotate-90">
                            <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
                        </div>
                        <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                            <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
                        </div>
                        <div className="icon">
                            <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
                        </div>

                        {showEmojis && (
                            <Picker
                                onSelect={addEmoji}
                                style={{
                                    position: 'absolute',
                                    marginTop: '465px',
                                    marginLeft: '-40',
                                    maxWidth: '320px',
                                    borderRadius: '20px',
                                }}
                                theme="dark"
                            />
                        )}
                    </div>
                    <button 
                        className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                        disabled={!input.trim() && selectedFile} 
                        onClick={sendPost}
                    >
                        트윗
                    </button>
                </div>
            </div>
        </div>
    )
}

export default input
