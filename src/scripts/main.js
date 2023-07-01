import config from "../config";
import { Octokit } from "@octokit/core";

const content = document.getElementById("content") || null;

(async () => {
  try {
    const octokit = new Octokit({
      auth: config.GITHUB.TOKEN,
    });
    const response = await octokit.request("GET /users/zearkiatos/repos", {
      username: "zearkiatos",
      headers: {
        "X-GitHub-Api-Version": config.GITHUB.API_VERSION,
      },
    });

    let view = `
        ${response.data
          .map(
            (repository) => `<div class="border-solid border-2 border-black-500 rounded-md group relative ">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none"
        >
          <img src="${repository.owner.avatar_url}" alt="${repository.name}" class="w-full" />
        </div>
        <div class="mt-4 flex justify-between class="p-2"">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${repository.description}
          </h3>
        </div>
        <div class="p-2">
        <a class="font-medium text-indigo-600 hover:text-indigo-500" href="${repository.html_url}" target="_blank">${repository.name}</a>
        </div>
        <div class="p-2">
            <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">${repository.language}</span>
        </div>
      </div>`
          )
          .reverse()
          .slice(0, 12)
          .join(" ")}
        `;
    content.innerHTML = view;
  } catch (ex) {
    console.error(ex);
  }
})();
