pipeline{
    agent any
    
      tools {
      nodejs "node"
      }
  stages{
      stage("Checkout"){
          steps{
            git branch: "master", credentialsId: "aws_cc_cred", url: "https://git-codecommit.us-east-2.amazonaws.com/v1/repos/POC_MGE_UI.git"             
        }
      }
      
      stage("Build Docker Image"){
          steps{
              sh " docker build -t 10.210.179.228:8090/poc-docker-repo/ui:${BUILD_NUMBER} . "
          }
      }
      stage("Publish Docker Image"){
          steps{
            withCredentials([usernamePassword(credentialsId: 'nexus_cred', passwordVariable: 'passwd', usernameVariable: 'username')]) {
              sh """
                 docker push 10.210.179.228:8090/poc-docker-repo/ui:${BUILD_NUMBER}
                 docker rmi 10.210.179.228:8090/poc-docker-repo/ui:${BUILD_NUMBER}
                """
            }
              
          }
      }
     stage("Deploy To EKS"){
          steps{
               sshagent(['aebbeec3-83ff-4c30-916f-e2f1f13e3d00']) {
                 sh """
                   scp -o StrictHostKeyChecking=no ./deployment-svc-ingress.yaml ubuntu@10.210.179.228:/home/ubuntu/
                   ssh -o StrictHostKeyChecking=no ubuntu@10.210.179.228 "sudo kubectl apply -f deployment-svc-ingress.yaml && 
                   sudo kubectl get pods -n gm-apps2
                """
              }
          }
      } 

  }
 }