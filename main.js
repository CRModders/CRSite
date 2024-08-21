async function main() {
    const githubReposListContainer = document.querySelector("div.gh-repos");
    const codebergReposListContainer = document.querySelector("div.cb-repos");
    const membersListContainer = document.querySelector("div.people-list");

    const icons = {
        starIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon star-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
        forkIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-git-fork"> <circle cx="12" cy="18" r="3" ></circle> <circle cx="6" cy="6" r="3" ></circle> <circle cx="18" cy="6" r="3" ></circle> <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" ></path> <path d="M12 12v3" ></path></svg>`
    }

    const repoItem = ({ name, url, star_count, fork_count, description }) => {

        return `
        <div class="repo-item">
            <div class="title">
                <a href="${url}" target="_blank" class="repo-name">${name}</a>
                <div class="repo-stats">
                    <div>
                        ${icons.forkIcon}
                        <span class="count">${fork_count}</span>
                    </div>
                    <div>
                        ${icons.starIcon}
                        <span class="count">${star_count}</span>
                    </div>
                </div>
            </div>

            <div class="description">
                <p>${description || ""}</p>
            </div>
        </div>
        `;
    }

    const fetchGithubReposList = async () => {
        const res = await fetch("https://api.github.com/orgs/CRModders/repos");
        const githubRepos = await res.json();

        for (const repo of (githubRepos || [])) {
            githubReposListContainer.innerHTML += repoItem({
                name: repo.name,
                url: repo.html_url,
                star_count: repo.stargazers_count,
                fork_count: repo.forks_count,
                description: repo.description
            });
        }
    };

    const fetchCodebergReposList = async () => {
        const res = await fetch("https://codeberg.org/api/v1/orgs/CRModders/repos");
        const githubRepos = await res.json();

        for (const repo of (githubRepos || [])) {
            codebergReposListContainer.innerHTML += repoItem({
                name: repo.name,
                url: repo.html_url,
                star_count: repo.stars_count,
                fork_count: repo.forks_count,
                description: repo.description
            });
        }
    };

    const fetchGithubOrgMembers = async () => {
        const res = await fetch("https://api.github.com/orgs/CRModders/members");
        const members = await res.json();

        for (const member of (members || [])) {
            membersListContainer.innerHTML += `
                <div class="org-member">
                    <img src="${member.avatar_url}" alt="${member.login}" class="avatar">
                    <a href="${member.html_url}" target="_blank" class="name">${member.login}</a>
                </div>
            `;
        }
    }

    fetchGithubReposList();
    fetchCodebergReposList();
    fetchGithubOrgMembers();
};

document.addEventListener("DOMContentLoaded", main);