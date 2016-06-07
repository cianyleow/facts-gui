# FACTS
Final year project at Imperial College London.

GUI
---
This section details the GUI development and any setup requirements.

Requires
- Node / NPM
- Bower
- JSHint (2.0+)
- Gulp

You must run at least `npm install -g gulp bower jshint` and then run the below instructions from the root directory.
* `cd gui/`
* `npm install && bower install`
* `gulp default`

Done with help from [MHerman Blog](http://mherman.org/blog/2014/08/14/kickstarting-angular-with-gulp/#.Vo-O2xWLQU1)

Production Installation
-----------------------

This installation guide is written for a Debian/Ubuntu based system. Specifically, an AWS Ubuntu 14.04 instance was used in June 2016, so please note that certain programs and commands may change over time.

Additionally, this guide must be used in conjunction with the FACTS guide, and is just the documentation to install the front end code. 

1. Update the APT environment
  1. `sudo apt-get update`

2. Install the necessary software for the Frontend to be installed.
  1. `sudo apt-get install npm nodejs-legacy`
  
3. Clone the latest FACTS GUI repository and build it locally with NPM commands.
  1. `git clone https://github.com/cianyleow/facts-gui`
  2. `cd facts-gui`
  3. `npm install`
  4. `npm install -g grunt`
  5. `grunt dist`

4. Moved the distribution files to a production available location
  1. `cp -r dist /usr/share/nginx/html/facts`
