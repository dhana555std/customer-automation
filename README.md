# customer-automation

## Prerequisites
* Download and install nodejs
* Download and install Visual Studio
* Store all essential code generator variables as repository secrets for secure access.

| variables | Description |
| --- | --- |
|AWS_S3_REPORTS_BUCKET_ARN| URL OF S3 bucket|
|AWS_ACCESS_KEY_ID| AWS access key ID|
|AWS_SECRET_ACCESS_KEY| AWS secret access key|
|AWS_DEFAULT_REGION|AWS default region|

### Manual steps to create a cypress project
* Create a folder for the project and open it in VScode
* Open cmd/terminal then execute the below command 
   
   Create package.json file

   ```npm -i init ```

* To install cypress

   ```npm install cypress --save -dev```


### Below is the step-by-step video to generate a Cypress basic project
  [Cypress project creation ](https://drive.google.com/file/d/1ChouVFc5ZWvGFfkIcNOGRzZIN4buIEQx/view?usp=sharing) 

* Create the Cypress project and maintain its structure in the repository before running the pipeline.

* ```reporter-config.json ``` 
(optional) for reference purpose.
