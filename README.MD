
# Quiza-app
App restfull hecha con nodejs y express.

## Prerequisitos
- node 16 y npm
- conexión a internet

## Correr la app de manera local

    $ npm i
    $ node index.js

## Ambientes
Reemplazar host para probar en otro ambiente
- local: http://localhost:3000
- aws: http://18.228.157.195:3000

## Endpoints

### Crear corrida
curl -X POST -H "Content-Type: application/json" -d '{"fecha":"2023-06-15T09:30:00.000Z"}' <host>/corridas

---
### Obtener corridas 
curl -X GET <host>/corridas

---
### Modificar una corrida
curl -X PUT -H "Content-Type: application/json" -d '{"fecha":"2023-06-16T10:30:00.000Z","active":false}' <host>/corridas/648a29aa0fa593a7fcddf440

---
### Eliminar una corrida
curl -X DELETE <host>/corridas/648a29aa0fa593a7fcddf440

---
## Intrucciones para desplegar solución en ambiente AWS ECS


## Crear repositorio:
    aws ecr create-repository \
        --repository-name quiz-app \
        --image-scanning-configuration scanOnPush=true \
        --region us-east-1

    Output:
    Docker Registry:
    public.ecr.aws/c5o5d7y3/quiz-app

## Crear y Subir imagen
    aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/c5o5d7y3
    npm i
    docker build -t quiz-app .
    docker tag quiz-app:latest public.ecr.aws/c5o5d7y3/quiz-app:latest
    docker push public.ecr.aws/c5o5d7y3/quiz-app:latest

## Crear cluster ECS:
    aws ecs create-cluster --cluster-name quiz-app-cluster


## Registrar tarea:
    aws ecs register-task-definition --cli-input-json file://task-definition.json


## Crear servicio
    aws ecs create-service --cluster quiz-app-cluster --service-name quiz-app-service --task-definition deploy-test --desired-count 1 --launch-type FARGATE --network-configuration "awsvpcConfiguration={subnets=[subnet-52398c34,subnet-64a3103f,subnet-ee73d8a7],securityGroups=[sg-4d109830,sg-0dfd32b37afd69cf2],assignPublicIp=ENABLED}"

## Verificar estado del despliegue:
    aws ecs describe-services --cluster quiz-app-cluster --services quiz-app-service

<br />

`Nota: Tuve que crear una nueva regla de entrada en los SecurityGroups de la red asignada para permitir el acceso desde cualquier IP`

<br />
<br />

# Estructura del directorio
- src: Código fuente
    - controllers
        - corridaController: Controlador de la enteidad Corrida
    - models
        - corridaModel: Modelo de la entidad Corrida
    - routes
        - corridaRoutes: Rutas del mantenedor de Corridas
    - service
        - corridaService: Código testeable de negocio
- test: Código de test
    - corridaController.test: Pruebas unitarias hechas a cierta parte del código
    - integracion.test: Pruebas de integración. Se usa supertest. Llama al endpoint expuesto

<br />
<br />


Fuentes: 
- StackOverflow
- ChatGPT
- Bard
- medium.com


