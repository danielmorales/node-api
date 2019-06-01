import Project from '../models/Project';

export async function createProject(req, res) {
    //console.log(req.body);

    const {
        name,
        priority,
        description,
        deliverydate
    } = req.body;

    try {
        let newProject = await Project.create({
            name,
            priority,
            description,
            deliverydate
        },{
            fields:['name', 'priority', 'description', 'deliverydate']
        });
        if (newProject) {
             res.json({
                message: 'Proyecto creado',
                data: newProject
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });

    }
    //res.send('received');
}

export async function getProjects(req,res){
    try {
        const projects = await Project.findAll();
        res.json({
            data: projects
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Algo anda mal',
            data: {}
        });
    }
    
}

export async function getOneProject(req,res){
    try {
        const {id} = req.params;
        const project = await Project.findOne({
            where: {
                id: id
            }
        });

        res.json({
            data: project
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Algo anda mal',
            data: {}
        });
    }
    
}

export async function deleteProject(req,res){
    try {
        const { id } = req.params;
        const deleteRowCount = await Project.destroy({
            where: {
                id: id
            }
        });

        res.json({
            message: 'Project deleted succesfully',
            count: deleteRowCount
        });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'no se pudo borrar',
            data: {}
        });
    };
}

export async function updateProject(req,res){
    try {
        const { id } = req.params;
        const { name, priority, description, deliverydate } = req.body;
        const projects = await Project.findAll({
            attributes: ['id', 'name', 'priority', 'description', 'deliverydate'],
            where: {
                id: id
            }
        });
        if (projects.length > 0){
            projects.forEach(async project=>{
                await project.update({
                    name,
                    priority,
                    description,
                    deliverydate
                });
            })
        }

        return res.json({
            message: 'Project updated succesfully',
            data: projects
        });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'no se pudo actualizar',
            data: {}
        });
    };

}