# How to contribute to Localization

If you would like to have the drafter translated to a language, please reach out first to Blep via socials to ensure that no duplicate work is done.

## Adding a localization file

- First, copy `locale-en.json` and rename `en` with the appropriate language tag
- For each `key`, replace the `value` with the text in your language
- Once that is done, submit a pull request to add the file to the repo (or, you can send it directly to Blep)
- Once the file is in, I'll test it and add the hardcoded string under `src/localization/files`