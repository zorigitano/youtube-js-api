const tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
const videoWrapper = Array.from(document.querySelectorAll(".video-wrapper"));
let player;

window.addEventListener("load",function() {
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    if (videoWrapper.length > 0 === true) {
        window.onYouTubeIframeAPIReady = function() {
            [].forEach.call(videoWrapper, function(el) {
                player = createPlayer(el);
            });
        }
    }
});

function youtubeParser(url){
    var match = url.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
    return (match && match[7].length === 11) ? match[7] : false;
};

function createPlayer(el) {
    const youtubeUrl = el.getAttribute("data-url");
    const videoPlayer = el.querySelector(".video-player");
    const videoPlayerId = videoPlayer.getAttribute("id");
    const youtubeId = youtubeParser(youtubeUrl);

    return new YT.Player(videoPlayerId, {
        height: 390,
        width: 640,
        videoId: youtubeId,
    });
}