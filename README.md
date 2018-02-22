############# Instruction for run Express project ##############

Step1 : Clone the repositery
----------------------------

git clone https://github.com/sreejithgoogle/expressproject.git  expressproject


Step2 : Go into the new directory
---------------------------------

cd expressproject


Step3 : Mongodb installation 
----------------------------

Mongodb is not installed in your system follow the steps

If you are a windows10 user download mongodb from below site :

step1 : "https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/"

or

step1 : "https://www.youtube.com/watch?v=ll2tY6KH8Tk" (It's video tutorial for install mangodb in windows10)

step2 : use customerapp

step3 : db.createCollection('users')

If you are a ubuntu 16.04 user follow the steps below : 

step1  : sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927

step2  : sudo echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list

step3  : sudo apt-get update

step4  : sudo apt-get install -y --allow-unauthenticated mongodb-org

step5  : sudo nano /etc/systemd/system/mongodb.service  (copy paste below code to open file)

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


[Unit]
Description=High-performance, schema-free document-oriented database
After=network.target

[Service]
User=mongodb
ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

[Install]
WantedBy=multi-user.target


++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

step6  : sudo systemctl start mongodb

step7  : sudo systemctl status mongodb

step8  : sudo systemctl enable mongodb

step9  : mongo

step10 : use admin

step11 : db.createUser({user:"admin", pwd:"admin123", roles:[{role:"root", db:"admin"}]})

step12 : sudo systemctl restart mongodb

step13 : mongo -u admin -p admin123 --authenticationDatabase admin

step14 : use customerapp

step15 : db.createCollection('users')

If you are a macOS user follow the steps below :

step1 : "https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/"

step2 : use customerapp

step3 : db.createCollection('users')

Step4 : Install dependencies 
----------------------------

npm install

npm install -g nodemon

Step5 : Run the project
-----------------------

nodemon

After the 'nodemon' run, if execution fail please check your port 3000 is free (node.js/Express.js app only work on port 3000)

Copy below url and paste in a new tab in the browser

 http://localhost:3000