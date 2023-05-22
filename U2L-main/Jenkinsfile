pipeline {

   agent any
   
     stages {
       stage('checkout') {
           steps {
               sh '''
                cd /
                git clone https://github.com/Yaminiooty/U2L.git 
                cd U2L
                pwd
                docker-compose up -d
                          '''   
                  }
           }
       
   }
}  
