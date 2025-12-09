import Youtube from "@tiptap/extension-youtube"

export const FixedYoutube = Youtube.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      allowFullscreen: true,

      // SAFELY VALIDATE URL
      isValidYoutubeUrl: (url) => {
        if (!url || typeof url !== "string") return false;
        return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
      },

      // SAFELY BUILD EMBED URL
      getEmbedUrl: (url) => {
        if (!url || typeof url !== "string") return null;

        const regExp =
          /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;

        const match = url.match(regExp);
        const videoId = match ? match[1] : null;

        if (!videoId) return null;

        return `https://www.youtube.com/embed/${videoId}`;
      },
    };
  },

  // OVERRIDE renderHTML TO PREVENT CRASH
  renderHTML({ node }) {
    const url = node.attrs.src;

    if (!url || typeof url !== "string") {
      return ["div", {}, "Invalid YouTube URL"];
    }

    const embedUrl = this.options.getEmbedUrl(url);

    if (!embedUrl) {
      return ["div", {}, "Invalid YouTube Video"];
    }

    return [
      "iframe",
      {
        src: embedUrl,
        width: this.options.width || 640,
        height: this.options.height || 480,
        frameborder: 0,
        allowfullscreen: this.options.allowFullscreen,
      },
    ];
  },
})
