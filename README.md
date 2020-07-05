![npm (scoped)](https://img.shields.io/npm/v/hukum?label=NPM) ![NPM](https://img.shields.io/npm/l/hukum?label=License)

# Hukum
Hukum is an NPM module that prints Github Actions (GA) Workflow status in the terminal. It works for workflows that run when a commit is pushed to Github repo. Once a commit is pushed, Hukum will print status updates in realtime.

Hukum aims to improve your development process with immediate feedback of the GA Workflow on your terminal.

![](.images/terminal.gif)

# Installation
```bash
npm install --global hukum

hukum
```

# How it works?
Hukum uses [Github Actions API](https://developer.github.com/v3/actions/) to get the related workflow to the recent git push and its status. It keeps on calling the APIs every 1 second to update the status on the terminal.

Below is a sample output for one of the workflows.

```
   Add post - Setup Snapcraft in a Github Action Workflow
     ✔ deploy 16s
       ✔ Set up job 2s
       ✔ Run actions/checkout@v2 0s
       ✔ Install hugo 8s
       ✔ Install hugo theme 1s
       ✔ Build 0s
       ✔ Deploy 5s
       ✔ Post Run actions/checkout@v2 0s
       ✔ Complete job 0s
```

# Configuration
Hukum can work out of the box without any configuration. However, it provides a few configuration options. Include a `.hukumrc` file in the root of the project with the following contents.

```json
{
    "github": {
        "token": "<token>"
    }
}
```

## Github Personal token
```
github.token
```

Hukum uses [Github Actions API](https://developer.github.com/v3/actions/). It is possible to use these APIs without any authentication for public repositories. However, for unauthenticated requests, the rate limit allows for up to 60 requests per hour (Details at [developer.github.com](https://developer.github.com/v3/#rate-limiting)) which can exhaust quickly. Authenticated requests have higher limits, up to 5000 requests per hour.


You can follow these steps at [docs.github.com](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) to create a personal token.

# Fixes & Improvements
Head over to the issues tab at [github.com](https://github.com/abskmj/hukum/issues) to report a bug or suggest an improvement. Feel free to contribute to the code or documentation by raising a pull request.