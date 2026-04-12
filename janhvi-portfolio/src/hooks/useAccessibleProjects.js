import { useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';

export const useAccessibleProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getProjects()
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const canAccessProject = useCallback(
    (projectId) => projects.some((p) => p.id === projectId),
    [projects]
  );

  const getProject = useCallback(
    (projectId) => projects.find((p) => p.id === parseInt(projectId)),
    [projects]
  );

  return { accessibleProjects: projects, canAccessProject, getProject, loading };
};
