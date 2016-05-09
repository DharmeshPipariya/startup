# startup
Start for Easy Front end Development with Static server with livereload, SASS and bootstrap + Jquery + Font Awasome.

## Dependency
- [bootstrap](https://www.npmjs.com/package/bootstrap)
- [font-awesome](https://www.npmjs.com/package/font-awesome)
- [jquery](https://www.npmjs.com/package/jquery)
- [gulp](https://www.npmjs.com/package/gulp)
- [gulp-sass](https://www.npmjs.com/package/gulp-sass)
- [gulp-webserver](https://www.npmjs.com/package/gulp-webserver)


## Create a new project based on the Startup

Clone this repo into new project folder (e.g., `my-proj`).
```bash
git clone https://github.com/DharmeshPipariya/startup my-proj
cd my-proj
```

We have no intention of updating the source on `DharmeshPipariya/startup`.
Discard everything "git-like" by deleting the `.git` folder.
```bash
rm -rf .git
```

## Install npm packages

Install the npm packages described in the `package.json` and verify that it works:

**Attention Windows Developers:  You must run all of these commands in administrator mode**

```bash
npm install
gulp
```

The `gulp` command first compile application source, then run webserver, and watch files.

Shut it down manually with Ctrl-C.

You're ready to write your application.