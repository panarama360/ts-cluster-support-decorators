# Installation

    `npm install ts-cluster-support-decorators --save`
    
# Using

Let's say we use [routing-controllers](https://github.com/typestack/routing-controllers), I like it

I run 4 clusters and I need them to synchronize data
```typescript
 import "reflect-metadata";
 import {createExpressServer} from "routing-controllers";
 import * as cluster from "cluster";
 
 @WatchClusterVar()
 @JsonController('/user')
 class UserController{
     @CommonVar()
     anyVars: number;
     
     @Get('/edit')
     editAnyVar(){
         this.anyVars = Math.random();
         return {
             success: true,
             msg: 'Variable changed'
         }
     }
     
     @WatchVar('anyVars')
     watch(){
         console.log("Update value 'anyVars'", this.anyVars)
     }
 }
 
 if(cluster.isMaster){
     cluster.fork();
     cluster.fork();
     cluster.fork();
     cluster.fork();
 }
 createExpressServer({
     routePrefix: "/api",
     controllers: [UserController]
 }).listen(3000);
```

Now, when changing **anyVars**, it will change in all clusters.

Method **watch** when **anyVars** will change.
