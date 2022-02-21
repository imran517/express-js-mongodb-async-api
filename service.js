const model = require('./model');
const dbContext = require('./dbContext');

class Service {
    constructor () {
        this.service = "Service";
        this.method = "";
     }

    async getTasks () {
        this.method = "getTasks";
        try{
            let db = await dbContext.connect()
            let result = await db.collection('tasks').find({}).toArray();
            let serviceResult  = { status:"success", message: "Tasks retrieved.",service: this.service, method: this.method, data: result };
            console.log(serviceResult); 
            return serviceResult;
        }
        catch (error) {
            let serviceResult  = { status: "failure", message: error, service: this.service, method: this.method, data: null};
            console.error(serviceResult);
            return serviceResult;
        }                  
    }

    async getTask (id) {
        try {
            let db = await dbContext.connect();
            let result = await db.collection('tasks').findOne({id: id});
            let serviceResult  = { status:"success", message: "Task retrieved.", service: this.service, method: this.method, data: result };
            console.log(serviceResult); 
            return serviceResult;            
        } catch (error) {
            let serviceResult  = { status: "failure", message: error, service: this.service, method: this.method, data: null};
            console.error(serviceResult);
            return serviceResult;
        } 
    }

    async addTask (task) {
        try {
            let db = await dbContext.connect();
            let result = await db.collection('tasks').insertOne(task);
            let serviceResult  = { status:"success", message: "Task added.", service: this.service, method: this.method, data: result };
            console.log(serviceResult);
            return serviceResult; 
        } catch (error) {
            let serviceResult  = { status: "failure", message: error, service: this.service, method: this.method, data: null};
            console.error(serviceResult);
            return serviceResult;
        }
    }

    async updateTask (task) {
        try {
            let db = await dbContext.connect();
            let result = await db.collection('tasks').updateOne({id: task.id }, { $set: task})
            let serviceResult  = { status:"success", message: "Task updated.", service: this.service, method: this.method, data: result };
            console.log(serviceResult);
            return serviceResult; 
        } catch (error) {
            let serviceResult  = { status: "failure", message: error, service: this.service, method: this.method, data: null};
            console.error(serviceResult);
            return serviceResult;
        }
    }
    
    async deleteTask (task) {
        try {
            let db = await dbContext.connect();
            let result = await db.collection('tasks').deleteOne(task)
            let serviceResult  = { status:"success", message: "Task deleted.", service: this.service, method: this.method, data: result };
            console.log(serviceResult);
            return serviceResult; 
        } catch (error) {
            let serviceResult  = { status: "failure", message: error, service: this.service, method: this.method, data: null};
            console.error(serviceResult);
            return serviceResult;
        }
    }
}

module.exports = Service;
