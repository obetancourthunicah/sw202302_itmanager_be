
export  interface ITeam {
  id?: string;
  name: string;
  description: string;
  members?: string[];
  owner?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
