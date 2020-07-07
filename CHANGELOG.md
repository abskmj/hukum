# Changelog

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