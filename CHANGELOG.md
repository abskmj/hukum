# Changelog

## [1.3.0]
### Added
- Add needed scope for the Github personal token to the documentation.
- Add support for multiple workflows. Prints the latest active step for each workflow.
```
   Update a draft
     ✔ gitlab 17s
       ✔ Complete job 0s
     ✔ deploy 15s
       ✔ Complete job 0s
``` 

## [1.2.0]
### Added
- Add a Github Action workflow to mirror codebase to a private Gitlab repository.
### Fixed
- Fix invalid repo name when remote URL has `.git` string not at the end, e.g. `username.github.io`.

## [1.1.0]
### Added
- Add a message when a related workflow is not found.
```
Recent push didn't trigger a workflow
```
- Add a message when a Github personal token is not configured.
```
Github personal token is not configured. Unauthenticated requests to github.com is limited to 60 requests per hour. Details at https://github.com/abskmj/hukum#github-personal-token.
```
- Add an environment variable to configure a Github personal token
```
HUKUM_GITHUB_TOKEN
```

## [1.0.0]
### Added
- Add the NPM module