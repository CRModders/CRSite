export function getSocialInfo(platform: string, username: string): Record<string, string> {
    // In the case that a platform has a different method of getting to the user page
    const platformSchemas: Record<string, Record<string, string>> = {
        "_default": {
            "url": `https://${platform}.com/${username}`,
            "icon": `simple-icons:${platform}`,
            "platform": platform,
            "username": username
        },
        "rss": {
            "url": username
        },
        "discord": {
            "url": `https://discord.com/invite/${username}`,
            "username": "CRModders", // TODO: Fix this being hardcoded
        },
	    "codeberg": {
            "url": `https://codeberg.org/${username}`
	    },
        "trello": {
            "url": `https://trello.com/w/${username}`
        }
    }

    // Thing that will be referenced in the html section
    let out: Record<string, string> = { ...platformSchemas["_default"] };

    if (platformSchemas[platform]) {
        const platformInfo = platformSchemas[platform];
        for (const item of Object.keys(platformInfo)) {
            if (platformInfo[item]) {
                out[item] = platformInfo[item];
            }
        }
    }

    return out;
}
