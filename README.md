## Steps

1. After the user has **cloned the master/switch to another branch** he must install the **node_modules** dependencies with the following command on terminal ->  **npm install cypress --save-dev**

2.  When **the user wants to run the created tests from scripts on package json**, the following command must be run from terminal-> **npm run [name_of_script]** 

3.  When **the user wants to open the cypress browser to see in real time how the tests are run** the following command must be run from terminal -> **npx cypress open**

4.  When **the user wants to run direclty a chosen test his testing package**, the following command must be run from terminal -> **npx cypress run --spec [relative_path]** -> to run headless a folder/file which the users puts on relative path 