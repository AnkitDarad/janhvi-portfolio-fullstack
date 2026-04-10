import { Router } from 'express';
import { projects } from '../data/projects.js';
import { USER_TYPES } from '../data/users.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateToken, (req, res) => {
  const { userType } = req.user;

  if (userType === USER_TYPES.ADMIN) {
    return res.json(projects);
  }

  const accessible = projects.filter((p) =>
    p.accessLevel.includes(userType)
  );

  res.json(accessible);
});

router.get('/:id', authenticateToken, (req, res) => {
  const projectId = parseInt(req.params.id);
  const { userType } = req.user;

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  if (userType !== USER_TYPES.ADMIN && !project.accessLevel.includes(userType)) {
    return res.status(403).json({ error: 'You do not have access to this project' });
  }

  res.json(project);
});

export default router;
