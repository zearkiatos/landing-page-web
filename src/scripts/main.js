import config from "../config";
const url = `https://${config.YOUTUBE_RAPID_API_BASE_URL}/playlist?id=${config.YOUTUBE_CHANNEL_ID}`;
const content = null || document.getElementById("content");
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": config.RAPID_API_KEY,
    "X-RapidAPI-Host": config.YOUTUBE_RAPID_API_BASE_URL,
  },
};

const fetchData = async (urlApi) => {
  const response = await fetch(urlApi, options);
  const data = response.json();

  return data;
};

(async () => {
  try {
    const videos = await fetchData(url);
    let view = `
        ${videos.data
          .map(
            (video) => `<div class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none"
        >
          <img src="${video.thumbnail[3].url}" alt="${video.title}" class="w-full" />
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.title}
          </h3>
        </div>
      </div>`
          )
          .slice(0, 4)
          .join(" ")}
        `;
  } catch (ex) {
    console.error(ex);
  }
})();
