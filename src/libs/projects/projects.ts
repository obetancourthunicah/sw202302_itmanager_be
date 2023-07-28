import { ProjectDao } from '@dao/models/mongo/ProjectsDao';
export interface IProject {
  _id?: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectDaoInstance = new ProjectDao();

export const createProject = (project: IProject) => {
  return ProjectDaoInstance.create(project);
}

export const getProjects = () => {
  return ProjectDaoInstance.find({});
};

export const getProject = (id:string) => {
  return ProjectDaoInstance.findOne(id);
}

export const updateProject = ( id:string, project:Partial<IProject>) => {
  return ProjectDaoInstance.update(id, project);
}

export const deleteProject = (id:string) => {
  return ProjectDaoInstance.delete(id);
}
