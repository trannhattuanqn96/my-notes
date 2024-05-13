#!/bin/bash
sudo chown -R mongodb:mongodb /var/lib/mongodb
sudo chown mongodb:mongodb /tmp/mongodb-27017.sock   
sudo service mongod restart
sudo pm2 restart notes