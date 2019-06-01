import Task from "../models/Tasks";

export async function createTask(req, res){

    const {name, done, projectid} = req.body;

    try {
        let newTask = await Task.create({
             name,
             done,
             projectid
        },{
            fields: ['name', 'done', 'projectid']
        });
    
        if (newTask) {
            res.json({
               message: 'Tarea creada',
               data: newTask
           });
       }
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });   
    }
}

export async function getTasks(req, res){
    try {
        const tasks = await Task.findAll({
            attributes: ['id','projectid','name','done'],
            order: [
                ['id','DESC']
            ]
        });
        res.json({
            data: tasks
        });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });   
    }
    
}

export async function updateTask(req, res){

    const {id} = req.params;
    const {name, done, projectid} = req.body;

    try {
        const task = await Task.findOne({
            attributes: ['name', 'done','projectid','id'],
            where: {id}
        });

        const updatedTask = await Task.update({
            name,
            done,
            projectid},
        {
            where: {id}
        });

        res.json({
            message: 'Task updated',
            updatedTask
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });  
        
    }

    
}

export async function deleteTask(req, res){
    const {id} = req.params;
    try {
        await Task.destroy({
            where: {
                id
            }
        });
        res.json({message: 'Task deleted'});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });  
        
    }


    
}

export async function getOneTask(req, res){
    const {id}=req.params;

    try {
        const task = await Task.findOne({
            where: {id},
            attributes: ['id','projectid', 'name','done']
        });
        res.json({task});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });  
        
    }

    
}

export async function getTaskByProject(req, res){
    const { projectid } = req.params;
    try {
        const tasks = await Task.findAll({
            attributes: ['id','projectid','done', 'name'],
            where: {projectid}
        });
        res.json({tasks});

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        }); 
    }

    
}