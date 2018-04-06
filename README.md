# SpFileUpload

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

This is sample Angular SPA to upload large file into SharePoint library from a SharePoint web page.
It works in IE as well as other modern browsers such as Chrome, Firefox, etc.,

## Download & initial setup
Step 1: Download the repo to local folder.

Step 2: Go to the local folder of the repo where it contains `package.json` & run the below command. It might take a while depending on your machine & requires internet access.

`npm install` 


## Build - DEV mode
Follow the below steps to generate DEV mode build

Step 1: Update the `--base-href` & `--deploy-url` parameters of `build:dev` scripts in `package.json` file
 - `--base-href` should be the URL of the page where the SPA will be rendered.
 - `--deploy-url` should be the URL of the library where the SPA script files will be hosted. 

Step 2: Generate DEV build by running below script. 
The build artifacts will be stored in the `dist/` directory. 

`npm run build:dev`

Step 3: Upload the files from `dist/` directory into the SharePoint library mentioned in `--deploy-url`

Step 4: Create a (web part) page as per the URL mentioned in `--base-href` to render the SPA. Include a content editor web part to load the content from index.html uploaded in the `--deploy-url` path. Publish the page. 

## Build - PROD mode
Follow the below steps to generate DEV mode build

Step 1: Update the `--base-href` & `--deploy-url` parameters of `build` scripts in `package.json` file
- `--base-href` should be the URL of the page where the SPA will be rendered.
- `--deploy-url` should be the URL of the library where the SPA script files will be hosted. 

Step 2: Generate PROD build by running below script. 
The build artifacts will be stored in the `dist/` directory. 

`npm run build`

Step 3: Upload the files from `dist/` directory into the SharePoint library mentioned in `--deploy-url`

Step 4: Create a (web part) page as per the URL mentioned in `--base-href` to render the SPA. Include a content editor web part to load the content from `index.html` uploaded in the `--deploy-url` path. Publish the page. 


## How to use the SPA: 
After succcessful build and deployment, the SPA should render three controls
- A textbox to specify the SharePoint library URL where the file to be uploaded (Note: please provide server relative path. ex: /teams/devsite/documents/forms/allitems.aspx)
- A textbox to specify the chunck size in Kb, it should be a number value. No validation is included currently.
- File picker to specify the file to upload.
- Once above details are filled, click on "Upload" button to the file. It'll show the file upload progress and the completion status.