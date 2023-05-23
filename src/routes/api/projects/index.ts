import express from 'express';
const router = express.Router();

import { createProject, getProjects } from '@libs/projects/projects';

router.get('/', (_req, res) => {
  res.json({version:1, scope:'projects'});
});

//  /api/projects/echo/hola?variable1=a&variable2=b

router.get('/echo/:msg', (req, res) => {
  const { msg } = req.params;
  const { variable1='Hola', variable2='Mundo' } = req.query;
  res.json({msg, variable1, variable2});
});

router.post('/echo2', (req, res) => {
  const { variable1='Hola', variable2='Mundo' } = req.body;
  res.json({ variable1, variable2});
});

router.get('/all', async (_req, res) => {
  const projects = await getProjects();
  res.json(projects);
});

router.post('/new', async (req, res) => {
  const { name = '', description = '', isActive = false } = req.body;
  const newProject = { name, description, isActive: (isActive && true) };
  const createdProject = await createProject(newProject);
  res.json(createdProject);
});

export default router;
