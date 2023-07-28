import { DaoBase } from '@dao/models/DaoBase';
import {IProject} from '@libs/projects/projects';
import { getDb } from '../ConnMongoDb';
export class ProjectDao extends DaoBase<IProject> {
  private db;
  private collection;
  constructor() {
    super();
    getDb().then(_db => {
      this.db = _db;
      this.collection = this.db.collection('projects')
    });
  }
  public create(item: IProject): Promise<IProject> {
    try {
      const newProject = { ...item };
      newProject.createdAt = new Date();
      newProject.updatedAt = newProject.createdAt;
      return this.collection.insertOne(newProject).then((result)=>{
        console.log("ProjectDao result:", result);
        newProject._id = result.insertedId;
        return newProject;
      });
    } catch (ex) {
      console.log("ProjectDao Error:", ex);
      throw ex;
    }
  }
  public update(id: string, item: Partial<IProject>): Promise<IProject> {
    throw new Error('Method not implemented.');
  }
  public delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  public find(_item: Partial<IProject>): Promise<IProject[]> {
   try {
    return this.collection.find({}).toArray();
   }catch(ex){
      console.log("ProjectDao Error:", ex);
      throw ex;
   }
  }
  public findOne(id: string): Promise<IProject> {
    throw new Error('Method not implemented.');
  }

}
