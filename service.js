const model = require('./model');
const dbContext = require('./dbContext');

class Service {
    constructor () { }

    async getTasks () {
        try{
            let db = await dbContext.connect()
            let result = await db.collection('tasks').find({}).toArray();
            console.log(result); 
            return result;
        }
        catch (err) {
            let msg = `Error fetching tasks!: ${err}`;
            console.error(msg);
            return msg;
        }                  
    }

    async getTask (id) {
        try {
            let db = await dbContext.connect();
            let result = await db.collection('tasks').findOne({id: id});
            console.log(result); 
            return result;            
        } catch (err) {
            let msg = `Error fetching a task!: ${err}`;
            console.error(msg);
            return msg;
        } 
    }

    async addTask (task) {
        try {
            let db = await dbContext.connect();
            let result = await db.collection('tasks').insertOne(task);
            console.log(result); 
            let msg = { message: "Success adding a task!" }
            console.log(msg);
            return msg; 
        } catch (err) {
            let msg = `Error adding a task!: ${err}`;
            console.error(msg);
            return msg;
        }
    }

    async updateTask (task) {
        try {
            let db = await dbContext.connect();
            let result = await db.collection('tasks').updateOne({id: task.id }, { $set: task})
            console.log(result); 
            let msg = { message: "Success updating a task!" }
            console.log(msg);
            return msg; 
        } catch (err) {
            let msg = `Error updating a task!: ${err}`;
            console.error(msg);
            return msg;
        }
    }
    
    async deleteTask (task) {
        try {
            let db = await dbContext.connect();
            let result = await db.collection('tasks').deleteOne(task)
            console.log(result); 
            let msg = { message: "Success deleting a task!" }
            console.log(msg);
            return msg; 
        } catch (err) {
            let msg = `Error deleting a task!: ${err}`;
            console.error(msg);
            return msg;
        }
    }
}

module.exports = Service;
