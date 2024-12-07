pipeline {
    agent any
    stages {
        stage('GIT checkout') {
            steps {
                checkout changelog: false, poll: true, scm: scmGit(branches: [[name: '*/dev']], extensions: [], userRemoteConfigs: [[credentialsId: '2eb54f3d-535b-43a5-83fe-2a39128ab1ce', url: 'git@github.com:dantsyt/Lutnita.git']])
            }
        }
        stage('Test SSH Keys') {
                steps {
                    sh '''#!/bin/bash
                          KEYSCAN_FILE=~/dest-ssh-keyscan
                          ssh-keyscan -t rsa,dsa ssh-lutnita-dev.alwaysdata.net > "$KEYSCAN_FILE"
                          grep "$(cat $KEYSCAN_FILE)" ~/.ssh/known_hosts >> /dev/null
                          exit_code=$?
                          if [ "$exit_code" -eq 1 ]; then
                            cat "$KEYSCAN_FILE" >> ~/.ssh/known_hosts
                            echo "New SSH keys added to known_hosts"
                          elif [ "$exit_code" -eq 0 ]; then
                          	echo "Existing SSH keys found. Skipping"
                          else
                          	echo "$exit_code"
                          	echo "Error occured in SSH keyscan step"
                          	exit $exit_code
                          fi
                    '''
            }
        }
            stage('Deploy') {
            steps {
                  withCredentials([sshUserPrivateKey(credentialsId: "id_rsa_lutnita_dev", keyFileVariable: 'sshkey')]){
                    echo 'deploying the software'
                    sh '''#!/bin/bash
                	rsync -havz \
                	--inplace \
                	--exclude  '.git*' \
                	--exclude 'node_modules' \
                	--exclude '*.log' \
                	--exclude '.editorconfig' \
                	--exclude 'Jenkinsfile' \
                	--exclude 'package-lock.json' \
                	--delete \
                	-e "ssh -i $sshkey" ./ lutnita-dev@ssh-lutnita-dev.alwaysdata.net:~/www/
                    '''
                }
            }
        }
            stage('Restart webapp') {
                steps {
                    sh '''#!/bin/bash
                	curl -X POST --basic --user "583a9c82d44649789d8a0aa5ed91a87f:" https://api.alwaysdata.com/v1/site/830102/restart/
                    echo "Http status code on restart:"
                	curl --silent --output /dev/null --write-out "%{http_code}" https://lutnita-dev.alwaysdata.net/
                    '''
            }
        }
    }
}
